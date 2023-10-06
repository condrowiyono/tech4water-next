"use client";

import { useAuth } from "@/context/auth";
import { Button, Card, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

type LoginData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { login, isLogged } = useAuth();
  const handleFinish = ({ email, password }: LoginData) => {
    login(email, password);
  };

  useEffect(() => {
    if (isLogged) {
      router.replace("/mobile");
    }
  }, [isLogged, router]);

  return (
    <div className="mt-32 mx-auto w-full sm:w-[480px]">
      <div className="flex justify-center mb-4">
        <Image
          src="/image/pu.png"
          alt="logo"
          sizes="100vw"
          width={120}
          height={120}
        />
      </div>
      <Card title="Login">
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Button className="bg-blue-900 text-white" htmlType="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
