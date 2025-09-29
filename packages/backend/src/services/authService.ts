import { ofetch } from "ofetch";
import { ENV } from "../envVars";
import { Static, Type } from "@sinclair/typebox";
import jwt from "jsonwebtoken";

export class AuthService {
  async authenticate({ code }: AuthenticateProps) {
    const clientAssertion = jwt.sign(
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

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${ENV.FRONTEND_URL}/auth-callback`,
      client_id: ENV.VITE_AUTH_CLIENT_ID,
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: clientAssertion,
    });
    const response = await authApi<Static<typeof keycloakTokenResponseTSchema>>("/protocol/openid-connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const userInfos = await this.getUserInfo(response.access_token);
    console.log(response, userInfos);
    return { ...response, user: userInfos };
  }

  async getUserInfo(token: string) {
    return authApi("/protocol/openid-connect/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

type AuthenticateProps = {
  code: string;
};

const authFullUrl = `${ENV.VITE_AUTH_URL}/realms/${ENV.VITE_AUTH_REALM}`;

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

export const authApi = ofetch.create({
  baseURL: authFullUrl,
});
