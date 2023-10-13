import fetcher from "@/utils/fetcher";
import ObservationCard, { ObservationCardProps } from "../mobile/components/ObservationCard";
import { River, RiverCountType } from "@/interfaces";
import { Card, Col, Row, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import Map from "@/components/Map";
import Link from "next/link";

const Page = async () => {
  const riverCount = await fetcher<RiverCountType>({ url: "/rivers-count" });
  const rivers = await fetcher<River[]>({ url: "/rivers" });

  const observationCard: ObservationCardProps[] = [
    {
      title: "Curah Hujan",
      icon: "/image/rainfall.png",
      color: "bg-green-600",
      total: riverCount.data.pch?.total || 0,
      manual: riverCount.data.pch?.manual || 0,
      telemetry: riverCount.data.pch?.telemetry || 0,
      href: "/admin/river-observation?type=pch",
    },
    {
      title: "Duga Air",
      icon: "/image/waterlevel.png",
      color: "bg-blue-600",
      total: riverCount.data.tma?.total || 0,
      manual: riverCount.data.tma?.manual || 0,
      telemetry: riverCount.data.tma?.telemetry || 0,
      href: "/admin/river-observation?type=tma",
    },
    {
      title: "Klimatologi",
      icon: "/image/climate.png",
      color: "bg-red-500",
      total: riverCount.data.iklim?.total || 0,
      manual: riverCount.data.iklim?.manual || 0,
      telemetry: riverCount.data.iklim?.telemetry || 0,
      href: "/admin/river-observation?type=iklim",
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col sm={24} lg={18}>
          <Card hoverable>
            <Map
              height={200}
              width={400}
              // markers={rivers.data.map((river) => ({
              //   position: [river.latitude, river.longitude],
              //   popup: river.name,
              // }))}
              search={{
                data: rivers.data
                  ? rivers.data.map((river) => ({
                      position: [river.latitude, river.longitude],
                      title: river.name,
                    }))
                  : [],
              }}
              center={[3.3166, 117.5895]}
              zoom={8}
            />
          </Card>
        </Col>
        <Col sm={24} span={4}></Col>
        {observationCard.map((item, index) => (
          <Col xs={12} lg={6} key={index}>
            <Card hoverable cover={<img alt="example" src={item.icon} />}>
              <Link href={item.href || "#"}>
                <Meta
                  title={item.title}
                  description={
                    <>
                      <strong>Total: {item.total || item.manual + item.telemetry}</strong> |
                      <strong> Manual: {item.manual}</strong> |<strong> Telemetry: {item.telemetry}</strong>
                    </>
                  }
                />
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export const revalidate = 0;
export default Page;
