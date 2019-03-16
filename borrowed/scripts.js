//things do with displays
const app = document.getElementById('root');
const moreInfo = document.getElementById('moreInfo');
const inputArea = document.getElementById('inputArea');
const logo = document.createElement('img');
const container = document.createElement('div');
//const bottomText = document.createElement('div');

//things do with the API
const key =
  'dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad';

//variables that collect words
const allWords = [];
const troubledWords = [];
const vocabList = [];
let wordsSubmitted;

//actual program

//app.appendChild(bottomText);
//wordsSubmitted = document.getElementById('a').value;
//console.log(wordsSubmitted);
logo.src = 'logo.png';
container.setAttribute('class', 'container');
app.appendChild(logo);
app.appendChild(container);

document.getElementById('button').addEventListener('click', function() {
  wordsSubmitted = document.getElementById('a').value;
  //console.log(wordsSubmitted);
  arrangeWordsForTranslation(wordsSubmitted);
});

async function translateWord(wordSought) {
  fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
  )
    .then(response => response.json())
    .then(data => {
      try {
        var partOfSpeech = data.def[0].pos;
        runTranslationWork(data);
        //vocabList.push(wordResponse);
      } catch (err) {
        console.log(err);
        console.log('there is a problem with ' + wordSought);
        troubledWords.push(wordSought);
      }
      moreInfo.textContent = troubledWords.join(', ');
    });
}

async function displayThings(data) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const h1 = document.createElement('h1');
  h1.textContent = data.def[0].text;

  const h2 = document.createElement('h2');
  h2.textContent = data.def[0].tr[0].text;

  const p = document.createElement('p');
  // movie.description = movie.description.substring(0, 300);
  p.textContent = `${data.def[0].pos}`;

  container.appendChild(card);
  card.appendChild(h1);
  card.appendChild(h2);
  card.appendChild(p);

  // //console.log(troubledWords);

  ////console.log(data.def[0]);
  // Begin accessing JSON data here
}

function runTranslationWork(body) {
  ////console.log(body);
  //var fullResponse = body;
  // var partOfSpeech = body.def[0].pos;
  var wordResponse = body.def[0];
  //console.log(wordResponse);
  // allWords.push([fullResponse, partOfSpeech, wordResponse]);
  vocabList.push(wordResponse);
  displayThings(body);
}

async function arrangeWordsForTranslation(wordsToTranslate) {
  var wordsToTranslate2 = wordsToTranslate.replace(
    /[.,\/#!$%\^&\*;:{}=\-_`~()]\s/g,
    ' ',
  );
  console.log(wordsToTranslate2);
  //var lcwordsToTranslate = wordsToTranslate2.toLowerCase();
  var paragraphArray = wordsToTranslate2.split(/\s/);
  var wordsWithoutDups = Array.from(new Set(paragraphArray));
  //var choices = wordsWithoutDups.sort();
  await createVocabList(wordsWithoutDups);
}

async function createVocabList(paragraphArray) {
  for (var i = 0; i < paragraphArray.length; i++) {
    // //console.log(i);
    await translateWord(paragraphArray[i]);
    // //console.log(paragraphArray[i]);
  }
  // displayInterestingThings();
}
