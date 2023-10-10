"use client";

import { Table as AntdTable, TableProps, TablePaginationConfig, Space, Button } from "antd";
import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { River } from "@/interfaces";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileExcelOutlined } from "@ant-design/icons";
import Link from "next/link";

const Table = (props: TableProps<River>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = qs.parse(useSearchParams().toString());

  const coloumn: TableProps<River>["columns"] = [
    {
      title: "Nama Pos",
      dataIndex: "name",
    },
    {
      title: "Nomor Register",
      dataIndex: "register_number",
    },
    {
      title: "WS/DAS",
      dataIndex: "ws_name",
    },
    {
      title: "Sungai Induk",
    },
    {
      title: "Anak Sungai",
    },
    {
      title: "Tipe Atau Jenis",
    },
    {
      title: "Aksi",
      fixed: "right",
      dataIndex: "id",
      render: (id, record) => (
        <Space>
          <Link href={`/admin/river-observation/${id}/${record.type}/2023/export`}>
            <Button ghost type="primary" icon={<FileExcelOutlined />} />
          </Link>
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
