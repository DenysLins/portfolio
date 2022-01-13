import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import style from '@/styles/About.module.scss';

const Resume = () => {
  const { t } = useTranslation('resume');

  return (
    <div className={style.container}>
      <h1>{t('title')}</h1>
      <h2>Resume</h2>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'resume',
        'footer',
        'navigation',
      ])),
    },
  };
}

export default Resume;
