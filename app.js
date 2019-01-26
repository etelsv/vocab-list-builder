// const request = require("request-promise");
// const key =
//   "dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad";
var troubledWords = [];
var vocabList = [];

// var inquirer = require("inquirer");

// function translateWord(wordSought) {
//   return request(
//     `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
//     { json: true }
//   )
//     .then(body => {
//       try {
//         runTranslationWork(body);
//         // vocabList.push(wordResponse);
//       } catch (err) {
//         return request(
//           `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-ru&text=${wordSought}`,
//           { json: true }
//         ).then(body => {
//           try {
//             runTranslationWork(body);
//           } catch (err) {
//             troubledWords.push(wordSought);
//           }
//         });
//       }
//     })
//     .catch(error => {
//       //console.error(error);
//     });
// }

// function runTranslationWork(body) {
//   var partOfSpeech = body.def[0].pos;
//   var wordResponse = body.def[0];
//   vocabList.push(wordResponse);
// }

// async function createVocabList(paragraphArray) {
//   for (var i = 0; i < paragraphArray.length; i++) {
//     await translateWord(paragraphArray[i]);
//   }
//   displayInterestingThings();
// }

async function arrangeWordsForTranslation(wordsToTranslate, troubledWords) {
  var wordsToTranslate2 = wordsToTranslate.replace(
    /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
    " "
  );
  var lcwordsToTranslate = wordsToTranslate2.toLowerCase();
  var paragraphArray = lcwordsToTranslate.split(" ");
  var wordsWithoutDups = Array.from(new Set(paragraphArray));
  var choices = wordsWithoutDups.sort();
  return choices;
  // var answers = await inquirer
  //   .prompt([
  //     {
  //       type: "checkbox",
  //       name: "name",
  //       message: "Select the words you want to look up!",
  //       paginated: true,
  //       choices: choices
  //     }
  //   ])
  //   .then(answers => {
  //     //console.log(JSON.stringify(answers, null, "  "));
  //     return answers;
  //   });
  // console.log("this came out of the function:" + answers.name);
  // createVocabList(answers.name);
}

// function displayInterestingThings() {
//   console.log(vocabList);
//   //var stringVocabList = JSON.stringify(vocabList);
//   console.log("trouble " + troubledWords);
//   //console.log("look" + stringVocabList);
// }

var wordsToTranslate = document.getElementById("wordsToLookUp").value;

document
  .getElementById("submitButton")
  .addEventListener("click", arrangeWordsForTranslations);

arrangeWordsForTranslation(wordsToTranslate, troubledWords);
