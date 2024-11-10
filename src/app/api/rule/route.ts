/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { afinn165 } from 'afinn-165'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const posTagger = require('wink-pos-tagger');



const stopwords = ['a', 'an', 'the', 'in', 'is', 'are', /*...other stopwords...*/];
const contrastiveConjunctions = ['but', 'however', 'although', 'nevertheless', 'yet', 'except', 'though'];

const modifierWords: { [key in 'less' | 'more' | 'most' | 'least' | 'very' | 'slightly' | 'somewhat' | 'quite' | 'extremely' | 'barely' | 'hardly' | 'just']: number } = {
    'less': 0.5,
    'more': 1.5,
    'most': 2,
    'least': 0.25,
    'very': 2,
    'slightly': 0.75,
    'somewhat': 0.75,
    'quite': 1.25,
    'extremely': 2.5,
    'barely': 0.5,
    'hardly': 0.5,
    'just': 0.75
};

let positive: string[] = [];
let negative: string[] = [];



const analyzeSentiment = (newdocuments2: { text: string }[]): Promise<{ scores: any[], results: any[] }> => {

    let Results: any = [];
    let scores: any = [];

    return new Promise((resolve, reject) => {
        try {
            //console.log(newdocuments2);

            const document = newdocuments2.map(document => document.text.split("."));
            //console.log(document);
            const Scores: string | { pos: number; neg: number; }[] = [];

            document.forEach(sentencences => {
                //dla kazdego z dokumentow
                positive = [];
                negative = [];

                

                sentencences.forEach(sentence => {
                    if(sentence.trim() == "") return;

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
                        const weight = index === 1 ? 2 : 1;

                        //dla kazdego zdania
                        //console.log(part);
                        const tokens = part.split(" ");
                        //rozdzielenie na tokeny
                        //console.log(tokens);
                        const tagger = posTagger();
                        const taggedTokens = tagger.tagSentence(part);
                        //console.log(taggedTokens);
                        //tagowanie tokenow
                        let lemmas: string[] = taggedTokens.map((token: { lemma: string; normal: string; }) => token.lemma ? token.lemma : token.normal);
                        //console.log("lemmas: " + lemmas)
                        //lematyzacja tokenow

                        lemmas = lemmas.filter((lemma: string) => !stopwords.includes(lemma));

                        let pos = 0;
                        let neg = 0;
                        //zmienne na ostateczny wynik zdania

                        let positive_array;
                        let negative_array;
                        //tablice wynikow z poszczegolnych slownikow

                        let lexicon_count = 0;
                        //zmienna pomocnicza ile słowników zawiera słowo

                        let negation = false;
                        let negation_index: number | null = null;

                        lemmas.forEach((lemma: string, index: number) => {
                            //dla kazdego lematu
                            positive_array = [];
                            negative_array = [];
                            lexicon_count = 0;
                            //zerowanie tablic i licznika

                            if ((lemma === "not" || lemma === "no" || lemma === "never" || lemma === "without") && !negation && lemmas[index + 1]) {
                                negation_index = index + 1;
                                //console.log("############ negation: " + negation_index);
                            }

                            let modifier = 1;  // Default modifier is 1 (i.e., no change)
                            if (index > 0 && modifierWords.hasOwnProperty(lemmas[index - 1])) {
                                modifier = modifierWords[lemmas[index - 1] as keyof typeof modifierWords];
                            }

                            if (negation_index === index) {
                                negation = true;
                                //console.log("negation: " + negation);
                            } else {
                                negation = false;
                            }

                            if (afinn165.hasOwnProperty(lemma)) {
                                const score = afinn165[lemma] * modifier;  // Apply the modifier
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
                                //console.log("afinn165 score: " + score);
                            } else {
                                //console.log("not in afinn165: " + lemma);
                            }

                            const vader = require('vader-sentiment');
                            if (vader.SentimentIntensityAnalyzer.polarity_scores(lemma).compound) {
                                const score = vader.SentimentIntensityAnalyzer.polarity_scores(lemma).compound * modifier;  // Apply the modifier
                                if (score > 0) {
                                    lexicon_count += 1;
                                    if (negation) {
                                        negative_array.push(score * -1);
                                        if (negative.find((element: any) => element === lemma)) {
                                            //console.log("negative already in array: " + lemma);
                                        } else {
                                            negative.push(lemma);
                                        }
                                        negation = false;
                                    } else {
                                        positive_array.push(score);
                                        if (positive.find((element: any) => element === lemma)) {
                                            //console.log("positive already in array: " + lemma);
                                        } else {
                                            positive.push(lemma);
                                        }
                                    }
                                } else if (score < 0) {
                                    lexicon_count += 1;
                                    if (negation) {
                                        positive_array.push(score * -1);
                                        if (positive.find((element: any) => element === lemma)) {
                                            //console.log("positive already in array: " + lemma);
                                        } else {
                                            positive.push(lemma);
                                        }
                                        negation = false;
                                    } else {
                                        negative_array.push(score);
                                        if (negative.find((element: any) => element === lemma)) {
                                            //console.log("negative already in array: " + lemma);
                                        } else {
                                            negative.push(lemma);
                                        }
                                    }
                                }
                                //console.log("vader score: " + score);
                            } else {
                                //console.log("not in vader: " + lemma);
                            }

                            //console.log("\tlexicon_count: " + lexicon_count);
                            // console.log("positive_array: "+positive_array);
                            // console.log("negative_array: "+negative_array);

                            if (positive_array.length > 0) {//jezeli tablica wyników nie jest pusta należy zsumowac wyniki i podzielic przez ilosc słowników
                                const sum = positive_array.reduce(function (a, b) {
                                    return a + b;
                                }, 0);
                                pos += (sum / lexicon_count) * weight; //dodanie wyniku do ostatecznego wyniku
                            }
                            if (negative_array.length > 0) {
                                const sum = negative_array.reduce(function (a, b) {
                                    return a + b;
                                }, 0);
                                neg += (sum / lexicon_count) * weight;
                            }

                        });
                        //koniec petli dla kazdego lemmatu

                        // console.log("positive: " + pos);
                        // console.log("negative: " + neg);

                        // console.log("positive_array: " + positive);
                        // console.log("negative_array: " + negative);

                        Scores.push({ pos: pos, neg: neg });
                        //console.log("Scores: " + Scores);

                        //console.log("\n\n---------------------------\n\n");

                        if (pos > neg * -1) {
                            Results = [...Results, { sentence: part, pos: pos, neg: neg, sentiment: "positive" }];
                        } else if (pos < neg * -1) {
                            Results = [...Results, { sentence: part, pos: pos, neg: neg, sentiment: "negative" }];
                        } else {
                            Results = [...Results, { sentence: part, pos: pos, neg: neg, sentiment: "neutral" }];
                        }

                    });

                });
                //koniec zdania
            });
            //koniec dokumentu
            //setGlobalScore({positive: positiveSum, negative: negativeSum});
            scores = [...scores, ...Scores];

            const Resolve = { scores: scores, results: Results };

            resolve(Resolve);
        } catch (error) {
            reject(error);
        }
    });
};


// const fetchSentimentData = async (company: string) => {
//     const response = await fetch(`http://localhost:5000/sentiment/${company}`);
//     const data = await response.json();

//     let pos_score = 0;
//     let neg_score = 0;
//     let results = data['result'];

//     results.forEach(review => {
//       for (let key in review) {
//         if (review.hasOwnProperty(key)) {
//           review[key].forEach(scores => {
//             scores.forEach(score => {
//               if (score > 0) {
//                 console.log(score);
//                 pos_score += score;
//               } else {
//                 console.log(score);
//                 neg_score += score;
//               }
//             });
//           });
//         }
//       }
//     });

//     return {
//       positive: pos_score / results.length,
//       negative: neg_score / results.length,
//       results: data
//     };
//   };

const fetchReviews = async (company: string, limit:string|null) => {
    const response = await fetch(`http://192.168.0.140:5000/reviews/${company}?limit=${limit}`);
    const data = await response.json();
    return data;
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { scores, results } = await analyzeSentiment(body.documents);
        return NextResponse.json({ scores, results });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get('company');

    const limit = searchParams.get('limit');

    if (!company) {
        return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }

    try {
        const reviews = await fetchReviews(company, limit);
        const sentimentData = await analyzeSentiment(reviews[company]?.map((review: { text: any; }) => ({ text: review.text })));
        return NextResponse.json(sentimentData);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}