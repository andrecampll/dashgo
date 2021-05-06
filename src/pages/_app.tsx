import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { ReactQueryDevtools } from 'react-query/devtools';
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContent";
import { theme } from '../styles/theme';

import { AuthProvider } from "../contexts/AuthContext";
import { QueryClientProvider } from 'react-query';
import { makeServer } from '../services/mirage';

import { queryClient } from '../services/queryClient';

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient} >
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />      
          </SidebarDrawerProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp
