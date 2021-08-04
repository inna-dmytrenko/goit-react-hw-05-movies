import Loader from 'react-loader-spinner';
import styles from './styles.module.css';
const Spinner = () => (
  <div className={styles.spinner}>
    <Loader type="Bars" color="#00BFFF" height={80} width={80} />
  </div>
);
export default Spinner;
