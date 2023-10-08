import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@/utils/antd";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/next-auth";
import Link from "next/link";
import Image from "next/image";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <div>
          <Image className="block mb-4" src="/image/pu.png" width={160} height={160} alt="logo" />
          <Link
            href="/api/auth/signin"
            className="block bg-blue-700 rounded px-4 py-2 text-center no-underline text-white"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};

export default Layout;
