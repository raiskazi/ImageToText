import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function App() {
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
      <head>
        <title>Upload Image</title>
        <meta name="description" content="Upload Image" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main>
        <h1>
          Upload Image
        </h1>

        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </main>
    </div>
  )
}