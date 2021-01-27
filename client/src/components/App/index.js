import React, { useState, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import FireList from '../FireList'
import Footer from '../Footer'

import './style.css'

const MyApp = () => {
  const [started, setStarted] = useState(false)
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <span className="common name">{t('name')}</span>
      <span className="common title">{t('title')}</span>
      <div className="flags">
        <img
          className="flag"
          src="img/brazil-flag-waving-xs.png"
          alt="brazil-flag"
          onClick={() => changeLanguage('pt')}
        />
        <img
          className="flag"
          src="img/united-states-of-america-flag-waving-xs.png"
          alt="united-states-of-america-flag"
          onClick={() => changeLanguage('en')}
        />
      </div>
      <FireList started={started} setStarted={setStarted} />
      <Footer />
    </>
  )
}

const Loader = () => <div>Loading...</div>

export default function App () {
  return (
    <Suspense fallback={<Loader />}>
      <MyApp />
    </Suspense>
  )
}
