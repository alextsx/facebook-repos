"use client";

import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type ReduxProviderType = {
  children: ReactNode;
};

function ReduxProvider({ children }: ReduxProviderType): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
