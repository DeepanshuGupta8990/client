import { config } from "../config";
import XTable from "../components/XTable";
import { Text } from "../styled/header";

const pkgs = "pkgs";

const PackagesPage = () => {
  const PACKAGES_API = config.vfeedApiUrl + "/" + pkgs;

  return (
    <div>
      <Text>Packages</Text>
      <section className="widget">
        <XTable apiUrl={PACKAGES_API} uri={pkgs} />
      </section>
    </div>
  );
};

export default PackagesPage;
