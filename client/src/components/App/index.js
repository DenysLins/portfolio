import React, { useState, useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import FireList from '../FireList'
import Footer from '../Footer'

import './style.css'

const MyApp = () => {
  const [started, setStarted] = useState(false)
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    function handleResize () {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize)

    return (_) => {
      window.removeEventListener('resize', handleResize)
    }
  })

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
      <FireList
        started={started}
        setStarted={setStarted}
        dimensions={dimensions}
      />
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
