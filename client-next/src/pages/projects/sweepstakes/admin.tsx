import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SweepstakesAdmin from "@/components/Sweepstakes/Admin";
import styles from "@/styles/components/sweepstakes.module.scss";

const ProjectSweepstakesAdmin = () => {
  return (
    <div className={styles.container}>
      <SweepstakesAdmin />
    </div>
  );
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

export default ProjectSweepstakesAdmin;
