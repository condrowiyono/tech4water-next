import { River } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import { authOptions } from "@/utils/next-auth";
import { Card, Collapse, CollapseProps, Descriptions } from "antd";
import { getServerSession } from "next-auth";

type ParamsType = { river: string };

const RiverDetail = async ({ params }: { params: ParamsType }) => {
  const session = await getServerSession(authOptions);

  const data = await fetcher<River>({
    url: `/admin/rivers/${params.river}`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const items: CollapseProps["items"] = [
    {
      key: "detail",
      label: "Data Umum Pos Hidrologi",
      children: (
        <Descriptions
          column={1}
          items={[
            { label: "Nama Pos", children: data.data.name },
            { label: "Nomor Register", children: data.data.registry_number },
            { label: "WS/DAS", children: data.data.watershed },
            { label: "Sungai Induk", children: data.data.main_river },
            { label: "Anak Sungai", children: data.data.tributary },
            { label: "Tipe", children: data.data.type },
            { label: "Jenis", children: data.data.observation },
            { label: "Longitude", children: data.data.longitude },
            { label: "Latitute", children: data.data.latitude },
            { label: "Desa", children: data.data.village },
            { label: "Kecamatan", children: data.data.district },
            { label: "Kabupaten", children: data.data.city },
          ]}
        />
      ),
    },
    {
      key: "condition",
      label: "Kondisi Pos Hidrologi",
      children: <p></p>,
    },
  ];

  return (
    <Card title="Data Pos Hidrologi">
      <Collapse items={items} defaultActiveKey={["detail"]} />
    </Card>
  );
};

export const dynamic = "force-dynamic";
export default RiverDetail;
