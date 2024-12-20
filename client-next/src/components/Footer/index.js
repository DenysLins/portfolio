import { styled } from '@mui/system';
import { useTranslation } from 'next-i18next';

const FooterContainer = styled('footer')({
  position: 'absolute',
  bottom: '1.5rem',
  left: '1rem',
  zIndex: 2,
  fontSize: '0.7rem',
  '@media only screen and (min-width: 900px)': {
    fontSize: '1rem',
  },
});

const Footer = () => {
  const { t } = useTranslation('footer');
  return (
    <FooterContainer>
      <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
        {t('next')}
      </a>
      <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
        {t('vercel')}
      </a>
    </FooterContainer>
  );
};

export default Footer;
