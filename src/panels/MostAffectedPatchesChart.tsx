import XPieChart from '../components/XPieChart';
import { config } from '../config';

const MostAffectedPatchesChart: React.FC = () => {
    const PATCHES_CVE_API = config.vfeedApiUrl + "/reports/most-affected-patch-vendors"

    // Function to convert SourceObject to TargetObject
    function convertJsonObject(source: any) {
        for (let i = 0; i < source.length; i++) {
            source[i].name = source[i].product
            // source[i].title = source[i].cwe_title
        }
        return source;
    }

    return (
        <XPieChart apiUrl={PATCHES_CVE_API} convertJsonObject={convertJsonObject} />
    );
};

export default MostAffectedPatchesChart;