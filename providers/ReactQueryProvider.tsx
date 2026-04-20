import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: process.env.NODE_ENV === "development" ? 0 : 5 * 60 * 1000, // 0 in dev, 5 minutes in prod
        gcTime: process.env.NODE_ENV === "development" ? 0 : 10 * 60 * 1000, // 0 in dev, 10 minutes in prod
        refetchOnWindowFocus: process.env.NODE_ENV === "development", // Only refetch on focus in development
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
