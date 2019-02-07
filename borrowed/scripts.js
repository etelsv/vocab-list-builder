const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

const key =
  'dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad';

app.appendChild(logo);
app.appendChild(container);
var request = new XMLHttpRequest();

const allWords = [];

function translateWord(wordSought) {
  request.open(
    'GET',
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
    true,
    console.log(
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
    ),
  );
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      console.log(data);
      runTranslationWork(data);
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
    request.send();
  };
}

// function displayThings() {
//   const card = document.createElement('div');
//   card.setAttribute('class', 'card');

//   const h1 = document.createElement('h1');
//   h1.textContent = data.def[0].pos;

//   const p = document.createElement('p');
//   // movie.description = movie.description.substring(0, 300);
//   p.textContent = `${data.def[0].text}...`;

//   container.appendChild(card);
//   card.appendChild(h1);
//   card.appendChild(p);

//   console.log(data.def[0]);
// }

function runTranslationWork(body) {
  var partOfSpeech = body.def[0].pos;
  var wordResponse = body.def[0];
  allWords.push([partOfSpeech, wordResponse]);
  //vocabList.push(wordResponse);
}

async function createVocabList(paragraphArray) {
  for (var i = 0; i < paragraphArray.length; i++) {
    console.log(i);
    translateWord(paragraphArray[i]);
    console.log(paragraphArray[i]);
  }
  // displayInterestingThings();
}

paragraphArray = ['frau', 'onkel', 'tisch', 'bett'];

createVocabList(paragraphArray);
console.log(allWords);
