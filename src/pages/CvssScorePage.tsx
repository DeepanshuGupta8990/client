import {config} from '../config';
import XTable from '../components/XTable';

const CvssScorePage = () => { 
  const PATCHES_API = config.vfeedApiUrl + "/reports/cvss_epss_scores/cve"
  
  return (
    <div>
      <h2>CVSS Score</h2>
      <section className="widget">
        <XTable apiUrl={PATCHES_API}/>
      </section>
    </div>
  )
}

export default CvssScorePage