import { config } from '../config';
import XTable from '../components/XTable';

const cwes = "cwes"

const CwePage = () => {
    const CWE_API = config.vfeedApiUrl + "/" + cwes

    return (
        <div>
            <h2>CVE</h2>
            <section className="widget">
                <XTable apiUrl={CWE_API} uri={cwes} />
            </section>
        </div>
    )
}

export default CwePage