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
      body: { name: string; email: string; password: string; udap_id: string };
    };
    response: {
      user: {
        id: string;
        name: string;
        email: string;
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
        };
      };
      token: string;
    };
  };
  export type post_Apilogin = {
    method: "POST";
    path: "/api/login";
    parameters: {
      body: { email: string; password: string };
    };
    response: {
      user: {
        id: string;
        name: string;
        email: string;
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
        };
      };
      token: string;
    };
  };
  export type get_ApiverifyToken = {
    method: "GET";
    path: "/api/verify-token";
    parameters: {
      query: { token: string };
    };
    response: {
      id: string;
      name: string;
      email: string;
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
      };
    };
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
    }>;
  };
  export type post_Apipdfreport = {
    method: "POST";
    path: "/api/pdf/report";
    parameters: {
      body: { htmlString: string; reportId: string };
    };
    response: string;
  };

  // </Endpoints>
}

// <EndpointByMethod>
export type EndpointByMethod = {
  post: {
    "/api/create-user": Endpoints.post_ApicreateUser;
    "/api/login": Endpoints.post_Apilogin;
    "/api/pdf/report": Endpoints.post_Apipdfreport;
  };
  get: {
    "/api/verify-token": Endpoints.get_ApiverifyToken;
    "/api/udaps": Endpoints.get_Apiudaps;
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
