import React from 'react'
import { useTranslation } from 'react-i18next'

import './style.css'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <>
      <footer>
        <div className="footer">
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('react.1')}
            <img className="logo" src="img/react.svg" alt="react icon"></img>
            {t('react.2')}
          </a>
          <a
            href="https://app.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('netlify.1')}
            <img
              className="logo"
              src="img/netlify.png"
              alt="netlify icon"
            ></img>
            {t('netlify.2')}
          </a>
        </div>
      </footer>
    </>
  )
}

export default Footer
