import { config } from '../config';
import XStatsTable from '../components/XStatsTable';

const stats = "stats"

const StatsPage = () => {
    const STATS_URL = config.vfeedApiUrl + "/" + stats

    return (
        <div>
            <h2>vFeed Status</h2>
            <section className="widget">
                <XStatsTable apiUrl={STATS_URL} uri={stats} />
            </section>
        </div>
    )
}

export default StatsPage