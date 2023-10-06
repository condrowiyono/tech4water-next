import BackButton from "../../components/BackButton";
import fetcher from "@/utils/fetcher";
import { WaterLevelData, River } from "../../interfaces.ts/interface";
import { Descriptions, Segmented } from "antd";
import { cookies } from "next/headers";
import { formatDateTime } from "@/utils/dayjs";
import InputForm from "./component/form";

type WaterLevelDetailPageProps = {
  params: { id: string };
};

const fetch = async (id: string) => {
  const token = cookies().get("token")?.value;

  return Promise.all([
    fetcher<River>({
      url: `/rivers/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetcher<WaterLevelData[]>({
      url: `/mobile/waterlevels/today/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);
};

const WaterLevelDetailPage = async ({ params }: WaterLevelDetailPageProps) => {
  const [river, data] = await fetch(params.id);

  return (
    <>
      <BackButton href="/mobile/waterlevel" />
      <h1 className="mb-2">Pos Duga Air</h1>
      <Descriptions
        column={1}
        title="Informasi Pos Duga Air"
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
        ]}
      />
      <InputForm value={data.data} />
    </>
  );
};

export default WaterLevelDetailPage;
