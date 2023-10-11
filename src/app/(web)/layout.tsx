import { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 fixed t-0 w-full border-b border-solid border-b bg-white z-10">
      <div className="sm:container sm:mx-auto flex justify-between ">
        <div>
          <Image src="/image/header.png" width={256} height={0} style={{ width: 256, height: "auto" }} alt="logo" />
        </div>
        <div className="flex items-center">
          <Link href="/api/auth/signin">Login</Link>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <Header /> */}
      {children}
    </>
  );
};

export default Layout;
