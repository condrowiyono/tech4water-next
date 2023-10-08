"use client";

import { Form, DatePicker, InputNumber, Select, Button, notification } from "antd";
import dayjs from "dayjs";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { useRequest } from "ahooks";
import { useParams, useRouter } from "next/navigation";
import { RainfallData } from "@/interfaces";

const save = (data: Partial<RainfallData>) => {
  return fetcher({ url: "/mobile/rainfalls", method: "POST", data });
};

const InputForm = ({ value }: { value: RainfallData }) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { run, loading } = useRequest(save, {
    manual: true,
    onFinally: router.refresh,
    onSuccess: () => notification.success({ message: "Sukses Menyimpan Data" }),
    onError: (err) => {
      const error = err as ErrorResponse;
      notification.error({
        message: "Gagal Menyimpan Data",
        description: error.response?.data.errors,
      });
    },
  });

  const handleFinish = (data: Partial<RainfallData>) => {
    const { date, ...rest } = data;
    run({ ...rest, river_id: Number(id), date: dayjs(date).toISOString() });
  };

  return (
    <Form initialValues={{ date: dayjs() }} disabled={!!value} onFinish={handleFinish} layout="vertical">
      <Form.Item label="Tanngal" name="date">
        <DatePicker disabled />
      </Form.Item>
      <Form.Item label="Hasil Pengamatan" name="data">
        <InputNumber type="number" inputMode="numeric" suffix="mm" />
      </Form.Item>
      <Form.Item label="Lama Hujan" name="duration">
        <InputNumber className="w-full" type="number" inputMode="numeric" suffix="menit" />
      </Form.Item>
      <Form.Item label="Keterangan" name="description">
        <Select
          options={[
            { label: "Tidak Ada", value: "tidak-ada" },
            { label: "Hujan Ringan", value: "ringan" },
            { label: "Hujan Sedang", value: "sedang" },
            { label: "Hujan Lebat", value: "lebat" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Kejadian" name="event">
        <Select
          options={[
            { label: "Tidak Ada", value: "tidak-ada" },
            { label: "Banjir", value: "banjir" },
            { label: "Tanah Longsor", value: "tanah-longsor" },
            { label: "Banjir dan Longsor", value: "banjir-longsor" },
          ]}
        />
      </Form.Item>
      <Button loading={loading} block type="primary" htmlType="submit">
        Simpan
      </Button>
    </Form>
  );
};

export default InputForm;
