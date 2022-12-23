import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styled } from "@mui/system";

const SalaryContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
});
import Salary from "@/components/Salary";
const ProjectSalary = () => {
  return (
    <SalaryContainer>
      <Salary />
    </SalaryContainer>
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
