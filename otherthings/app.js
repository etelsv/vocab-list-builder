const request = new XMLHttpRequest();
const key =
  "dict.1.1.20190101T143458Z.9e934ebb5eb8f106.4c671e8c7f3a082535985d61affef702184348ad";

request.open('GET', `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`, true);
request.onload = function () {
function translateWord(wordSought) {
  return request(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=de-en&text=${wordSought}`,
    { json: true }
  ).then(body => {
    try {
      console.log(body);
    } catch (err) {
      console.error(error);
    }
  });
}

translatedWord(Mann);
