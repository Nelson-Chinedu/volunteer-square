import React from 'react'
import { AppProps } from 'next/app'

import '../assets/styles/_Index.scss';
import '../assets/styles/_HeroSection.scss';
import '../assets/styles/_EventSearch.scss';
import '../assets/styles/_Events.scss';
import '../assets/styles/_CardContainer.scss';
import '../assets/styles/_LoginForm.scss';
import '../assets/styles/_Input.scss';
import '../assets/styles/_Button.scss';


function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default MyApp