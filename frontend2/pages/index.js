import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  // post request
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body
    });
  };

  return (
    // make a simple ui that lets you upload image and submit it as a form to backend
    <div>
      <Head>
        <title>Text to Image</title>
        <meta name="description" content="Upload Image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h4 className={styles.title}>
          Upload Your AI-Generated Image
        </h4>

        <input type="file" name="myImage" onChange={uploadToClient} />
        <br>



        </br>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Submit Image
        </button>
      </main>
    </div>
  )
}