import { styled } from '@mui/system';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BoxContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
});

const NameContainer = styled('span')({
  fontSize: '3rem',
  '@media (min-width: 900px)': {
    fontSize: '9rem',
  },
});

const TitleContainer = styled('span')({
  fontSize: '1.5rem',
  '@media (min-width: 900px)': {
    fontSize: '3rem',
  },
});
const Home = () => {
  const { t } = useTranslation('common');
  return (
    <BoxContainer>
      <NameContainer>{t('name')}</NameContainer>
      <TitleContainer>{t('title')}</TitleContainer>
    </BoxContainer>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'footer',
        'navigation',
      ])),
    },
  };
}

export default Home;
