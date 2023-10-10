"use client";

import { Table as AntdTable, TableProps, TablePaginationConfig, Space, Button } from "antd";
import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { User } from "@/interfaces";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Table = (props: TableProps<User>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = qs.parse(useSearchParams().toString());

  const coloumn: TableProps<User>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Nama Pengguna",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "roles",
    },
    {
      title: "Pos",
      dataIndex: ["river", "name"],
    },
    {
      title: "Action",
      fixed: "right",
      dataIndex: "id",
      render: (id) => (
        <Space>
          <Button>Edit</Button>
          <Button>Hapus</Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = ({ current, pageSize }: TablePaginationConfig) => {
    const finalURL = qs.stringifyUrl({
      url: pathname,
      query: { ...searchParams, page: current, limit: pageSize },
    });

    router.push(finalURL);
  };

  return <AntdTable columns={coloumn} onChange={handleTableChange} {...props} />;
};

export default Table;
