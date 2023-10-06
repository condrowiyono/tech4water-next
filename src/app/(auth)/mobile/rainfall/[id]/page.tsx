import BackButton from "../../components/BackButton";
import fetcher from "@/utils/fetcher";
import { RainfallData, River } from "../../interfaces.ts/interface";
import { Descriptions } from "antd";
import { cookies } from "next/headers";
import { formatDateTime } from "@/utils/dayjs";
import RainfallInputForm from "./component/form";

type RainfallDetailPageProps = {
  params: { id: string };
};

const fetch = async (id: string) => {
  const token = cookies().get("token")?.value;

  return Promise.all([
    fetcher<River>({
      url: `/rivers/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetcher<RainfallData>({
      url: `/mobile/rainfalls/today/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);
};

const RainfallDetailPage = async ({ params }: RainfallDetailPageProps) => {
  const [river, data] = await fetch(params.id);

  return (
    <>
      <BackButton href="/mobile/rainfall" />
      <h1 className="mb-2">Pos Curah Hujan</h1>
      <Descriptions
        column={1}
        title="Informasi Pos Curah Hujan"
        items={[
          {
            key: "name",
            label: "Nama Pos",
            children: river.data.name,
          },
          {
            key: "city",
            label: "Kabupaten",
            children: river.data.city || "-",
          },
          {
            key: "date",
            label: "Data diinput pada",
            children: data.data?.date ? formatDateTime(data.data?.date) : "-",
          },
          {
            key: "created_by",
            label: "Data diinput oleh",
            children: data.data?.user.email || "-",
          },
        ]}
      />
      <RainfallInputForm initialValues={data.data} />
    </>
  );
};

export default RainfallDetailPage;
