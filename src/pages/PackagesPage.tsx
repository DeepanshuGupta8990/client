import {config} from '../config';
import XTable from '../components/XTable';

const PackagesPage = () => { 
  const PACKAGES_API = config.vfeedApiUrl + "/packages"
  
  return (
    <div>
      <h2>Packages</h2>
      <section className="widget">
        <XTable apiUrl={PACKAGES_API}/>
      </section>
    </div>
  )
}

export default PackagesPage