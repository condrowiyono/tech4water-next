"use client";

import { Table as AntdTable, TableProps, TablePaginationConfig, Space, Button, Drawer, notification } from "antd";
import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { River } from "@/interfaces";
import { FileExcelOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Form from "@/components/Form";
import { dayjsTz } from "@/utils/dayjs";
import { useRequest } from "ahooks";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import Link from "next/link";

const mapType = new Map([
  ["pch", "rainfalls"],
  ["tma", "waterlevels"],
  ["iklim", "climates"],
]);

const Table = (props: TableProps<River>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = qs.parse(useSearchParams().toString());
  const session = useSession();
  const token = session.data?.accessToken;

  const [downloadDrawer, setDownloadDrawer] = useState<{ visible: boolean; data?: River }>();
  const [importDrawer, setImportDrawer] = useState<{ visible: boolean; data?: River }>();

  const { run } = useRequest(
    (data) => {
      const { type = "", id } = importDrawer?.data || {};

      return fetcher({
        url: `admin/${mapType.get(type)}/${id}/import`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        notification.success({
          message: "Sukses Import Data",
        });

        setImportDrawer({ visible: false, data: undefined });
        router.refresh();
      },
      onError: (err) => {
        const error = err as ErrorResponse;

        notification.error({
          message: "Gagal Import Data",
          description: error.response?.data.errors,
        });
      },
    }
  );
  const importRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    if (!importRef.current?.files?.length) return;

    console.log(importRef.current?.files);
    const formData = new FormData();
    formData.append("file", importRef.current.files[0]);

    run(formData);
  };

  const handleShowImport = (value: River) => {
    setImportDrawer({ visible: true, data: value });
  };

  const handleShowDownload = (value: River) => {
    setDownloadDrawer({ visible: true, data: value });
  };

  const handleDownload = (values: { year: string; type: "xlsx" | "pdf" }) => {
    window.open(
      `/admin/river-observation/${downloadDrawer?.data?.id}/${downloadDrawer?.data?.type}/${values.year}/export?type=${values.type}`
    );
  };

  const coloumn: TableProps<River>["columns"] = [
    { title: "Nama Pos", dataIndex: "name" },
    { title: "Nomor Register", dataIndex: "registry_number" },
    { title: "Sungai Induk", dataIndex: "main_river" },
    { title: "Anak Sungai", dataIndex: "tributary" },
    { title: "Jenis", dataIndex: "observation" },
    {
      title: "Aksi",
      fixed: "right",
      dataIndex: "id",
      render: (id, record) => (
        <Space>
          <Link href={`/admin/river-observation/${id}`}>
            <Button size="small">Detail</Button>
          </Link>
          <Button onClick={() => handleShowImport(record)} icon={<FileExcelOutlined />} size="small">
            Import Data
          </Button>
          <Button onClick={() => handleShowDownload(record)} icon={<FileExcelOutlined />} size="small" type="primary">
            Download Data
          </Button>
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

  return (
    <>
      <AntdTable scroll={{ x: "max-content" }} columns={coloumn} onChange={handleTableChange} {...props} />
      <Drawer
        open={downloadDrawer?.visible}
        title={downloadDrawer?.data?.name || "Download Data"}
        onClose={() => setDownloadDrawer({ visible: false, data: undefined })}
      >
        <Form
          initialValues={{ year: dayjsTz().year().toString(), type: "xlsx" }}
          submitText="Download"
          resetButtonProps={{ style: { display: "none" } }}
          schema={[
            {
              name: "year",
              label: "Tahun",
              type: "select",
              inputProps: {
                options: [
                  { label: "2021", value: "2021" },
                  { label: "2022", value: "2022" },
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                  { label: "2025", value: "2025" },
                ],
              },
            },
            {
              name: "type",
              label: "Format Download",
              type: "select",
              inputProps: {
                options: [
                  { label: "Excel", value: "xlsx" },
                  { label: "PDF", value: "pdf", disabled: true },
                ],
              },
            },
          ]}
          onSubmit={handleDownload}
        />
      </Drawer>
      <Drawer
        open={importDrawer?.visible}
        title={importDrawer?.data?.name || "Import Data"}
        onClose={() => {
          importRef.current?.value && (importRef.current.value = "");
          setImportDrawer({ visible: false, data: undefined });
        }}
      >
        <Space direction="vertical" className="w-full">
          <input ref={importRef} type="file" accept=".xlsx" />
          <Button type="primary" block onClick={handleImport}>
            Import
          </Button>
        </Space>
      </Drawer>
    </>
  );
};

export default Table;
