import {config} from '../config';
import XTable from '../components/XTable';

const PatchesPage = () => { 
  const PATCHES_API = config.vfeedApiUrl + "/patches"
  
  return (
    <div>
      <h2>Patches</h2>
      <section className="widget">
        <XTable apiUrl={PATCHES_API}/>
      </section>
    </div>
  )
}

export default PatchesPage