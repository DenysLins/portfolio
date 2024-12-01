import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SweepstakesLogon from '@/components/Sweepstakes/Logon';
import styles from '@/styles/components/sweepstakes.module.scss';

const SweepstakesLogonPage = () => {
  return (
    <div className={styles.container}>
      <SweepstakesLogon />
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

export default SweepstakesLogonPage;
