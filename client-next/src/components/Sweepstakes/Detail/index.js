import {
  mockCampeonato,
  mockRodada1,
  mockRodada2,
  mockRodadas,
} from '@/pages/api/sweepstakes/temp';
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
  const [value, setValue] = useState(1);
  const [rounds, setRounds] = useState([]);
  const [round, setRound] = useState(null);
  const [championship, setChampionship] = useState(null);
  const [loading, setLoading] = useState(false);

  const useMock = false;

  console.log(sweepstake);

  useEffect(() => {
    setLoading(true);
    //TODO remove comment
    if (!useMock) {
      axios
        .get(`/api/sweepstakes/championships/${sweepstake.championshipId}`)
        .then((res) => {
          setChampionship(res.data);
          setValue(res.data.rodada_atual ? res.data.rodada_atual.rodada : 1);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setChampionship(mockCampeonato);
      setValue(
        mockCampeonato.rodada_atual ? mockCampeonato.rodada_atual.rodada : 1
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    //TODO remove comment
    if (!useMock) {
      axios
        .get(
          `/api/sweepstakes/championships/${sweepstake.championshipId}/rounds`
        )
        .then((res) => {
          setRounds(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setRounds(mockRodadas);
      //setRound(mockRodada1);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    //TODO remove comment
    if (!useMock) {
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
    } else {
      value % 2 == 0 ? setRound(mockRodada1) : setRound(mockRodada2);
    }
    setLoading(false);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLoading(true);
    //TODO remove comment
    if (!useMock) {
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
    } else {
      newValue % 2 == 0 ? setRound(mockRodada1) : setRound(mockRodada2);
    }
    setLoading(false);
  };

  return (
    <>
      <SweepstakesListHeader>
        <Link href="/projects/sweepstakes">
          <SweepstakesListTitle>{t('sweepstakes')}</SweepstakesListTitle>
        </Link>
      </SweepstakesListHeader>
      <h1 style={{ margin: '0 0 0.5rem 0' }}>{sweepstake?.name}</h1>
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
                // TODO remove comment
                // disabled={r.status === 'encerrada'}
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
