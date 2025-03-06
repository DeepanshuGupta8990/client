import { config } from "../config";
import XTable from "../components/XTable";
import { Text } from "../styled/header";

const CvePage = () => {
  const CVE_API = config.vfeedApiUrl + "/vulns";

  return (
    <div>
      <Text>CVE</Text>
      <section className="widget">
        <XTable apiUrl={CVE_API} uri="vulnerabilities" />
      </section>
    </div>
  );
};

export default CvePage;
