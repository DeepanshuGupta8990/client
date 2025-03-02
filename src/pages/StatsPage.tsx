import { config } from "../config";
import XStatsTable from "../components/XStatsTable";
import { Text } from "../styled/header";

const stats = "stats";

const StatsPage = () => {
  const STATS_URL = config.vfeedApiUrl + "/" + stats;

  return (
    <div>
      <Text>vFeed Status</Text>
      <section className="widget">
        <XStatsTable apiUrl={STATS_URL} uri={stats} />
      </section>
    </div>
  );
};

export default StatsPage;
