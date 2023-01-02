import { styled } from '@mui/system';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

const ProjectsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '100vh',
  width: '100vw',
  padding: '6rem 1.5rem 3rem 1.5rem',
  '& > ul': {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  '& > ul > li': {
    margin: '1rem 0',
    fontSize: '1.5rem',
  },
});

const Projects = () => {
  const { t } = useTranslation('projects');
  return (
    <ProjectsContainer>
      <ul>
        <li>
          <Link href={'/projects/salary'}>1. {t('1')}</Link>
        </li>
        <li>
          <Link href={'/projects/sweepstakes'}>2. {t('2')}</Link>
        </li>
      </ul>
    </ProjectsContainer>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'projects',
        'footer',
        'navigation',
      ])),
    },
  };
}

export default Projects;
