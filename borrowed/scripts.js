const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

const key =
  'dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad';

app.appendChild(logo);
app.appendChild(container);

const allWords = [];

function translateWord(paragraphArray) {
  for (var i = 0; i < paragraphArray.length; i++) {
    var request = new XMLHttpRequest();

    request.open(
      'GET',
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${
        paragraphArray[i]
      }`,
      true,
      console.log(
        `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${
          paragraphArray[i]
        }`,
      ),
    );
    (request.onload = function() {
      var data = JSON.parse(this.response);
      //console.log(data);
      runTranslationWork(data);
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = data.def[0].pos;

      const p = document.createElement('p');
      // movie.description = movie.description.substring(0, 300);
      p.textContent = `${data.def[0].text}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);

      //console.log(data.def[0]);
      // Begin accessing JSON data here

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
}

function displayThings(data) {}

function runTranslationWork(body) {
  //console.log(body);
  var fullResponse = body;
  var partOfSpeech = body.def[0].pos;
  var wordResponse = body.def[0];
  allWords.push([fullResponse, partOfSpeech, wordResponse]);
}

// async function createVocabList(paragraphArray) {
//   for (var i = 0; i < paragraphArray.length; i++) {
//     //console.log(i);
//     await translateWord(paragraphArray[i]);
//     //console.log(paragraphArray[i]);
//   }
//   // displayInterestingThings();
// }

paragraphArray = ['frau', 'onkel', 'tisch', 'bett'];

translateWord(paragraphArray);
////console.log(allWords);
