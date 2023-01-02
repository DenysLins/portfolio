import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SweepstakesAdmin from '@/components/Sweepstakes/Admin';
import SweepstakesNav from '@/components/Sweepstakes/Nav';
import styles from '@/styles/components/sweepstakes.module.scss';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useSession } from 'next-auth/react';

const SweepstakesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '100vh',
  width: '100vw',
  padding: '5rem 1rem',
});

const SweepstakesAdminPage = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <CircularProgress color="inherit" />
      </div>
    );
  } else {
    if (session) {
      return (
        <SweepstakesContainer>
          <SweepstakesNav />
          <SweepstakesAdmin />
        </SweepstakesContainer>
      );
    }
  }
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

export default SweepstakesAdminPage;
