import React from "react";
import html2canvas from "html2canvas";
export default function Meme() {
  const [meme, setmeme] = React.useState({
    topText: "",
    bottomText: "",
    textColorTop: "black",
    textColorBottom: "black",
    randomImage: "https://i.imgflip.com/26jxvz.jpg",
  });
  const [allmemes, setAllmemes] = React.useState([]);
  React.useEffect(() => {
    async function getMemes() {
      const jsonn = await fetch("https://api.imgflip.com/get_memes");
      const data = await jsonn.json();
      setAllmemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getnewimage() {
    const pos = Math.ceil(Math.random() * allmemes.length);
    const url = allmemes[pos].url;
    setmeme((x) => {
      return { ...x, randomImage: url };
    });
  }
  function updateText(event) {
    setmeme((x) => {
      return { ...x, [event.target.name]: event.target.value };
    });
  }
  function colorChange(event) {
    setmeme((x) => {
      return { ...x, [event.target.name]: event.target.value };
    });
  }
  function downloadImg() {
    const canvas = document.createElement("canvas");
    canvas.width = document.getElementById("pic").offsetWidth;
    canvas.height = document.getElementById("pic").offsetHeight;
    const context = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous"; // Allow cross-origin loading of the image
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Add top text to the canvas
      context.font = "900 40px Merriweather";
      context.textAlign = "center";
      const topText = meme.topText;
      // context.textShadow = "2px 2px 2px  rgb(241, 241, 241)";
      context.strokeStyle = "black"; // Set border color to black
      // context.lineWidth = 4; // Set border width
      context.strokeText(topText, canvas.width / 2, 40); // Draw the border
      context.fillStyle = meme.textColorTop;
      context.fillText(topText, canvas.width / 2, 40); // Draw the text

      context.font = "900  40px Merriweather";
      context.textAlign = "center";
      const bottomText = meme.bottomText;
      context.strokeStyle = "black";
      // context.lineWidth = 4; // Set border width
      context.strokeText(bottomText, canvas.width / 2, canvas.height - 20); // Draw the border
      context.fillStyle = meme.textColorBottom;
      context.fillText(bottomText, canvas.width / 2, canvas.height - 20); // Draw the text

      // Convert the canvas content to a data URL
      const dataUrl = canvas.toDataURL("image/jpeg");

      // Create a temporary anchor element and trigger the download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "meme.jpg";
      link.click();
    };

    img.src = meme.randomImage;
  }
  return (
    <>
      <div className="container mainMemeDiv">
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className="meme">
                <img src={meme.randomImage} className="memeimg" id="pic"></img>
                <h3 id="topText" style={{ color: meme.textColorTop }}>
                  {meme.topText}
                </h3>
                <h3 id="bottomText" style={{ color: meme.textColorBottom }}>
                  {meme.bottomText}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <form>
              <div className="row">
                <div className="col-md-5 offset-md-2  textdivs">
                  <h2>Top Text</h2>
                  <input
                    type="text"
                    placeholder="Top Text"
                    onChange={updateText}
                    name="topText"
                    className="textinp"
                  ></input>
                  <label htmlFor="textColorTop">CHANGE COLOR </label>
                  <input
                    type="color"
                    onChange={colorChange}
                    name="textColorTop"
                    value={meme.textColor}
                    className="colorchange"
                  ></input>
                </div>
                <div className="col-md-5  textdivs">
                  <h2>Bottom Text</h2>
                  <input
                    type="text"
                    placeholder="Bottom Text"
                    onChange={updateText}
                    name="bottomText"
                    className="textinp"
                  ></input>
                  <label htmlFor="textcolorBottom">CHANGE COLOR</label>
                  <input
                    type="color"
                    onChange={colorChange}
                    name="textColorBottom"
                    value={meme.textColor}
                    className="colorchange"
                  ></input>
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col-md-4 offset-md-2">
                <button type="button" className="btnn" onClick={downloadImg}>
                  Image download
                </button>
              </div>
              <div className="col mb-5">
                <button className="btnn" type="button" onClick={getnewimage}>
                  New Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
