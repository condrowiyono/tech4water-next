"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";
import { notification } from "antd";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLogged: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogged: false,
  login: async (email: string, password: string) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(!!getCookie("token"));
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetcher<
        { token: string; user: User },
        { email: string; password: string }
      >({
        url: "login",
        method: "POST",
        data: { email, password },
      });

      setCookie("token", response.data.token);
      setUser(response.data.user);
      setIsLogged(true);
    } catch (err) {
      const error = err as ErrorResponse;
      notification.error({
        message: "Login Gagal",
        description: error.response?.data.errors,
      });
    }
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    removeCookie("token");
  };

  useEffect(() => {
    if (isLogged) {
      fetcher<{ user: User }>({ url: "/me" }).then((response) => {
        setUser(response.data.user);
      });
    } else {
      router.push("/login");
    }
  }, [isLogged, router]);

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuth };
export default AuthContext;
