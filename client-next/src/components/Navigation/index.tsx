import React from "react";
import { useTranslation } from 'next-i18next'

import style from "@/styles/Navigation.module.scss";


const Navigation = () => {
  const { t } = useTranslation('navigation');

  return (
    <div className={style.navigation}>
      <input type="checkbox" className={style.navigation__checkbox} id="navi-toggle" />
      <label htmlFor="navi-toggle" className={style.navigation__button}>
        <span className={style.navigation__icon}>&nbsp;</span>
      </label>
      <div className={style.navigation__background}>&nbsp;</div>
      <nav className={style.navigation__nav}>
        <ul className={style.navigation__list}>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>01</span>{t("1")}</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>02</span>{t("2")}</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>03</span>{t("3")}</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>04</span>{t("4")}</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>05</span>{t("5")}</a></li>

        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
