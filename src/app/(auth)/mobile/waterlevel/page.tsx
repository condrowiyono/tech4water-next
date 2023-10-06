import BackButton from "../components/BackButton";
import RiverCard from "../components/RiverCard";
import fetcher from "@/utils/fetcher";
import { River } from "../interfaces.ts/interface";

const WaterLevelPage = async () => {
  const river = await fetcher<River[]>({
    url: "/rivers",
    params: { type: "tma" },
  });

  return (
    <>
      <BackButton href="/mobile" />
      <h1 className="mb-2">Pos Duga Air</h1>

      <div className="grid grid-cols-2 gap-2">
        {river.data.map((item, index) => (
          <RiverCard key={index} {...item} />
        ))}
      </div>
    </>
  );
};

export default WaterLevelPage;
