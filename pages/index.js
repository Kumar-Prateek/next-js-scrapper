import styles from "@/styles/Home.module.css";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const urlData = [
  {label: "MoneyControl", value: "https://www.moneycontrol.com/news/business/stocks/"},
  {label: "IndianExpress", value: "https://indianexpress.com/"}
]

const identifierData = [
  {type: "MoneyControl", value: "#cagetory a"},
  {type: "IndianExpress", value: "#body-section a"},

]

export default function Home() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = () => {
    axios.get("api/hello").then((resp) => {
      setData(resp.data?.data);
    });
  };

  const handlePostData = () => {
    if (url && identifier) {
      axios.post("api/hello").then((resp) => {
        setData(resp.data?.data);
      });
    } else {
      alert("Pease provide both url and identifier");
    }
  };

  return (
    <>
      <Head>
        <title>Cheerio Scraping Demo</title>
        <meta name="description" content="Web scraping example with Next js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <select >
          {urlData?.map((item)=> (
            <option value={item.value} key={item.label}>{item.label}</option>
          ))}
          </select>
        <input
          className={styles.p5}
          placeholder="Enter url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
        className={styles.p5}
          placeholder="Enter indetifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <button type="button" onClick={() => handlePostData()} 
                className={styles.p5}
        >
          Fetch
        </button>
        </div>
        <div className={styles.grid}>
          {data?.map((item, idx) => (
            <a className={styles.card} href={item.link} key={idx}>
              <h4 className={inter.className}>{item.title}</h4>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
