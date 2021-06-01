import React from "react";
import { useTranslation } from 'next-i18next'

import style from "@/styles/Navigation.module.scss";


const Navigation = () => {
  const { t } = useTranslation('common');

  return (
    <div className={style.navigation}>
      <input type="checkbox" className={style.navigation__checkbox} id="navi-toggle" />
      <label htmlFor="navi-toggle" className={style.navigation__button}>
        <span className={style.navigation__icon}>&nbsp;</span>
      </label>
      <div className={style.navigation__background}>&nbsp;</div>
      <nav className={style.navigation__nav}>
        <ul className={style.navigation__list}>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>01</span>About Me</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>02</span>Work</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>03</span>Resume</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>04</span>Blog</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>05</span>Runnings</a></li>
          <li className={style.navigation__item}><a href="#" className={style.navigation__link}><span>06</span>Contact</a></li>

        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
