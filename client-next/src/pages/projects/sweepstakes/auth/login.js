import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SweepstakesLogin from '@/components/Sweepstakes/Login';
import styles from '@/styles/components/sweepstakes.module.scss';

const SweepstakesLoginPage = () => {
  return (
    <div className={styles.container}>
      <SweepstakesLogin />
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'sweepstakes',
        'footer',
        'navigation',
      ])),
    },
  };
}

export default SweepstakesLoginPage;
