import "jest-fetch-mock";

declare module "jest-fetch-mock" {
  interface FetchMock extends jest.Mock {
    mockResponseOnce(
      body: string | Buffer | ReadableStream | Response,
      init?: ResponseInit
    ): void;
    mockRejectOnce(error: Error): void;
    mockResponses(
      ...responses: Array<{
        body?: string | Buffer | ReadableStream | Response;
        init?: ResponseInit;
      }>
    ): void;
  }
}

export default fetchMock;
