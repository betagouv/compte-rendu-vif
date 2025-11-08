export namespace Schemas {
  // <Schemas>
  // </Schemas>
}

export namespace Endpoints {
  // <Endpoints>

  export type post_Apiauthenticate = {
    method: "POST";
    path: "/api/authenticate";
    parameters: {
      body: { code: string };
    };
    response: {
      tokens: {
        access_token: string;
        expires_in: string;
        refresh_token: string;
        refresh_expires_in: string;
        token_type: string;
        session_state: string;
        scope: string;
        id_token: string;
      };
      user: {
        id: string;
        name: string;
        service_id: string;
        service: {
          id: string;
          department: string;
          completeCoords?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          visible?: boolean | Schemas.null | Array<boolean | Schemas.null> | undefined;
          name?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          address?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          zipCode?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          city?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          phone?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          email?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          marianne_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          drac_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          dept_numbers?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          service_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
        };
      };
    };
  };
  export type post_ApirefreshToken = {
    method: "POST";
    path: "/api/refresh-token";
    parameters: {
      body: { refreshToken: string };
    };
    response: {
      user: {
        id: string;
        name: string;
        service_id: string;
        service: {
          id: string;
          department: string;
          completeCoords?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          visible?: boolean | Schemas.null | Array<boolean | Schemas.null> | undefined;
          name?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          address?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          zipCode?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          city?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          phone?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          email?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          marianne_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          drac_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          dept_numbers?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          service_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
        };
      };
      accessToken: string;
      refreshToken: string;
      expiresAt: string;
    };
  };
  export type post_ApicreateUser = {
    method: "POST";
    path: "/api/create-user";
    parameters: {
      body: { password: string; name: string; email: string; job: string; service_id: string };
    };
    response: {
      user: {
        id: string;
        name: string;
        service_id: string;
        service: {
          id: string;
          department: string;
          completeCoords?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          visible?: boolean | Schemas.null | Array<boolean | Schemas.null> | undefined;
          name?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          address?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          zipCode?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          city?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          phone?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          email?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          marianne_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          drac_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          dept_numbers?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          service_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
        };
      };
      accessToken: string;
      refreshToken: string;
      expiresAt: string;
    };
  };
  export type post_ApiloginUser = {
    method: "POST";
    path: "/api/login-user";
    parameters: {
      body: { email: string; password: string };
    };
    response: {
      user: {
        id: string;
        name: string;
        service_id: string;
        service: {
          id: string;
          department: string;
          completeCoords?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          visible?: boolean | Schemas.null | Array<boolean | Schemas.null> | undefined;
          name?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          address?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          zipCode?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          city?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          phone?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          email?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          marianne_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          drac_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          dept_numbers?: string | Schemas.null | Array<string | Schemas.null> | undefined;
          service_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
        };
      };
      accessToken: string;
      refreshToken: string;
      expiresAt: string;
    };
  };
  export type post_ApiresetPassword = {
    method: "POST";
    path: "/api/reset-password";
    parameters: never;
    response: unknown;
  };
  export type post_ApichangeService = {
    method: "POST";
    path: "/api/change-service";
    parameters: {
      body: { service_id: string };
    };
    response: { message: string };
  };
  export type get_Apiservices = {
    method: "GET";
    path: "/api/services";
    parameters: never;
    response: Array<{
      id: string;
      department: string;
      completeCoords?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      visible?: boolean | Schemas.null | Array<boolean | Schemas.null> | undefined;
      name?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      address?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      zipCode?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      city?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      phone?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      email?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      marianne_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      drac_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      dept_numbers?: string | Schemas.null | Array<string | Schemas.null> | undefined;
      service_text?: string | Schemas.null | Array<string | Schemas.null> | undefined;
    }>;
  };
  export type post_Apiuploadattachment = {
    method: "POST";
    path: "/api/upload/attachment";
    parameters: never;
    response: unknown;
  };
  export type get_Apiuploadattachment = {
    method: "GET";
    path: "/api/upload/attachment";
    parameters: never;
    response: unknown;
  };
  export type post_Apiuploadimage = {
    method: "POST";
    path: "/api/upload/image";
    parameters: never;
    response: unknown;
  };
  export type get_Apiuploadpicture = {
    method: "GET";
    path: "/api/upload/picture";
    parameters: {
      query: { reportId: string; pictureId: string };
    };
    response: Partial<{}>;
  };
  export type post_ApiuploadpicturePictureIdlines = {
    method: "POST";
    path: "/api/upload/picture/{pictureId}/lines";
    parameters: {
      path: { pictureId: string };

      body: { lines: Array<{ points: Array<{ x: number; y: number }>; color: string }> };
    };
    response: string;
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
  export type post_ApiuploadData = {
    method: "POST";
    path: "/api/upload-data";
    parameters: {
      body: {
        op_id: number;
        tx_id?: number | Schemas.null | Array<number | Schemas.null> | undefined;
        id: string;
        type: string;
        op: string;
        data?: unknown | undefined;
      };
    };
    response: Partial<{}>;
  };

  // </Endpoints>
}

// <EndpointByMethod>
export type EndpointByMethod = {
  post: {
    "/api/authenticate": Endpoints.post_Apiauthenticate;
    "/api/refresh-token": Endpoints.post_ApirefreshToken;
    "/api/create-user": Endpoints.post_ApicreateUser;
    "/api/login-user": Endpoints.post_ApiloginUser;
    "/api/reset-password": Endpoints.post_ApiresetPassword;
    "/api/change-service": Endpoints.post_ApichangeService;
    "/api/upload/attachment": Endpoints.post_Apiuploadattachment;
    "/api/upload/image": Endpoints.post_Apiuploadimage;
    "/api/upload/picture/{pictureId}/lines": Endpoints.post_ApiuploadpicturePictureIdlines;
    "/api/pdf/report": Endpoints.post_Apipdfreport;
    "/api/upload-data": Endpoints.post_ApiuploadData;
  };
  get: {
    "/api/services": Endpoints.get_Apiservices;
    "/api/upload/attachment": Endpoints.get_Apiuploadattachment;
    "/api/upload/picture": Endpoints.get_Apiuploadpicture;
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
