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
      //console.log("word endings = " + wordEndings);
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
  var paragraphArray = paragraph.split(" ");
  for (var i = 0; i < paragraphArray.length; i++) {
    console.log(paragraphArray[i]);
    translateWord(paragraphArray[i]);
    console.log(i);
  }
}

//translateWord("kalender");
wordsToTranslate(`Die Geschichte vom Lebkuchenmann Es war einmal eine kleine alte Frau und ein kleiner alter Mann, die in einem kleinen alten Haus lebten. Eines Tages entschied sich die kleine alte Frau einen Lebkuchenmann zu backen. Sie bereitete einen Teig vor und gab Eier, Mehl, Zucker und Honig in eine Schüssel. Dann kamen noch die wohl duftenden Gewürze hinzu: Anis, Ingwer, Kardamon, Koriander, Muskatblüten, Nelken, Piment und Zimt.    
Das alles verrührte sie zu einem Teig, ließ ihn ein wenig rasten und dann rollte sie den Teig aus und schnitt einen Lebkuchenmann daraus. Sie schob ihn in den Ofen und wartete eine Weile. Plötzlich rumpelte und pumpelte es in dem Ofen und sie öffnete die Ofentür. Da sprang der Lebkuchenmann heraus und lief durch die Vordertür hinaus in den Garten. `);
