import ObservationCard, { ObservationCardProps } from "../mobile/components/ObservationCard";

const observationCard: ObservationCardProps[] = [
  {
    title: "Curah Hujan",
    icon: "/image/rainfall.png",
    color: "bg-green-600",
    total: 100,
    manual: 50,
    telemetric: 50,
    href: "/admin/river-observation?type=pch",
  },
  {
    title: "Duga Air",
    icon: "/image/waterlevel.png",
    color: "bg-blue-600",
    total: 100,
    manual: 50,
    telemetric: 50,
    href: "/admin/river-observation?type=tma",
  },
  {
    title: "Klimatologi",
    icon: "/image/climate.png",
    color: "bg-red-500",
    total: 100,
    manual: 50,
    telemetric: 50,
    href: "/admin/river-observation?type=iklim",
  },
];

const Page = () => {
  return (
    <div>
      <div className="mb-4">
        <h1>Dashboard</h1>
        <h2>Hidrologi</h2>
      </div>
      <div className="grid grid-cols-6  gap-2">
        {observationCard.map((item, index) => (
          <ObservationCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
