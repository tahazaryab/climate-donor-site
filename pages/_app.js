import "../styles/globals.css";
import initAuth from "../utils/initAuth";
import Head from "next/head";

initAuth();

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Climate Donor</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
