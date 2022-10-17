import useSWR from "swr";
import { getSwordConfig, getSwordVersion } from "@/services/sword";

export const HomePage = () => {
  const { data: version } = useSWR("getSwordVersion", getSwordVersion);
  const { data: swordConfig } = useSWR("getSwordConfig", getSwordConfig);

  console.log(swordConfig);

  return (
    <div className="px-5 py-3">
      <div className="text-lg rounded-md bg-slate-50 py-2 px-4 mb-4">Sword</div>

      <div className="text-xl text-right">
        Sword Version: {version?.version}
      </div>
    </div>
  );
};
