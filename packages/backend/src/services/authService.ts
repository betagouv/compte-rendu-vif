import { ofetch } from "ofetch";
import { ENV } from "../envVars";
import { Static, Type } from "@sinclair/typebox";
import jwt from "jsonwebtoken";
import jwks from "jwks-rsa";
import { db } from "../db/db";
import { serviceTSchema } from "../routes/staticDataRoutes";

const authFullUrl = `${ENV.VITE_AUTH_URL}/realms/${ENV.VITE_AUTH_REALM}`;

const jwksClient = jwks({
  jwksUri: `${authFullUrl}/protocol/openid-connect/certs`,
  cache: true,
});

export class AuthService {
  async authenticate({ code }: AuthenticateProps) {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${ENV.FRONTEND_URL}/auth-callback`,
      client_id: ENV.VITE_AUTH_CLIENT_ID,
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: getClientAssertion(),
    });

    const response = await authApi<Static<typeof keycloakTokenResponseTSchema>>("/protocol/openid-connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const user = await this.getOrCreateUserFromToken(response.access_token);

    return { tokens: response, user: user! };
  }

  async checkToken(token: string) {
    const decoded = jwt.decode(token, { complete: true });

    const key = await getKey(decoded!.header);
    return jwt.verify(token, key, { algorithms: ["RS256"] }) as Promise<jwt.JwtPayload & ExtraTokenInfo>;
  }

  refreshToken(refreshToken: string) {
    return authApi<Static<typeof keycloakTokenResponseTSchema>>("/protocol/openid-connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: ENV.VITE_AUTH_CLIENT_ID,
        refresh_token: refreshToken,
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: getClientAssertion(),
      }).toString(),
    });
  }

  async getOrCreateUserFromToken(token: string) {
    const checked = await this.checkToken(token);

    const userPayload = {
      id: checked.sub!,
      name: checked.name ?? checked.preferred_username!,
      service_id: "no-service",
      email: checked.email,
    };

    const existingUser = await this.getUserFromToken(token);
    if (existingUser) return existingUser;

    const user = await db.insertInto("user").values(userPayload).returningAll().executeTakeFirstOrThrow();
    const populatedUser = { ...(await populateService(user!)), isFirstConnection: true };
    return populatedUser;
  }

  async getUserFromToken(token: string) {
    const checked = await this.checkToken(token);
    const user = await db.selectFrom("user").where("id", "=", checked.sub!).selectAll().executeTakeFirst();
    if (!user) return null;
    return populateService(user);
  }
}

const populateService = async <T extends { service_id: string }>(user: T) => {
  const service = await db.selectFrom("service").where("id", "=", user.service_id).selectAll().executeTakeFirst();
  return { ...user, service: service! };
};

const getClientAssertion = () => {
  return jwt.sign(
    {
      iss: ENV.VITE_AUTH_CLIENT_ID,
      sub: ENV.VITE_AUTH_CLIENT_ID,
      aud: `${ENV.VITE_AUTH_URL}/realms/${ENV.VITE_AUTH_REALM}`,
      exp: Math.floor(Date.now() / 1000) + 30,
      jti: crypto.randomUUID(),
    },
    ENV.KEYCLOAK_CLIENT_SECRET,
    { algorithm: "HS256" },
  );
};

const getKey = async (header: jwt.JwtHeader) => {
  return new Promise<string>((resolve, reject) => {
    jwksClient.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return reject(err);
      }
      const signingKey = key!.getPublicKey();
      resolve(signingKey);
    });
  });
};

type AuthenticateProps = {
  code: string;
};

type ExtraTokenInfo = {
  name: string;
  email: string;
  preferred_username: string;
};

export const keycloakTokenResponseTSchema = Type.Object({
  access_token: Type.String(),
  expires_in: Type.String(),
  refresh_token: Type.String(),
  refresh_expires_in: Type.String(),
  token_type: Type.String(),
  session_state: Type.String(),
  scope: Type.String(),
  id_token: Type.String(),
});

export const userTSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  service_id: Type.String(),
  service: serviceTSchema,
});

export const authApi = ofetch.create({
  baseURL: authFullUrl,
});
