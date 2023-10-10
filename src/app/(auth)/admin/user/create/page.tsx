"use client";

import { Card, notification } from "antd";
import Form, { FormSchema } from "@/components/Form";
import { River, User } from "@/interfaces";
import { useRequest } from "ahooks";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();
  const token = useSession().data?.accessToken;
  const [name, setName] = useState("");

  const { loading, data } = useRequest(
    () => fetcher<River[]>({ url: "/admin/rivers", params: { name }, headers: { Authorization: `Bearer ${token}` } }),
    { refreshDeps: [token, name] }
  );

  const { loading: mutationLoading, run } = useRequest(
    (data) =>
      fetcher<River[]>({ url: "/admin/users", method: "POST", data, headers: { Authorization: `Bearer ${token}` } }),
    {
      manual: true,
      onSuccess: () => {
        notification.success({ message: "Sukses Menyimpan Data" });
        router.push("/admin/user");
      },
      onError: (err) => {
        const error = err as ErrorResponse;
        notification.error({
          message: "Gagal Menyimpan Data",
          description: error.response?.data.errors,
        });
      },
    }
  );

  const schema: FormSchema<User>[] = [
    {
      name: "email",
      label: "Email",
      type: "text",
    },
    {
      name: "name",
      label: "Nama",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      inputProps: {
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Operator", value: "operator" },
        ],
      },
    },
    {
      name: "river_id",
      label: "Pos",
      type: "select",
      inputProps: {
        loading: loading,
        showSearch: true,
        allowClear: true,
        filterOption: false,
        options: data?.data?.map((river) => ({ label: river.name, value: river.id })),
        onSearch: setName,
      },
    },
  ];

  return (
    <Card title="Buat Pengguna">
      <Form
        submitText="Simpan"
        submitButtonProps={{ loading: mutationLoading }}
        schema={schema}
        labelCol={{ xs: 24, sm: 4 }}
        wrapperCol={{ xs: 24, sm: 12 }}
        onSubmit={run}
      />
    </Card>
  );
};

export default Create;
