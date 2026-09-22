import React from 'react'

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
import ScrollProgress from "../components/Common/ScrollProgress";
import BackToTop from "../components/Common/BackToTop";

const Layout = () => {
  return (
    <>
        <ScrollProgress />
        <Header />
        <main>
            <Routers />
        </main>
        <Footer />
        <BackToTop />
    </>
  )
}

export default Layout