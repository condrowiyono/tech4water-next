import fetcher from "@/utils/fetcher";
import { River, Pagination } from "@/interfaces";
import { Card, Space } from "antd";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/next-auth";
import Table from "./table";
import Filter from "./filter";

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
      <Card title="Pencarian">
        <Filter initialValues={searchParams} />
      </Card>
      <Card title="Hasil">
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

export default RiverObservationPage;
