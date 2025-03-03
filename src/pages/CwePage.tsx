import { config } from "../config";
import XTable from "../components/XTable";
import { Text } from "../styled/header";

const cwes = "cwes";

const CwePage = () => {
  const CWE_API = config.vfeedApiUrl + "/" + cwes;

  return (
    <div>
      <Text>CVE</Text>
      <section className="widget">
        <XTable apiUrl={CWE_API} uri={cwes} />
      </section>
    </div>
  );
};

export default CwePage;
