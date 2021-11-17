import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {QueryClient,QueryClientProvider} from "react-query";
import { LogBox } from 'react-native';
import Root from "./navigation/Root";
LogBox.ignoreLogs(['Setting a timer'])

const queryClient = new QueryClient();

export default function App(){
  return(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  )
}