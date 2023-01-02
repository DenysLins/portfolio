import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import styles from '@/styles/components/sweepstakes.module.scss';
import SweepstakesForgot from '@/components/Sweepstakes/Forgot';

const SweepstakesForgotPage = () => {
  return (
    <div className={styles.container}>
      <SweepstakesForgot />
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

export default SweepstakesForgotPage;
