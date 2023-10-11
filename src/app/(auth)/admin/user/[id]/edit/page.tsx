"use client";

import { useRequest } from "ahooks";
import UserForm from "../../(component)/form";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { User } from "@/interfaces";
import { Form, notification } from "antd";
import router from "next/router";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const Edit = () => {
  const token = useSession().data?.accessToken;
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<User>();

  const { loading } = useRequest(
    () => fetcher<User>({ url: `/admin/users/${id}`, headers: { Authorization: `Bearer ${token}` } }),
    { refreshDeps: [token, id], onSuccess: (data) => form.setFieldsValue(data.data) }
  );

  const { loading: mutationLoading, run } = useRequest(
    (data) =>
      fetcher<User>({ url: `/admin/users/${id}`, method: "PUT", data, headers: { Authorization: `Bearer ${token}` } }),
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

  return <UserForm form={form} onFinish={run} loading={mutationLoading || loading} />;
};

export default Edit;
