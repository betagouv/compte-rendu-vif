export namespace Schemas {
  // <Schemas>
  // </Schemas>
}

export namespace Endpoints {
  // <Endpoints>

  export type post_ApicreateUser = {
    method: "POST";
    path: "/api/create-user";
    parameters: {
      body: { name: string; udap_id: string; email: string; password: string };
    };
    response: {
      user?:
        | {
            id: string;
            name: string;
            udap_id: string;
            udap: {
              id: string;
              department: string;
              completeCoords?: string | undefined;
              visible?: boolean | undefined;
              name?: string | undefined;
              address?: string | undefined;
              zipCode?: string | undefined;
              city?: string | undefined;
              phone?: string | undefined;
              email?: string | undefined;
              marianne_text?: string | undefined;
              drac_text?: string | undefined;
              udap_text?: string | undefined;
            };
          }
        | undefined;
      token: string;
      expiresAt: string;
      refreshToken: string;
    };
  };
  export type post_Apilogin = {
    method: "POST";
    path: "/api/login";
    parameters: {
      body: { email: string; password: string };
    };
    response: {
      user?:
        | {
            id: string;
            name: string;
            udap_id: string;
            udap: {
              id: string;
              department: string;
              completeCoords?: string | undefined;
              visible?: boolean | undefined;
              name?: string | undefined;
              address?: string | undefined;
              zipCode?: string | undefined;
              city?: string | undefined;
              phone?: string | undefined;
              email?: string | undefined;
              marianne_text?: string | undefined;
              drac_text?: string | undefined;
              udap_text?: string | undefined;
            };
          }
        | undefined;
      token: string;
      expiresAt: string;
      refreshToken: string;
    };
  };
  export type get_ApirefreshToken = {
    method: "GET";
    path: "/api/refresh-token";
    parameters: {
      query: { token: string; refreshToken: string };
    };
    response: {
      user?:
        | {
            id: string;
            name: string;
            udap_id: string;
            udap: {
              id: string;
              department: string;
              completeCoords?: string | undefined;
              visible?: boolean | undefined;
              name?: string | undefined;
              address?: string | undefined;
              zipCode?: string | undefined;
              city?: string | undefined;
              phone?: string | undefined;
              email?: string | undefined;
              marianne_text?: string | undefined;
              drac_text?: string | undefined;
              udap_text?: string | undefined;
            };
          }
        | undefined;
      token: string;
      expiresAt: string;
      refreshToken: string;
    };
  };
  export type post_ApisendResetPassword = {
    method: "POST";
    path: "/api/send-reset-password";
    parameters: {
      body: { email: string };
    };
    response: { message: string };
  };
  export type post_ApiresetPassword = {
    method: "POST";
    path: "/api/reset-password";
    parameters: {
      body: { temporaryLink: string; newPassword: string };
    };
    response: { message: string };
  };
  export type get_Apiudaps = {
    method: "GET";
    path: "/api/udaps";
    parameters: never;
    response: Array<{
      id: string;
      department: string;
      completeCoords?: string | undefined;
      visible?: boolean | undefined;
      name?: string | undefined;
      address?: string | undefined;
      zipCode?: string | undefined;
      city?: string | undefined;
      phone?: string | undefined;
      email?: string | undefined;
      marianne_text?: string | undefined;
      drac_text?: string | undefined;
      udap_text?: string | undefined;
    }>;
  };
  export type post_Apipdfreport = {
    method: "POST";
    path: "/api/pdf/report";
    parameters: {
      body: { htmlString: string; reportId: string; recipients: string };
    };
    response: string;
  };
  export type get_Apipdfreport = {
    method: "GET";
    path: "/api/pdf/report";
    parameters: {
      query: { reportId: string };
    };
    response: Partial<{}>;
  };

  // </Endpoints>
}

// <EndpointByMethod>
export type EndpointByMethod = {
  post: {
    "/api/create-user": Endpoints.post_ApicreateUser;
    "/api/login": Endpoints.post_Apilogin;
    "/api/send-reset-password": Endpoints.post_ApisendResetPassword;
    "/api/reset-password": Endpoints.post_ApiresetPassword;
    "/api/pdf/report": Endpoints.post_Apipdfreport;
  };
  get: {
    "/api/refresh-token": Endpoints.get_ApirefreshToken;
    "/api/udaps": Endpoints.get_Apiudaps;
    "/api/pdf/report": Endpoints.get_Apipdfreport;
  };
};

// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type PostEndpoints = EndpointByMethod["post"];
export type GetEndpoints = EndpointByMethod["get"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | MutationMethod;

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("post", this.baseUrl + path, params[0]);
  }
  // </ApiClient.post>

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("get", this.baseUrl + path, params[0]);
  }
  // </ApiClient.get>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
