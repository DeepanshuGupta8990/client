import { config } from '../config';
import XTable from '../components/XTable';

const cpes = "cpes"

const CpePage = () => {
  const CPE_API = config.vfeedApiUrl + "/" + cpes

  return (
    <div>
      <h2>Platform Details</h2>
      <section className="widget">
        <XTable apiUrl={CPE_API} uri={cpes} />
      </section>
    </div>
  )
}

export default CpePage