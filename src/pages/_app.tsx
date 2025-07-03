import "@/styles/globals.css";
import "@/styles/main.scss";
import type { AppProps } from "next/app";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: 64 }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
