import React from 'react'
import { AppProps } from 'next/app'
import 'antd/dist/antd.css';


import '../styles/_Index.scss';
import '../styles/_HeroSection.scss';
import '../styles/_EventSearch.scss';
import '../styles/_Events.scss';
import '../styles/_CardContainer.scss';
import '../styles/_LoginForm.scss';
import '../styles/_Input.scss';
import '../styles/_Button.scss';
import '../styles/_SignupForm.scss';
import '../styles/_DesktopSidebar.scss';
import '../styles/_DashboardNavbar.scss';
import '../styles/_DashboardView.scss';
import '../styles/_StatisticCard.scss';


function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default MyApp