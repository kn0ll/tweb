export type HTTPMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type HTTPPath = `/${string}`;

export type HTTPHash = `#${string}`;

export type HTTPSearch = Record<string, string | string[]>;

export type HTTPBody = unknown;

export type HTTPLocation = {
  method: HTTPMethod;
  path: HTTPPath;
  search: HTTPSearch | null;
};
