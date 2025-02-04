import XPieChart from '../components/XPieChart';
import { config } from '../config';

const MostAffectedPackageChart: React.FC = () => {
    const PACKAGES_CVE_API = config.vfeedApiUrl + "/reports/most-affected-package-vendors"

    // Function to convert SourceObject to TargetObject
    function convertJsonObject(source: any) {
        for (let i = 0; i < source.length; i++) {
            source[i].name = source[i].vendor
            // source[i].title = source[i].cwe_title
        }
        return source;
    }

    return (
        <XPieChart apiUrl={PACKAGES_CVE_API} convertJsonObject={convertJsonObject} />
    );
};

export default MostAffectedPackageChart;