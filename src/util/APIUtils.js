import axios from "axios";
const dic = {
    nouns: {
        medium: ["cutlet", "ukelele", "customer", "insurgent", "libertarian"],
        difficult: [
            "camaraderie",
            "circumlocution",
            "preponderance",
            "pejorative",
            "presage",
        ],
    },
    verbs: {
        medium: ["instigate", "gazes", "offend", "sail", "bolt"],
        difficult: [
            "expurgate",
            "obfuscate",
            "reprobate",
            "vituperate",
            "relegate",
        ],
    },
    adverbs: {
        medium: [
            "extravagantly",
            "abruptly",
            "cheerfully",
            "excitedly",
            "heartily",
        ],
        difficult: [
            "diligently",
            "clumsily",
            "expectantly",
            "briskly",
            "mildly",
        ],
    },
    adjectives: {
        medium: ["adventurous", "aggressive", "arrogant", "brainy", "cautious"],
        difficult: [
            "extraneous",
            "multifarious",
            "munificent",
            "penurious",
            "sanctimonious",
        ],
    },
};

export function FetchWords(types, difficulty) {
    const num = Math.floor(Math.random() * (5 - 0) + 0);
    /*let minCorpusCount = 500;
  let maxCorpusCount = -1;
  let minLength = 5;
  let limit = 5;

  let typesParam = "";
  types.map((type) => {
    typesParam = typesParam ? typesParam + "%2C" + type : typesParam + type;
  });

  if (difficulty === "difficult") {
    minCorpusCount = 0;
    maxCorpusCount = 25;
  }

  const requestURL =
    "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=" +
    typesParam +
    "&minCorpusCount=" +
    minCorpusCount +
    "&maxCorpusCount=" +
    maxCorpusCount +
    "&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=5&api_key=egwb1crrc0gyj5n5isscectqjs2bqp8wb0vujim9v8k2vqobv";
*/
    //const randWords = axios.get(requestURL);

    let wordsTypes = types;
    let wordsNeeded = 5 - types.length;
    if (wordsNeeded > 0) {
        for (let i = 0; i < wordsNeeded; i++) {
            wordsTypes.push(
                types[Math.floor(Math.random() * (types.length - 1 - 0) + 0)]
            );
        }
    }
    const urls = wordsTypes.map((type) => {
        let num = Math.floor(Math.random() * (5 - 0) + 0);
        return (
            "https://api.dictionaryapi.dev/api/v2/entries/en/" +
            dic[type][difficulty][num]
        );
    });
    //console.log(wordsTypes);
    //console.log(urls);
    const reqOne = axios.get(urls[0]);
    const reqTwo = axios.get(urls[1]);
    const reqThree = axios.get(urls[2]);
    const reqFour = axios.get(urls[3]);
    const reqFive = axios.get(urls[4]);

    return Promise.all([reqOne, reqTwo, reqThree, reqFour, reqFive]).then(
        function (values) {
            const wordData = values.map((val) => {
                return val.data;
            });
            //console.log(wordData);

            const finalWords = wordData.map((w) => {
                return {
                    word: w[0].word,
                    pos: w[0].meanings[0].partOfSpeech,
                    phonetic: w[0].phonetic ? w[0].phonetic : "",
                    definition: w[0].meanings[0].definitions[0].definition,
                    audio: w[0].phonetics[0] ? w[0].phonetics[0].audio : "",
                };
            });
            //console.log(finalWords);
            return finalWords;
        }
    );
}

/*export function FetchWordss(types) { 
  let words = ["a", "b", "c", "d", "e"];

  const wordsUrls = words.map((word, index) => {
    let i = index;
    if (i > types.length - 1) {
      i = 0;
    }
    return "https://api.api-ninjas.com/v1/randomword?type=" + types[i];
  });

  const reqOne = axios.get(wordsUrls[0]);
  const reqTwo = axios.get(wordsUrls[1]);
  const reqThree = axios.get(wordsUrls[2]);
  const reqFour = axios.get(wordsUrls[3]);
  const reqFive = axios.get(wordsUrls[4]);

  Promise.all([reqOne, reqTwo, reqThree, reqFour, reqFive]).then(function (
    values
  ) {
    //values[0].data.word
    const wordsDic = values.map((value) => {
      return (
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + value.data.word
      );
    });

    const pOne = axios.get(wordsDic[0]);
    const pTwo = axios.get(wordsDic[1]);
    const pThree = axios.get(wordsDic[2]);
    const pFour = axios.get(wordsDic[3]);
    const pFive = axios.get(wordsDic[4]);


    Promise.all([pOne, pTwo, pThree, pFour, pFive])
      .then(function (pvalues) {
        //console.log(pvalues);
        const pri = wordsUrls.map((wurl, index) => {
          return pvalues[index].meanings.filter(
            (v) => v.partOfSpeech === wurl.split("=")[1]
          );
        });

        console.log(pri);
      })
      .catch(function (err) {
        console.log(err);
      });

    //console.log(wordsDic);
  });
}

*/
