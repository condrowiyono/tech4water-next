import { useRequest } from "ahooks";
import fetcher from "@/utils/fetcher";
import { NextPage } from "next";
import { River, Pagination } from "@/interfaces";
import { useState } from "react";
import { Button, Card, Form, Input, Select, Space, Table } from "antd";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/next-auth";
import qs from "query-string";

type SearchParamsType = Pick<River & Pagination, "name" | "type" | "limit" | "page">;
const RiverObservationPage = async ({ searchParams }: { searchParams: SearchParamsType }) => {
  const session = await getServerSession(authOptions);

  const data = await fetcher<River[]>({
    url: "/admin/rivers",
    params: searchParams,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card title="Pencarian"></Card>
      <Card title="Hasil">{JSON.stringify(data)}</Card>
    </Space>
  );
};

export default RiverObservationPage;
