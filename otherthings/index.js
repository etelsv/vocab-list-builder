const request = require("request-promise");
const key =
  "dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad";
var troubledWords = [];
var vocabList = [];

var inquirer = require("inquirer");

class Word {
  constructor(germanWord, partOfSpeech, wordEndings, wordGender, definition) {
    this.germanWord = germanWord;
    this.partOfSpeech = partOfSpeech;
    this.wordEndings = wordEndings;
    this.wordGender = wordGender;
    this.definition = definition;
  }
}

function translateWord(wordSought) {
  return request(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
    { json: true }
  )
    .then(body => {
      try {
        var germanWord = body.def[0].text;
        var partOfSpeech = body.def[0].pos;
        var wordEndings = body.def[0].fl;
        //var wordPlural = getPluralOnly(wordEndings);
        var wordGender = body.def[0].gen;
        var definition = body.def[0].tr[0].text;

        var aword = new Word(
          germanWord,
          partOfSpeech,
          wordEndings,
          wordGender,
          definition
        );
        vocabList.push(aword);
      } catch (err) {
        return request(
          `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-ru&text=${wordSought}`,
          { json: true }
        ).then(body => {
          try {
            var germanWord = body.def[0].text;
            var partOfSpeech = body.def[0].pos;
            var wordEndings = body.def[0].fl;
            //var wordPlural = getPluralOnly(wordEndings);
            var wordGender = body.def[0].gen;
            var definition = body.def[0].tr[0].text;
            var aword = new Word(
              germanWord,
              partOfSpeech,
              wordEndings,
              wordGender,
              definition
            );
            vocabList.push(aword);
          } catch (err) {
            troubledWords.push(wordSought);
          }
        });

        //return troubledWords;
      }
    })
    .catch(error => {
      //console.error(error);
    });
}

function getPluralOnly(wordEndings) {
  if (wordEndings.includes(";")) {
    var justPlural = wordEndings.split("; ");
    if (justPlural[1] == "=") {
      return "they are the same";
    } else {
      return justPlural[1];
    }
  } else {
    return "there was an issue getting the plural";
  }
}

async function createVocabList(paragraphArray) {
  for (var i = 0; i < paragraphArray.length; i++) {
    //console.log(paragraphArray[i]);
    await translateWord(paragraphArray[i]);
    //console.log(i);
  }

  // await Promise.all(paragraphArray.map(a => translateWord(a)))
  displayInterestingThings();
}

async function arrangeWordsForTranslation(wordsToTranslate, troubledWords) {
  var wordsToTranslate2 = wordsToTranslate.replace(
    /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
    " "
  );
  var lcwordsToTranslate = wordsToTranslate2.toLowerCase();
  var paragraphArray = lcwordsToTranslate.split(" ");
  var wordsWithoutDups = Array.from(new Set(paragraphArray));
  var choices = wordsWithoutDups.sort();
  var answers = await inquirer
    .prompt([
      {
        type: "checkbox",
        name: "name",
        message: "Select the words you want to look up!",
        paginated: true,
        choices: choices
      }
    ])
    .then(answers => {
      //console.log(JSON.stringify(answers, null, "  "));
      return answers;
    });
  console.log("this came out of the function:" + answers.name);
  createVocabList(answers.name);
}

function displayInterestingThings() {
  var stringVocabList = JSON.stringify(vocabList);
  console.log("trouble " + troubledWords);
  console.log("look" + stringVocabList);
}

arrangeWordsForTranslation(
  `Bald darauf kam der Winter und der Schnee deckte ein weißes Tüchlein über das Grab der Mutter. Als die Sonne es wieder weggezogen hatte und das kleine Bäumchen schon zum zweitenmal grün geworden war, nahm sich der Vater eine andere Frau. Die Stiefmutter aber hatte schon zwei Töchter. Diese waren von schöner Gestalt, aber in ihrem Herzen stolz und bösartig.`,
  troubledWords
);
