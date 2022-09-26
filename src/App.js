import React, { Fragment, Suspense, useState, useEffect, useContext } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Loading from './components/Loading';
import Login from './pages/Login';
import Otp from './pages/Otp';
import i18n from './i18n';
import { useTranslation } from "react-i18next";
import LocaleContext from './LocaleContext';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'react-bootstrap';



function App() {
  const [locale, setLocale] = useState(i18n.language);
  i18n.on('languageChanged', (lng) => setLocale(i18n.language));
  const { t } = useTranslation();

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        <Helmet htmlAttributes={{
          lang: locale,
          dir: locale === 'en' ? 'ltr' : 'rtl'
        }}>
          {locale === 'en' ? <link rel="stylesheet" href="~bootstrap/dist/css/bootstrap.css" /> :
            <link rel="stylesheet" href="~bootstrap/dist/css/bootstrap.rtl.css" />
          }
        </Helmet>

        <ThemeProvider dir={locale === 'en' ? 'ltr' : 'rtl'}>
          <Fragment>
            <Header />
            <div className='main_content d-flex align-items-center justify-content-center'>
              <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/otp' element={<Otp/>}/>
              </Routes>
            </div>
          </Fragment>
        </ThemeProvider>

      </Suspense>
    </LocaleContext.Provider>


  );
}

export default App;
