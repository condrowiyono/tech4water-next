import { authOptions } from "@/utils/next-auth";
import { getServerSession } from "next-auth";

const mapType = new Map([
  ["pch", "rainfalls"],
  ["tma", "waterlevels"],
  ["iklim", "climates"],
]);

type Params = {
  river: string;
  type: string;
  year: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { river, type, year } = params;
  console.log({ river, type });
  console.log(mapType.get(type));
  const session = await getServerSession(authOptions);

  const url = `http://localhost:8000/admin/${mapType.get(type)}/export/${river}?year=${year}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const blob = await response.blob();
  return new Response(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename=${river}-${type}-${year}.xlsx`,
    },
  });
}
