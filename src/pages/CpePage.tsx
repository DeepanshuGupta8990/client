import {config} from '../config';
import XTable from '../components/XTable';

const CpePage = () => { 
  const CPE_API = config.vfeedApiUrl + "/cpe"
  
  return (
    <div>
      <h2>Platform Details</h2>
      <section className="widget">
        <XTable apiUrl={CPE_API}/>
      </section>
    </div>
  )
}

export default CpePage