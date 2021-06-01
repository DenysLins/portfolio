import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import FireList from "../components/FireList";

import style from "../styles/Home.module.scss";

const Home = () => {
  const [started, setStarted] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: 1080,
    width: 1920,
  });
  const { t, i18n } = useTranslation('common');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {

    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className={style.container}>
      <span className={style.name}>{t("name")}</span>
      <span className={style.title}>{t("title")}</span>
      <div className={style.flags}>
        <img
          className={style.flag}
          src="img/brazil-flag-waving-xs.png"
          alt="brazil-flag"
          onClick={() => changeLanguage("pt")}
        />
        <img
          className={style.flag}
          src="img/united-states-of-america-flag-waving-xs.png"
          alt="united-states-of-america-flag"
          onClick={() => changeLanguage("en")}
        />
      </div>
      <FireList
        started={started}
        setStarted={setStarted}
        dimensions={dimensions}
      />
    </div>
  );
};


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    }
  }
}

export default Home;
