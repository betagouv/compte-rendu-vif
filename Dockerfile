################################
# BASE IMAGE FOR EVERY SERVICE #
################################
FROM --platform=linux/amd64  node:20.11-alpine AS with-pnpm
RUN apk add --no-cache \
build-base \
g++ \
cairo-dev \
jpeg-dev \
pango-dev \
giflib-dev \
pixman-dev \
pangomm-dev \
libjpeg-turbo-dev \
freetype-dev 
RUN npm i -g pnpm

################################
#      DEPS INSTALLATION       #
################################
FROM with-pnpm AS with-deps
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches/

COPY packages/backend/package.json ./packages/backend/
COPY packages/electric-client/package.json ./packages/electric-client/
COPY packages/pdf/package.json ./packages/pdf/

COPY packages/frontend/package.json ./packages/frontend/
COPY packages/frontend/public ./packages/frontend/public
COPY packages/frontend/scripts ./packages/frontend/scripts
COPY packages/frontend/index.dist.css ./packages/frontend/index.dist.css
COPY packages/frontend/panda.config.ts ./packages/frontend/
COPY packages/frontend/postcss.config.cjs ./packages/frontend/
COPY packages/frontend/theme/ ./packages/frontend/theme/
COPY packages/frontend/vite.config.ts ./packages/frontend/

RUN pnpm install --frozen-lockfile


################################
#       BACKEND SERVICE        #
################################
FROM with-deps AS backend
WORKDIR /usr/src/app
COPY packages/backend/ ./packages/backend/
COPY packages/pdf/ ./packages/pdf/
COPY packages/electric-client/ ./packages/electric-client/


COPY db/ ./db/
COPY --from=with-deps /usr/src/app/packages/backend/node_modules ./packages/backend/node_modules
COPY --from=with-deps /usr/src/app/packages/electric-client/node_modules ./packages/electric-client/node_modules

RUN pnpm electric-client generate:back
RUN pnpm backend build
CMD pnpm electric:up;pnpm backend start


################################
#      FRONTEND SERVICE        #
################################
FROM with-deps AS frontend
COPY packages/frontend/ ./packages/frontend/
COPY packages/electric-client/ ./packages/electric-client/
COPY packages/pdf/ ./packages/pdf/
COPY --from=with-deps /usr/src/app/packages/frontend/node_modules ./packages/frontend/node_modules
COPY --from=with-deps /usr/src/app/packages/frontend/styled-system ./packages/frontend/styled-system

RUN pnpm frontend build
CMD ["pnpm", "frontend", "preview"]