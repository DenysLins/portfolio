import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/pages/projects/salary.module.scss";
import Salary from "@/components/Salary";
const ProjectSalary = () => {
  return (
    <div className={style.container}>
      <Salary />
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "salary",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default ProjectSalary;
