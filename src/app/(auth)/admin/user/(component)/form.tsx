"use client";

import { River, User } from "@/interfaces";
import { Button, Card, Form, FormProps, Input, Select } from "antd";
import { Role } from "@/interfaces/enum";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRequest } from "ahooks";
import fetcher from "@/utils/fetcher";

type UserFormProps = FormProps<User> & {
  loading?: boolean;
};
const UserForm = ({ loading, ...props }: UserFormProps) => {
  const token = useSession().data?.accessToken;
  const [name, setName] = useState("");

  const { data, loading: riverLoading } = useRequest(
    () => fetcher<River[]>({ url: "/admin/rivers", params: { name }, headers: { Authorization: `Bearer ${token}` } }),
    { refreshDeps: [token, name] }
  );

  return (
    <Card title="Pengguna">
      <Form layout="vertical" disabled={loading} {...props}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="name" label="Nama" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Nama" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, type: "email" }]}>
          <Select placeholder="Role" options={Object.values(Role).map((role) => ({ label: role, value: role }))} />
        </Form.Item>
        <Form.Item name="river_id" label="Pos">
          <Select
            placeholder="Pos"
            loading={riverLoading}
            showSearch
            allowClear
            filterOption={false}
            onSearch={setName}
            options={data?.data?.map((river) => ({ label: river.name, value: river.id }))}
          />
        </Form.Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Simpan
        </Button>
      </Form>
    </Card>
  );
};

export default UserForm;
