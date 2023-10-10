import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@/utils/antd";

const Layout = async ({ children }: PropsWithChildren) => {
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};

export default Layout;
