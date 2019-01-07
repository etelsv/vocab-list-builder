const request = require("request");
const key =
  "dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad";
var troubledWords = [];
var vocabList = [];

class Word {
  constructor(
    germanWord,
    partOfSpeech,
    wordEndings,
    wordGender,
    englishDefinition
  ) {
    this.germanWord = germanWord;
    this.partOfSpeech = partOfSpeech;
    this.wordEndings = wordEndings;
    this.wordGender = wordGender;
  }
}

function translateWord(wordSought) {
  request(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      try {
        var germanWord = body.def[0].text;
        var partOfSpeech = body.def[0].pos;
        var wordEndings = body.def[0].fl;
        //var wordPlural = getPluralOnly(wordEndings);
        var wordGender = body.def[0].gen;
        var englishDefinition = body.def[0].tr[0].text;

        // console.log("german word = " + germanWord);
        // console.log("Part of Speech = " + partOfSpeech);
        // console.log("gender = " + wordGender);
        // console.log("word endings = " + wordEndings);
        // //console.log("plural= " + wordPlural);
        // console.log("definition = " + englishDefinition);
        // console.log("");
        var aword = new Word(
          germanWord,
          partOfSpeech,
          wordEndings,
          wordGender,
          englishDefinition
        );
        vocabList.push(aword);
      } catch (err) {
        troubledWords.push(wordSought);

        //return troubledWords;
      }
    }
  );
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

function createVocabList(paragraphArray) {
  for (var i = 0; i < paragraphArray.length; i++) {
    //console.log(paragraphArray[i]);
    translateWord(paragraphArray[i]);
    //console.log(i);
  }
}

function arrangeWordsForTranslation(wordsToTranslate) {
  var wordsToTranslate2 = wordsToTranslate.replace(
    /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
    " "
  );
  var lcwordsToTranslate = wordsToTranslate2.toLowerCase();
  var paragraphArray = lcwordsToTranslate.split(" ");
  var wordsWithoutDups = Array.from(new Set(paragraphArray));
  var sorted = wordsWithoutDups.sort();
  // console.log(sorted);
  createVocabList(sorted);
}

function displayInterestingThings() {
  console.log(troubledWords);
  console.log(vocabList);
}

Word.sort(function(a, b){
  var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
  if (nameA < nameB) //sort string ascending
      return -1 
  if (nameA > nameB)
      return 1
  return 0 //default return value (no sorting)

arrangeWordsForTranslation(
  `Die Tochter eines reichen Mannes wächst wohlbehütet auf. Als die Mutter stirbt, bittet sie auf dem Totenbett die Tochter, ein Bäumlein auf ihrem Grab zu pflanzen, an dem sie rütteln solle, wenn sie einen Wunsch habe, was die Tochter auch tut. Zwei Jahre nach dem Tod ihrer Mutter heiratet der Vater eine Witwe, die zwei Töchter mit ins Haus bringt.`
);
setTimeout(displayInterestingThings, 20000);

//good code relating to errors:

// console.log(``);
//         console.log(`There was an issue with ${wordSought}. Take a look:`);
//         console.log(
//           `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`
//         );
//         console.log(``);

// Als die Mutter stirbt, bittet sie auf dem Totenbett die Tochter, ein Bäumlein auf ihrem Grab zu pflanzen, an dem sie rütteln solle, wenn sie einen Wunsch habe, was die Tochter auch tut. Zwei Jahre nach dem Tod ihrer Mutter heiratet der Vater eine Witwe, die zwei Töchter mit ins Haus bringt.`
