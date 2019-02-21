//things do with displays
const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = 'logo.png';
const container = document.createElement('div');

//things do with the API
const key =
  'dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad';

//variables that collect words
const allWords = [];
const troubledWords = [];
const vocabList = [];

async function translateWord(wordSought) {
  //for (var i = 0; i < paragraphArray.length; i++) {
  var request = new XMLHttpRequest();

  await request.open(
    'GET',
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
    true,
    console.log(
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
    ),
  );
  (request.onload = function() {
    var data = JSON.parse(this.response);
    //console.log(data);

    if (request.status >= 200 && request.status < 400) {
      //console.log('reached?');
      //console.log(data);

      runTranslationWork(data);
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }),
    request.send();
}
//}

async function displayThings(data) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const h1 = document.createElement('h1');
  h1.textContent = data.def[0].text;

  const p = document.createElement('p');
  // movie.description = movie.description.substring(0, 300);
  p.textContent = `${data.def[0].pos}` + ' ' + `${data.def[0].tr[0].text}...`;

  container.appendChild(card);
  card.appendChild(h1);
  card.appendChild(p);
  console.log('trouble ' + troubledWords);

  //console.log(data.def[0]);
  // Begin accessing JSON data here
}

function runTranslationWork(body) {
  //console.log(body);
  //var fullResponse = body;
  // var partOfSpeech = body.def[0].pos;
  // var wordResponse = body.def[0];
  // allWords.push([fullResponse, partOfSpeech, wordResponse]);
  //vocabList.push(wordResponse);
  displayThings(body);
}

async function arrangeWordsForTranslation(wordsToTranslate, troubledWords) {
  var wordsToTranslate2 = wordsToTranslate.replace(
    /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
    ' ',
  );
  console.log(wordsToTranslate2);
  var lcwordsToTranslate = wordsToTranslate2.toLowerCase();
  var paragraphArray = lcwordsToTranslate.split(' ');
  //why is it not eliminating duplicates?
  var wordsWithoutDups = Array.from(new Set(paragraphArray));
  var choices = wordsWithoutDups.sort();
  createVocabList(choices);
}

async function createVocabList(paragraphArray) {
  for (var i = 0; i < paragraphArray.length; i++) {
    console.log(i);
    await translateWord(paragraphArray[i]);
    console.log(paragraphArray[i]);
  }
  // displayInterestingThings();
}

//actual program
container.setAttribute('class', 'container');
app.appendChild(logo);
app.appendChild(container);

arrangeWordsForTranslation(
  `
  In den alten Zeiten, wo das Wünschen noch geholfen hat, lebte ein König, dessen Töchter waren alle schön; `,
  troubledWords,
);
////console.log(allWords);
