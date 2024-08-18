// Elementos del DOM
let translatefrom = document.querySelector("#translatefrom");
let translateto = document.querySelector("#translateto");
let inputtranslate = document.querySelector("#inputtranslate");
let outputtranslate = document.querySelector("#outputtranslate");

// Conseguir la lista de lenguajes desde el servidor
const GET_URL = 'https://text-translator2.p.rapidapi.com/getLanguages';
const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '22138b7ea3mshd2208464a15033bp13a397jsn70b8a79fe1cf',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  }
};

let source_language = "es";
let target_language = "";

fetch(GET_URL, OPTIONS)
  .then(res => res.json())
  .then(objeto => {
    let languages = objeto.data.languages;

    // Code para cargar selects
    languages.forEach(element => {
      let option = document.createElement("option");
      option.value = element.code;
      option.textContent = element.name;

      translatefrom.appendChild(option.cloneNode(true));
      translateto.appendChild(option);
    });

    translatefrom.addEventListener("change", () => {
      source_language = translatefrom.value;
    });

    translateto.addEventListener("change", () => {
      target_language = translateto.value;
    });
  })
  .catch(err => console.error(err));

// Recoger los datos para enviarlos al servidor
let translateButton = document.querySelector("#translate");

translateButton.addEventListener("click", () => {
  let texttotranslate = inputtranslate.value;

  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", source_language);
  encodedParams.append("target_language", target_language);
  encodedParams.append("text", texttotranslate);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '22138b7ea3mshd2208464a15033bp13a397jsn70b8a79fe1cf',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    body: encodedParams
  };

  fetch('https://text-translator2.p.rapidapi.com/translate', options)
    .then(response => response.json())
    .then(response => outputtranslate.value = response.data.translatedText)
    .catch(err => console.error(err));
});
