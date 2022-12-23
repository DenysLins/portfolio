import ConstructionIcon from "@mui/icons-material/Construction";
import { styled } from "@mui/system";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const BlogContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  "& > h2": {
    marginLeft: "1.5rem",
    fontWeight: "normal",
  },
});

const Blogs = () => {
  const { t } = useTranslation("blog");

  return (
    <BlogContainer>
      <ConstructionIcon />
      <h2>{t("title")}</h2>
    </BlogContainer>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "blog",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Blogs;
