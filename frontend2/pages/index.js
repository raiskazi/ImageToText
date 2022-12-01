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

      <br>
      </br>
      <h2>
          Visit <u><a href="https://huggingface.co/spaces/stabilityai/stable-diffusion">Stable Diffusion</a></u> to create an AI-generated image
      </h2>

      <h4>
      Image captioning is a very sensitive process. 
      Please submit realistic images which are composed of 1 object with 1 background (: 
      Preferably .png, .jpg, .jpeg
      </h4>

      <h4>
        List of possible objects:
      </h4>


      <ul>
        <li>Man</li>
        <li>Woman</li>
        <li>Dog</li>
        <li>Cat</li>
      </ul> 

      <h4>
        List of possible backgrounds:
      </h4>

      <ol>
        <li>Park</li>
        <li>Beach</li>
        <li>Desert</li>
        <li>Lake</li>
      </ol> 

      


      <main className={styles.main}>
        <h1>
          Upload Your AI-Generated Image
        </h1>

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