import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isUserAdmin } from '../../../utils/auth';

const NavStyled = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

const UserInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const SpanStyled = styled('span')({
  margin: '0 1rem',
});

const SweepstakesNav = () => {
  const { data: session } = useSession();
  const admin = isUserAdmin(session);
  const { t } = useTranslation('sweepstakes');
  const router = useRouter();

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  return (
    <NavStyled>
      <UserInfo>
        <Image
          alt="Vercel logo"
          src={session.user.image}
          width={32}
          height={32}
          style={{
            height: 'auto',
            borderRadius: '50%',
            border: '1px solid white',
          }}
        />
        <SpanStyled>{session.user.name}</SpanStyled>
      </UserInfo>
      <div>
        {admin && (
          <Button
            sx={{ width: 100, marginRight: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() => {
              router.push('/projects/sweepstakes/admin');
            }}
          >
            Admin
          </Button>
        )}
        <Button
          sx={{ width: 100 }}
          variant="contained"
          color="primary"
          onClick={() =>
            signOut({
              callbackUrl: `${origin}/projects/sweepstakes/auth/login`,
            })
          }
        >
          {t('logout')}
        </Button>
      </div>
    </NavStyled>
  );
};

export default SweepstakesNav;
