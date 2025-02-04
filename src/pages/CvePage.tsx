import { config } from '../config';
import XTable from '../components/XTable';

const CvePage = () => {
  const CVE_API = config.vfeedApiUrl + "/vulns"

  return (
    <div>
      <h2>CVE</h2>
      <section className="widget">
        <XTable apiUrl={CVE_API} uri="vulnerabilities" />
      </section>
    </div>
  )
}

export default CvePage