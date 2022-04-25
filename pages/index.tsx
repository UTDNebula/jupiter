import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jupiter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bannerImage">
        <p
          style={{
            position: "relative",
            left: "30%",
            top: "25%",
            color: "white",
            fontSize: 110,
          }}
        >
          Jupiter
        </p>
        <p
          style={{
            position: "absolute",
            left: "30%",
            top: "55%",
            color: "white",
            fontSize: 25,
          }}
        >
          Get Connected on Campus. Here is a tagline. <br /> I'm not a designer
          nor a writer.
        </p>
      </div>

      <main className={styles.main}></main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
