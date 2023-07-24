import { GetServerSideProps } from "next";

import { getStats } from "@/modules/stats/controllers/stats.controller";
import { StatsProps } from "@/modules/stats/types/stats.type";

export { default } from "@/modules/stats/views";

export const getServerSideProps: GetServerSideProps<StatsProps> = async (
  ctx
) => {
  ctx.res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const stats = await getStats();

  return {
    props: stats,
  };
};
