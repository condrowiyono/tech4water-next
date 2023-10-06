"use client";

import { AuthContextProvider } from "@/context/auth";
import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@/utils/antd";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <AuthContextProvider>{children}</AuthContextProvider>
    </StyledComponentsRegistry>
  );
};

export default Layout;
