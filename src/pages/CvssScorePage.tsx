import { config } from "../config";
import XTable from "../components/XTable";
import { Text } from "../styled/header";

const CvssScorePage = () => {
  const PATCHES_API = config.vfeedApiUrl + "/reports/cvss_epss_scores/cve";

  return (
    <div>
      <Text>CVSS Score</Text>
      <section className="widget">
        <XTable apiUrl={PATCHES_API} uri="cvss" />
      </section>
    </div>
  );
};

export default CvssScorePage;
