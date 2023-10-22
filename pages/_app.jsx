import Header from "../components/Header";

export default function MyApp({ Component, pageProps }) {
  return <>
    <Header/>
    <main><Component {...pageProps} /></main>
  </>
}