################################
# BASE IMAGE FOR EVERY SERVICE #
################################
FROM --platform=linux/amd64  node:18 AS with-pnpm
RUN npm i -g pnpm

################################
#      DEPS INSTALLATION       #
################################
FROM with-pnpm AS with-deps
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY packages/backend/package.json ./packages/backend/

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
COPY db/ ./db/
COPY --from=with-deps /usr/src/app/packages/backend/node_modules ./packages/backend/node_modules

RUN pnpm backend build
CMD pnpm electric:up;pnpm backend start


################################
#      FRONTEND SERVICE        #
################################
FROM with-deps AS frontend
COPY packages/frontend/ ./packages/frontend/
COPY --from=with-deps /usr/src/app/packages/frontend/node_modules ./packages/frontend/node_modules

RUN pnpm frontend build
CMD ["pnpm", "frontend", "preview"]