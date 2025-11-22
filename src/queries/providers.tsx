"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";

function WebSocketBridge() {
  useWebSocket(); 
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <WebSocketBridge />
      {children}
    </QueryClientProvider>
  );
}
