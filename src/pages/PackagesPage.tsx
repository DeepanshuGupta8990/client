import { config } from '../config';
import XTable from '../components/XTable';

const pkgs = "pkgs"

const PackagesPage = () => {
    const PACKAGES_API = config.vfeedApiUrl + "/" + pkgs

    return (
        <div>
            <h2>Packages</h2>
            <section className="widget">
                <XTable apiUrl={PACKAGES_API} uri={pkgs} />
            </section>
        </div>
    )
}

export default PackagesPage