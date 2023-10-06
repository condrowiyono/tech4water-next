"use client";

import {
  Form,
  DatePicker,
  InputNumber,
  Select,
  Button,
  notification,
  Alert,
} from "antd";
import dayjs from "dayjs";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { useRequest } from "ahooks";
import { useParams, useRouter } from "next/navigation";
import { RainfallData } from "../../../interfaces.ts/interface";

const save = (data: Partial<RainfallData>) => {
  return fetcher<RainfallData>({
    url: "/mobile/rainfalls",
    method: "POST",
    data,
  });
};

type RainfallInputFormProps = {
  initialValues?: Partial<RainfallData>;
};
const RainfallInputForm = ({ initialValues }: RainfallInputFormProps) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { run, loading } = useRequest(save, {
    manual: true,
    onSuccess: () => notification.success({ message: "Sukses Menyimapn Data" }),
    onError: (err) => {
      const error = err as ErrorResponse;
      notification.error({
        message: "Gagal Menyimpan Data",
        description: error.response?.data.errors,
      });
    },
    onFinally: router.refresh,
  });

  const handleFinish = (data: Partial<RainfallData>) => {
    const { date, ...rest } = data;
    run({ ...rest, river_id: Number(id), date: dayjs(date).toISOString() });
  };

  return (
    <Form disabled={!!initialValues} onFinish={handleFinish}>
      {initialValues && <Alert type="success" message="Data sudah diinput" />}
      <Form.Item label="Tanngal" name="date">
        <DatePicker disabled />
      </Form.Item>
      <Form.Item label="Hasil Pengamatan" name="data">
        <InputNumber type="number" inputMode="numeric" suffix="mm" />
      </Form.Item>
      <Form.Item label="Lama Hujan" name="duration">
        <InputNumber
          className="w-full"
          type="number"
          inputMode="numeric"
          suffix="menit"
        />
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

export default RainfallInputForm;
