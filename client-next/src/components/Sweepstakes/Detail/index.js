import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/system';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SweepstakesListHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '0.5rem 0',
});

const SweepstakesListTitle = styled('span')({
  fontSize: '1.5rem',
});

const SweepstakesTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& > h1': {
    fontSize: '1rem',
  },
});

const SweepstakesMatchesContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  flexDirection: 'column',
  width: '100%',
  margin: '1rem 0',
  maxHeight: '100%',
  overflow: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '@media only screen and (min-width: 900px)': {
    width: '100%',
    justifyContent: 'start',
  },
});

const SweepstakesMatchContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 4fr 1fr 1fr 1fr 4fr 1fr',
  alignItems: 'center',
  justifyItems: 'center',
  marginBottom: '1rem',
  width: '100%',

  '@media only screen and (min-width: 900px)': {
    width: '60%',
  },
});

function SweepstakesDetail({ sweepstake }) {
  const { t } = useTranslation('sweepstakes');
  const [value, setValue] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [round, setRound] = useState(null);
  const [championship, setChampionship] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/sweepstakes/championships/${sweepstake.championshipId}`)
      .then((res) => {
        setChampionship(res.data);
        setValue(res.data.rodada_atual ? res.data.rodada_atual.rodada : 1);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/sweepstakes/championships/${sweepstake.championshipId}/rounds`)
      .then((res) => {
        setRounds(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/sweepstakes/championships/${sweepstake.championshipId}/rounds/${value}`
      )
      .then((res) => {
        setRound(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLoading(true);
    axios
      .get(
        `/api/sweepstakes/championships/${sweepstake.championshipId}/rounds/${newValue}`
      )
      .then((res) => {
        setRound(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };

  return (
    <>
      <SweepstakesListHeader>
        <Link href="/projects/sweepstakes">
          <SweepstakesListTitle>{t('sweepstakes')}</SweepstakesListTitle>
        </Link>
      </SweepstakesListHeader>
      <SweepstakesTitle>
        <h1 style={{ margin: '0 0 0.5rem 0' }}>{sweepstake?.name}</h1>
        <h1 style={{ margin: '0 0.5rem 0 0.5rem' }}> - </h1>
        <h1 style={{ margin: '0 0 0.5rem 0' }}>
          {championship?.edicao_atual?.nome_popular}
        </h1>
      </SweepstakesTitle>
      <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable rounds"
        >
          {rounds.map((r) => {
            return (
              <Tab
                key={r.rodada}
                label={r.nome}
                value={r.rodada}
                disabled={r.status === 'encerrada'}
              />
            );
          })}
        </Tabs>
      </Box>
      <SweepstakesMatchesContainer>
        {round &&
          round.partidas.map((p) => {
            return (
              <SweepstakesMatchContainer key={p.partida_id}>
                <Image
                  src={p.time_mandante.escudo}
                  alt={p.time_mandante.nome_popular}
                  width={48}
                  height={48}
                />
                <span
                  style={{
                    justifySelf: 'start',
                    marginLeft: '0.75rem',
                    fontSize: '0.75rem',
                  }}
                >
                  {p.time_mandante.nome_popular}
                </span>
                <div>
                  <div style={{ color: 'gray' }}>{p.placar_mandante}</div>
                  <div>{p.placar_mandante}</div>
                </div>
                <span> x </span>
                <div>
                  <div style={{ color: 'gray' }}>{p.placar_mandante}</div>
                  <div>{p.placar_mandante}</div>
                </div>
                <span
                  style={{
                    justifySelf: 'end',
                    marginRight: '0.75rem',
                    fontSize: '0.75rem',
                  }}
                >
                  {p.time_visitante.nome_popular}
                </span>
                <Image
                  src={p.time_visitante.escudo}
                  alt={p.time_visitante.nome_popular}
                  width={48}
                  height={48}
                />
              </SweepstakesMatchContainer>
            );
          })}
      </SweepstakesMatchesContainer>
    </>
  );
}

export default SweepstakesDetail;
