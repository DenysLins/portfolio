import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import styles from "@/styles/components/sweepstakes.module.scss";
import SweepstakesAdminNav from "../../../components/Sweepstakes/Nav/Admin";
import SweepstakesNav from "../../../components/Sweepstakes/Nav/index";

const SweepstakesContainerSession = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100vw",
  padding: "5rem 1rem",
});

const ProjectSweepstakesMain = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <div className={styles.container}>
        <CircularProgress color="inherit" />
      </div>
    );
  } else {
    if (session) {
      return (
        <SweepstakesContainerSession>
          <SweepstakesNav />
          <SweepstakesAdminNav />
        </SweepstakesContainerSession>
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

export default ProjectSweepstakesMain;
