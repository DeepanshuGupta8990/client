import { config } from "../config";
import XTable from "../components/XTable";
import { Text } from "../styled/header";

const patches = "patches";

const PatchesPage = () => {
  const PATCHES_API = config.vfeedApiUrl + "/" + patches;

  return (
    <div>
      <Text>Patches</Text>
      <section className="widget">
        <XTable apiUrl={PATCHES_API} uri={patches} />
      </section>
    </div>
  );
};

export default PatchesPage;
