import fetcher from "@/utils/fetcher";
import { Pagination, User } from "@/interfaces";
import { Button, Card, Space } from "antd";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/next-auth";
import Table from "./table";
import Filter from "./filter";
import Link from "next/link";

type SearchParamsType = Partial<User & Pagination>;

const UserPage = async ({ searchParams }: { searchParams: SearchParamsType }) => {
  const session = await getServerSession(authOptions);

  const data = await fetcher<User[]>({
    url: "/admin/users",
    params: searchParams,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card title="Pengguna">
        <Filter initialValues={searchParams} />
      </Card>
      <Card
        title="Hasil Pencarian"
        extra={
          <Link href="/admin/user/create">
            <Button type="primary">Buat Baru</Button>
          </Link>
        }
      >
        <Table
          rowKey="id"
          dataSource={data.data}
          pagination={{
            total: data.meta?.total || 0,
            current: data.meta?.page || 1,
            pageSize: data.meta?.limit || 10,
          }}
        />
      </Card>
    </Space>
  );
};

export const dynamic = "force-dynamic";
export default UserPage;
