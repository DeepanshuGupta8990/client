import XBarChart from '../components/XBarChart';
import { config } from '../config';

const TopCweChart: React.FC = () => {
    const TOP_CWE_API = config.vfeedApiUrl + "/reports/top-cwe"

    // Function to convert SourceObject to TargetObject
    function convertJsonObject(source: any) {
        for (let i = 0; i < source.length; i++) {
            source[i].name = source[i].cwe_id,
                source[i].value = source[i].cve_count,
                source[i].title = source[i].cwe_title
        }
        return source;
    }

    return (
        <XBarChart apiUrl={TOP_CWE_API} convertJsonObject={convertJsonObject} />
    );
};

export default TopCweChart;