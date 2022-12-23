import Salary from "@/components/Salary";
import { styled } from "@mui/system";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SalaryContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
});

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
