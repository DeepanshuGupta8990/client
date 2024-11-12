import XBarChart from '../components/XBarChart';
import {config} from '../config';
  
const HistoricGrowthTrendPackageVulnChart: React.FC = () => {
    const HISTORIC_PACKAGE_VULN_API = config.vfeedApiUrl + "/reports/historic_growth_trend_package_vuln"
    
    // Function to convert SourceObject to TargetObject
    function convertJsonObject(source: any) {
        for (let i = 0; i < source.length; i++) {
            source[i].name = source[i].package,
            source[i].value = source[i].vulnerability_count,
            source[i].title = source[i].product
        }
        return source;
    }

    return (
        <XBarChart apiUrl={HISTORIC_PACKAGE_VULN_API} convertJsonObject={convertJsonObject}/>
    );
  };
  
  export default HistoricGrowthTrendPackageVulnChart;