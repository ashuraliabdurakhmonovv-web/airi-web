"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getQueryClient } from "@/config/query-client/query-client";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
