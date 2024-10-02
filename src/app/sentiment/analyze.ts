const analyzeSentiment =(newdocuments2)=> {
    return new Promise((resolve, reject) => {


        const document = newdocuments2.map(document => document.text.split("."));
        console.log(document);
        var Scores = [];

        document.forEach(sentencences => {
            //dla kazdego z dokumentow
            setPositive([]);
            setNegative([]);

            sentencences.forEach(sentence => {
                let parts = [sentence];
                contrastiveConjunctions.forEach(conjunction => {
                    if (sentence.includes(` ${conjunction} `)) {
                        parts = sentence.split(` ${conjunction} `);
                    }
                });
                // Now, 'parts' is an array of 1 or 2 sentences.
                // If the original sentence contained a contrastive conjunction, 'parts' contains two sentences: the part before the conjunction and the part after.
                // You can now analyze the sentiment of each part separately.
                parts.forEach((part, index) => {
                    // Analyze the sentiment of 'part'.
                    // If 'index' is 1, this is the second part of the sentence, so you might want to give it a higher weight.
                    let weight = index === 1 ? 2 : 1;

                    //dla kazdego zdania
                    console.log(part);
                    var tokens = part.split(" ");
                    //rozdzielenie na tokeny
                    console.log(tokens);
                    var tagger = posTagger();
                    var taggedTokens = tagger.tagSentence(part);
                    console.log(taggedTokens);
                    //tagowanie tokenow
                    var lemmas = taggedTokens.map(token => token.lemma ? token.lemma : token.normal);
                    console.log("lemmas: " + lemmas)
                    //lematyzacja tokenow

                    lemmas = lemmas.filter(lemma => !stopwords.includes(lemma));

                    var pos = 0;
                    var neg = 0;
                    //zmienne na ostateczny wynik zdania

                    var positive_array;
                    var negative_array;
                    //tablice wynikow z poszczegolnych slownikow

                    var lexicon_count = 0;
                    //zmienna pomocnicza ile słowników zawiera słowo

                    var negation = false;
                    var negation_index = null;

                    lemmas.forEach((lemma, index) => {
                        //dla kazdego lematu
                        positive_array = [];
                        negative_array = [];
                        lexicon_count = 0;
                        //zerowanie tablic i licznika

                        if ((lemma === "not" || lemma === "no" || lemma === "never" || lemma === "without") && !negation && lemmas[index + 1]) {
                            negation_index = index + 1;
                            console.log("############ negation: " + negation_index);
                        }

                        let modifier = 1;  // Default modifier is 1 (i.e., no change)
                        if (index > 0 && modifierWords.hasOwnProperty(lemmas[index - 1])) {
                            modifier = modifierWords[lemmas[index - 1]];
                        }

                        if (negation_index === index) {
                            negation = true;
                            console.log("negation: " + negation);
                        } else {
                            negation = false;
                        }

                        if (afinn165.hasOwnProperty(lemma)) {
                            var score = afinn165[lemma] * modifier;  // Apply the modifier
                            if (score > 0) {
                                lexicon_count += 1;
                                if (negation) {
                                    negative_array.push(score * -1);
                                    negative.push(lemma);
                                } else {
                                    positive_array.push(score);
                                    //jezeli znaleziono słowo to dadaj jego wynik do tablicy i zwieksz licznik
                                    positive.push(lemma);
                                }
                            } else if (score < 0) {
                                lexicon_count += 1;
                                if (negation) {
                                    positive_array.push(score * -1);
                                    positive.push(lemma);
                                } else {
                                    negative_array.push(score);
                                    negative.push(lemma);
                                    //jezeli znaleziono słowo to dadaj jego wynik do tablicy i zwieksz licznik
                                }
                            }
                            console.log("afinn165 score: " + score);
                        } else {
                            console.log("not in afinn165: " + lemma);
                        }

                        const vader = require('vader-sentiment');
                        if (vader.SentimentIntensityAnalyzer.polarity_scores(lemma).compound) {
                            const score = vader.SentimentIntensityAnalyzer.polarity_scores(lemma).compound * modifier;  // Apply the modifier
                            if (score > 0) {
                                lexicon_count += 1;
                                if (negation) {
                                    negative_array.push(score * -1);
                                    if (negative.find(element => element === lemma)) {
                                        console.log("negative already in array: " + lemma);
                                    } else {
                                        negative.push(lemma);
                                    }
                                    negation = false;
                                } else {
                                    positive_array.push(score);
                                    if (positive.find(element => element === lemma)) {
                                        console.log("positive already in array: " + lemma);
                                    } else {
                                        positive.push(lemma);
                                    }
                                }
                            } else if (score < 0) {
                                lexicon_count += 1;
                                if (negation) {
                                    positive_array.push(score * -1);
                                    if (positive.find(element => element === lemma)) {
                                        console.log("positive already in array: " + lemma);
                                    } else {
                                        positive.push(lemma);
                                    }
                                    negation = false;
                                } else {
                                    negative_array.push(score);
                                    if (negative.find(element => element === lemma)) {
                                        console.log("negative already in array: " + lemma);
                                    } else {
                                        negative.push(lemma);
                                    }
                                }
                            }
                            console.log("vader score: " + score);
                        } else {
                            console.log("not in vader: " + lemma);
                        }

                        console.log("\tlexicon_count: " + lexicon_count);
                        // console.log("positive_array: "+positive_array);
                        // console.log("negative_array: "+negative_array);

                        if (positive_array.length > 0) {//jezeli tablica wyników nie jest pusta należy zsumowac wyniki i podzielic przez ilosc słowników
                            var sum = positive_array.reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            pos += (sum / lexicon_count) * weight; //dodanie wyniku do ostatecznego wyniku
                        }
                        if (negative_array.length > 0) {
                            var sum = negative_array.reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            neg += (sum / lexicon_count) * weight;
                        }

                    });
                    //koniec petli dla kazdego lemmatu

                    console.log("positive: " + pos);
                    console.log("negative: " + neg);

                    console.log("positive_array: " + positive);
                    console.log("negative_array: " + negative);

                    Scores.push({pos: pos, neg: neg});
                    console.log("Scores: " + Scores);

                    console.log("\n\n---------------------------\n\n");

                    setResults2(prevResults => [...prevResults, {sentence: part, pos: pos, neg: neg}]);
                });

            });
            //koniec zdania
        });
        //koniec dokumentu
        //setGlobalScore({positive: positiveSum, negative: negativeSum});
        setScores(scores => [...scores, ...Scores]);

        resolve();
    });
}