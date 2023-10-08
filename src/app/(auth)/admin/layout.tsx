"use client";

import { PropsWithChildren } from "react";
import { Layout as BaseLayout, Button, Dropdown, Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const routeSegment = pathname.split("/").slice(0, 3).join("/");

  return (
    <SessionProvider>
      <BaseLayout hasSider>
        <BaseLayout.Sider
          trigger={null}
          className="sider"
          collapsible
          style={{
            display: "block",
            backgroundColor: "#FFF",
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu
            style={{ minHeight: "100vh" }}
            selectedKeys={[routeSegment]}
            mode="inline"
            onClick={({ key }) => router.push(key)}
            items={[
              {
                label: "Dashboard",
                key: "/admin",
              },
              {
                label: "Daftar Pos ",
                key: "/admin/river-observation",
              },
            ]}
          />
        </BaseLayout.Sider>

        <BaseLayout style={{ minHeight: "100vh" }}>
          <BaseLayout.Header className="flex items-center justify-between px-4">
            <Image src="/image/pu.png" width={40} height={40} alt="logo" />
            <Link href="/api/auth/signout">
              <Button>Logout</Button>
            </Link>
          </BaseLayout.Header>
          <main className="p-4">{children}</main>
        </BaseLayout>
      </BaseLayout>
    </SessionProvider>
  );
};

export default Layout;
