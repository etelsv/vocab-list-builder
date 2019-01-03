const request = require("request");
const key =
  "dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad";
const word = "mann";

function translateWord(wordSought) {
  request(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      //console.log(body);
      var germanWord = body.def[0].text;
      var wordEndings = body.def[0].fl;
      var wordPlural = getPluralOnly(wordEndings);
      var wordGender = body.def[0].gen;
      var englishDefinition = body.def[0].tr[0].text;
      console.log("german word = " + germanWord);
      console.log("gender = " + wordGender);
      console.log("word endings = " + wordEndings);
      console.log("plural= " + wordPlural);
      console.log("definition = " + englishDefinition);
      console.log("");
    }
  );
}

function getPluralOnly(wordEndings) {
  var justPlural = wordEndings.split("; ");
  if (justPlural[1] == "=") {
    return "they are the same";
  } else {
    return justPlural[1];
  }
}

function wordsToTranslate(paragraph) {
  var paragraphArray = paragraph
    .split(" ")
    .join(",")
    .split(":")
    .join(".")
    .split(",");
  for (var i = 0; i < paragraphArray.length; i++) {
    console.log(paragraphArray[i]);
    translateWord(paragraphArray[i]);
    console.log(i);
  }
}

//translateWord("kalender");
wordsToTranslate(
  `Die Geschichte vom Lebkuchenmann Es war einmal eine kleine alte Frau und ein kleiner alter Mann`
);
