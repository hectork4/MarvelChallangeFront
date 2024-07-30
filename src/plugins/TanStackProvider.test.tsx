import React from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TanStackProvider from "../plugins/TanStackProvider";

describe("TanStackProvider", () => {
  it("renders without error", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <TanStackProvider children={null} />
      </QueryClientProvider>
    );
  });
});
