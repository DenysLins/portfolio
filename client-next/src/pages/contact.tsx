import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { styled } from "@mui/system";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ContactContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  "& > div": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > a": {
      margin: "1rem 1rem",
      fontSize: "1.5rem",
    },
  },
});

const Contact = () => {
  const { t } = useTranslation("contact");

  return (
    <ContactContainer>
      <div>
        <EmailIcon />
        <a
          target="_blank"
          href={`mailto:denyslins@gmail.com?subject=${t("subject")}`}
          rel="noopener noreferrer"
        >
          {t("email")}
        </a>
      </div>
      <div>
        <TwitterIcon />
        <a
          target="_blank"
          href="https://twitter.com/Denys_Lins"
          rel="noopener noreferrer"
        >
          {t("twitter")}
        </a>
      </div>
      <div>
        <LinkedInIcon />
        <a
          target="_blank"
          href="https://www.linkedin.com/in/denyslins"
          rel="noopener noreferrer"
        >
          {t("linkedin")}
        </a>
      </div>
    </ContactContainer>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "contact",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Contact;
