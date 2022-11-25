import React from "react";
import render from 'react-dom';
import ReactDOM from 'react-dom'
import {useState} from "react"
// import { Button, ChakraProvider } from "@chakra-ui/react";

// import './index.css';
// // import Header from "./components/Header";
// import App from './App';

// function App() {
//   // return (
//   //   <ChakraProvider>
//   //     <Header />
//   //   </ChakraProvider>
//   // );

//   const [file, setFile] = useState();
//     function handleChange(e) {
//         console.log(e.target.files);
//         setFile(URL.createObjectURL(e.target.files[0]));
//     }
  
//     return (
//         <div className="App">
//             <ChakraProvider>
//               <Header />
//             </ChakraProvider>

//             <h2>--Upload your AI-Generated Image:</h2>
//             <input type="file" onChange={handleChange} />
//             <img src={file}/>
//             <Button> Submit</Button>
//         </div>
//     );
// }

// const rootElement = document.getElementById("root")
// render(<App />, rootElement)






const root = ReactDOM.createRoot(
  document.getElementById('root')
  );
  
  const app = (
    <React.StrictMode>
      <App />  
    </React.StrictMode>
  )
  
  root.render(app);




