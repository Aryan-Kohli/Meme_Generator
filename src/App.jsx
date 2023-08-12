import { useState } from "react";
import "./App.css";
import Header from "./header";

import Meme from "./Meme";
// import Footer from "./footer";
function App() {
  return (
    <>
      <div>
        <Header />
        <Meme />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
