"use client";

import { Form, DatePicker, InputNumber, Select, Button, notification, Segmented, Alert, Space } from "antd";
import dayjs from "dayjs";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { useRequest } from "ahooks";
import { useParams, useRouter } from "next/navigation";
import { WaterLevelData } from "@/interfaces";
import { useEffect, useState } from "react";
import { defaultTimezone, setTimeToDate } from "@/utils/dayjs";
import Detail from "./detail";

const PAGI = 7;
const SIANG = 12;
const SORE = 17;

type InputFormProps = {
  value?: Partial<WaterLevelData>[];
};

const save = (data: Partial<WaterLevelData>) => {
  return fetcher({ url: "/mobile/waterlevels", method: "POST", data });
};

const InputForm = ({ value }: InputFormProps) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [segment, setSegment] = useState<string | number>("Pagi");

  const [form] = Form.useForm();

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

  const handleFinish = (data: Partial<WaterLevelData>) => {
    const { date, ...rest } = data;
    run({ ...rest, river_id: Number(id), date: dayjs(date).toISOString() });
  };

  const map = new Map<string | number, Partial<WaterLevelData>>(
    Array.from(value || [], (item) => {
      const date = dayjs(item.date).tz(defaultTimezone);
      const hour = date.hour();
      if (hour === PAGI) {
        return ["Pagi", item];
      }
      if (hour === SIANG) {
        return ["Siang", item];
      }
      if (hour === SORE) {
        return ["Sore", item];
      }

      return ["", item];
    })
  );

  useEffect(() => {
    switch (segment) {
      case "Pagi":
        form.setFieldsValue({ date: setTimeToDate(new Date(), PAGI, 0, 0) });
        break;
      case "Siang":
        form.setFieldsValue({ date: setTimeToDate(new Date(), SIANG, 0, 0) });
        break;
      case "Sore":
        form.setFieldsValue({ date: setTimeToDate(new Date(), SORE, 0, 0) });
        break;
    }
  }, [segment, form]);
  return (
    <>
      <Segmented value={segment} onChange={setSegment} block options={["Pagi", "Siang", "Sore"]} className="mb-2" />
      {map.get(segment) ? (
        <Space direction="vertical" className="w-full">
          <div className="text-xl">Data Hari Ini</div>
          <Alert type="success" message="Data sudah diinput" />
          <Detail value={map.get(segment)} />
        </Space>
      ) : (
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item label="Tanngal" name="date">
            <DatePicker showTime disabled />
          </Form.Item>
          <Form.Item label="Hasil Pengamatan" name="data">
            <InputNumber type="number" inputMode="numeric" suffix="mm" />
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
      )}
    </>
  );
};

export default InputForm;
