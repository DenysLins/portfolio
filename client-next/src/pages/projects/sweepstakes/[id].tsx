import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import SweepstakesDetail from "@/components/Sweepstakes/Detail";
import dbConnect from "@/lib/mongodb";
import Sweepstake from "@/models/sweepstakes/Sweepstake";
import styles from "@/styles/components/sweepstakes.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import SweepstakesAdminNav from "../../../components/Sweepstakes/Nav/Admin";
import SweepstakesNav from "../../../components/Sweepstakes/Nav/index";

const SweepstakesContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100vw",
  padding: "5rem 1rem",
});

const SweepstakesDetailPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [sweepstake, setSweepstake] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/sweepstakes/${id}`)
      .then((res) => {
        setSweepstake(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  if (status === "loading" || loading) {
    return (
      <div className={styles.container}>
        <CircularProgress color="inherit" />
      </div>
    );
  } else {
    if (session) {
      if (session.user.userRole === "admin") {
        return (
          <SweepstakesContainer>
            <SweepstakesNav />
            <SweepstakesAdminNav />
            <SweepstakesDetail sweepstake={sweepstake} />
          </SweepstakesContainer>
        );
      }
      return (
        <SweepstakesContainer>
          <SweepstakesNav />
          <SweepstakesDetail sweepstake={sweepstake} />
        </SweepstakesContainer>
      );
    } else {
      router.push("/projects/sweepstakes/auth/login");
    }
  }
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "sweepstakes",
        "footer",
        "navigation",
      ])),
    },
  };
}

export async function getStaticPaths({ locales }) {
  await dbConnect();
  const sweepstakes = await Sweepstake.find({}).lean();
  const paths = sweepstakes
    .map((sweepstake) =>
      locales.map((locale) => ({
        params: { id: sweepstake._id.toString() },
        locale,
      }))
    )
    .flat();

  return { paths, fallback: false };
}

export default SweepstakesDetailPage;
