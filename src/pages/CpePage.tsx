import { config } from "../config";
import XTable from "../components/XTable";
import { Text } from "../styled/header";

const cpes = "cpes";

const CpePage = () => {
  const CPE_API = config.vfeedApiUrl + "/" + cpes;

  return (
    <div>
      <Text>Platform Details</Text>
      <section className="widget">
        <XTable apiUrl={CPE_API} uri={cpes} />
      </section>
    </div>
  );
};

export default CpePage;
