//require('dotenv').config();

const button = document.getElementById("id-button");
const audioElement = document.getElementById("id-audio");

async function tellMe(joke) {
  await VoiceRSS.speech({
    key: "896d1d046cf14758a6a39d42f1acdb42",
    src: joke,
    hl: "en-us",
    v: "Puja",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

button.addEventListener("click", async () => {
  //console.log(process.env);
  button.disabled = true;
  const joke = await getJoke();
  if (joke.length > 0) {
    await tellMe(joke);
  }
});

audioElement.addEventListener("ended", () => {
  button.disabled = !button.disabled;
});

async function getJoke() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    return joke;
  } catch (error) {
    console.log(error);
  }
}
