export const auth = {
  login: async () => {
    const params = {
      client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
      redirect_uri: `${window.location.origin}/auth-callback`,
      response_type: "code",
      scope: "openid profile email",
    };

    console.log(params);

    const url = new URL(
      `${import.meta.env.VITE_AUTH_URL}/realms/${import.meta.env.VITE_AUTH_REALM}/protocol/openid-connect/auth`,
    );
    url.search = new URLSearchParams(params).toString();
    window.location.href = url.toString();
  },
};
