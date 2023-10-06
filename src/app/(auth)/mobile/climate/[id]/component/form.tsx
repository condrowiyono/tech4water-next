"use client";

import {
  Form,
  DatePicker,
  InputNumber,
  Select,
  Button,
  notification,
  Alert,
  Table,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { useRequest } from "ahooks";
import { useParams, useRouter } from "next/navigation";
import { ClimateData } from "../../../interfaces.ts/interface";

const save = (data: Partial<ClimateData>) => {
  return fetcher<ClimateData>({
    url: "/mobile/climates",
    method: "POST",
    data,
  });
};

type InputFormProps = {
  initialValues?: Partial<ClimateData>;
};
const InputForm = ({ initialValues }: InputFormProps) => {
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

  const handleFinish = (data: Partial<ClimateData>) => {
    const { date, ...rest } = data;
    run({
      ...rest,
      river_id: Number(id),
      date: dayjs(date).toISOString(),
    });
  };

  return (
    <Form onFinish={handleFinish} disabled={!!initialValues}>
      {initialValues && <Alert type="success" message="Data sudah diinput" />}
      <Form.Item label="Tanngal" name="date">
        <DatePicker disabled value={dayjs()} />
      </Form.Item>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Suhu Minimum" name="min_temperature">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Suhu Maksimum" name="max_temperature">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Curah Hujan" name="rainfall">
        <InputNumber placeholder="Curah Hujan (mm)" style={{ width: "100%" }} />
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Kelembapan Bawah" name="wet_humidity">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Kelembapan Kering" name="dry_humidity">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Kelembapan" name="humidity">
        <InputNumber placeholder="Kelembapan" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Kecepatan Angin" name="wind_speed">
        <InputNumber placeholder="Kecepatan Angin" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Penguapan" name="evaporation">
        <InputNumber placeholder="Penguapan" style={{ width: "100%" }} />
      </Form.Item>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Termometer Apung Min" name="min_float_level">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Termometer Apung Maks" name="max_float_level">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Pembacaan Hook Naik" name="upper_hook">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Pembacaan Hook Turun" name="lower_hook">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Proses Penyinaran Matahari" name="illumination_process">
        <Select
          options={[
            { label: "Terbakar", value: "terbakar" },
            { label: "Tidak Terbakar", value: "tidak-terbakar" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Durasi Penyinaran Matahari"
        name="illumination_duration"
      >
        <InputNumber
          placeholder="Durasi Penyinaran Matahari"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Button loading={loading} block type="primary" htmlType="submit">
        Simpan
      </Button>
    </Form>
  );
};

export default InputForm;
