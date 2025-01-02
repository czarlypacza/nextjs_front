/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { removeStopwords, eng } from 'stopword';
import { afinn165 } from 'afinn-165'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const posTagger = require('wink-pos-tagger');



const stopwords = ['a', 'an', 'the', 'in', 'is', 'are', /*...other stopwords...*/];
const contrastiveConjunctions = ['but', 'however', 'although', 'nevertheless', 'yet', 'except', 'though'];

const modifierWords: { [key in 'less' | 'more' | 'most' | 'least' | 'very' | 'slightly' | 'somewhat' | 'quite' | 'extremely' | 'barely' | 'hardly' | 'just'|'really']: number } = {
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
    'just': 0.75,
    'really': 2
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
                        // console.log(tokens);
                        const tagger = posTagger();
                        const taggedTokens = tagger.tagSentence(part);
                        // console.log(taggedTokens);
                        //tagowanie tokenow
                        let lemmas: string[] = taggedTokens.map((token: { lemma: string; normal: string; }) => token.lemma ? token.lemma : token.normal);
                        // console.log("lemmas: " + lemmas)
                        //lematyzacja tokenow

                        lemmas = removeStopwords(lemmas, eng);

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
                                // console.log("############ negation: " + negation_index);
                            }

                            let modifier = 1;  // Default modifier is 1 (i.e., no change)
                            if (index > 0 && modifierWords.hasOwnProperty(lemmas[index - 1])) {
                                modifier = modifierWords[lemmas[index - 1] as keyof typeof modifierWords];
                            }

                            if (negation_index === index) {
                                negation = true;
                                // console.log("negation: " + negation);
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
                                        if (negative.find((element: any) => element === lemma)) {
                                            // console.log("negative already in array: " + lemma);
                                        } else {
                                            negative.push(lemma);
                                        }
                                        negation = false;
                                    } else {
                                        positive_array.push(score);
                                        if (positive.find((element: any) => element === lemma)) {
                                            // console.log("positive already in array: " + lemma);
                                        } else {
                                            positive.push(lemma);
                                        }
                                    }
                                } else if (score < 0) {
                                    lexicon_count += 1;
                                    if (negation) {
                                        positive_array.push(score * -1);
                                        if (positive.find((element: any) => element === lemma)) {
                                            // console.log("positive already in array: " + lemma);
                                        } else {
                                            positive.push(lemma);
                                        }
                                        negation = false;
                                    } else {
                                        negative_array.push(score);
                                        if (negative.find((element: any) => element === lemma)) {
                                            // console.log("negative already in array: " + lemma);
                                        } else {
                                            negative.push(lemma);
                                        }
                                    }
                                }
                                console.log("vader score: " + score);
                            } else {
                                console.log("not in vader: " + lemma);
                            }

                            // console.log("\tlexicon_count: " + lexicon_count);
                            console.log("positive_array: "+positive_array);
                            console.log("negative_array: "+negative_array);

                            if (positive_array.length > 0) {//jezeli tablica wyników nie jest pusta należy zsumowac wyniki i podzielic przez ilosc słowników
                                const sum = positive_array.reduce(function (a, b) {
                                    return a + b;
                                }, 0);
                                console.log("sum: " + sum);
                                pos += (sum / lexicon_count) * weight; //dodanie wyniku do ostatecznego wyniku
                                console.log("pos: " + pos);
                            }
                            if (negative_array.length > 0) {
                                const sum = negative_array.reduce(function (a, b) {
                                    return a + b;
                                }, 0);
                                neg += (sum / lexicon_count) * weight;
                                console.log("neg: " + neg);
                            }

                        });
                        //koniec petli dla kazdego lemmatu

                        // console.log("positive: " + pos);
                        // console.log("negative: " + neg);

                        // console.log("positive_array: " + positive);
                        // console.log("negative_array: " + negative);

                        Scores.push({ pos: pos, neg: neg });
                        // console.log("Scores: " + Scores);

                        // console.log("\n\n---------------------------\n\n");

                        let res;

                        if (pos > neg * -1) {
                            res = { sentence: part, pos: pos, neg: neg, sentiment: "positive" };
                        } else if (pos < neg * -1) {
                            res = { sentence: part, pos: pos, neg: neg, sentiment: "negative" };
                        } else {
                            res = { sentence: part, pos: pos, neg: neg, sentiment: "neutral" };
                        }
                        Results =  [...Results, res];
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
        if (reviews.error) {
            return NextResponse.json(reviews, { status: 404 });
        }
        const sentimentData = await analyzeSentiment(reviews[company]?.map((review: { text: any; }) => ({ text: review.text })));
        return NextResponse.json(sentimentData);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import fs from 'fs';
import path from 'path';

// Other necessary imports
// const afinn165 = require('afinn-165');
// const posTagger = require('wink-pos-tagger');
// const vader = require('vader-sentiment');
// Ensure these are correctly imported or required
// Update your PUT endpoint to include the additional dataset
export async function PUT(req: NextRequest) {
    try {
        const dataDir = path.join(process.cwd(), 'src', 'app', 'api', 'rule');

        // Analyze standard dataset
        const standardResults = await analyzeStandardDataset(dataDir);

        // Analyze Twitter dataset
        const twitterResults = await analyzeTwitterDataset(dataDir);

        // **Add the new function call to analyze the additional dataset**
        const additionalResults = await analyzeAdditionalDataset(dataDir);

        // Save results
        const allResults = {
            standardResults,
            twitterResults,
            additionalResults
        };

        fs.writeFileSync(path.join(dataDir, 'results_new_win.json'), JSON.stringify(allResults, null, 2));

        // Return combined results
        return NextResponse.json(allResults, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Function to analyze the additional dataset
async function analyzeAdditionalDataset(dataDir: string) {
    const additionalFile = path.join(dataDir, 'train.jsonl');
    const additionalData: { text: string; sentiment: string }[] = [];

    // Read the JSONL file line by line
    const fileContent = fs.readFileSync(additionalFile, 'utf-8');
    const lines = fileContent.split('\n');

    for (const line of lines) {
        if (line.trim() === '') continue;
        try {
            const entry = JSON.parse(line.trim());
            // Assuming the JSON lines have 'text' and 'label_text' fields
            const text = entry.text;
            const sentiment = entry.label_text.toLowerCase(); // Ensure the sentiment label is in lowercase
            additionalData.push({ text, sentiment });
        } catch (err) {
            // Handle JSON parsing error
            console.error('Error parsing line:', line);
            continue;
        }
    }

    // Analyze the dataset and calculate metrics
    return await calculateMetrics(additionalData, 'additional');
}



async function analyzeStandardDataset(dataDir: string) {
    const files = ['imdb_labelled.txt', 'yelp_labelled.txt', 'amazon_cells_labelled.txt'];
    const testData: { text: string; sentiment: string }[] = [];

    // Load standard dataset
    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');

        for (const line of lines) {
            if (line.trim() === '') continue;
            const [sentence, scoreStr] = line.trim().split('\t');
            if (sentence && scoreStr) {
                const score = parseInt(scoreStr);
                const sentiment = score === 1 ? 'positive' : 'negative';
                testData.push({ text: sentence, sentiment });
            }
        }
    }

    return await calculateMetrics(testData, "standard");
}

async function analyzeTwitterDataset(dataDir: string) {
    const twitterFile = 'test_twitter.csv';
    const twitterPath = path.join(dataDir, twitterFile);
    const twitterData = loadTwitterData(twitterPath);
    console.log("twitter data: ");
    console.log(twitterData);
    
    return await calculateMetrics(twitterData, "twitter");
}

async function calculateMetrics(testData: { text: string; sentiment: string }[], datasetType: string) {
    const startTime = Date.now();
    const analysisResults = await analyzeSentiment(testData.map(item => ({ text: item.text })));
    const timeTaken = Date.now() - startTime;

    let correct = 0;
    const total = testData.length;

    // Positive metrics
    let truePositives = 0;
    let falseNegatives_positive = 0;
    let falsePositives = 0;


    // Negative metrics
    let trueNegatives = 0;
    let falseNegatives_negative = 0;
    let falseNegatives = 0;


    let trueNeutrals = 0;
    let falseNegatives_neutral = 0;
    let falseNeutrals = 0;


    let neutralPredictions = 0;
    let neutralPositiveMisses = 0;
    let neutralNegativeMisses = 0;

    // Check if dataset includes neutral class
    const neutral_in_dataset = testData.some(item => item.sentiment === 'neutral');

    let currentIndex = 0;
    for (let i = 0; i < testData.length; i++) {
        const originalText = testData[i].text;
        const expected = testData[i].sentiment;
        
        const parts = [];
        let combinedPos = 0;
        let combinedNeg = 0;
        
        while (currentIndex < analysisResults.results.length) {
            const currentPart = analysisResults.results[currentIndex];
            if (!originalText.includes(currentPart.sentence)) break;
            parts.push(currentPart);
            combinedPos += currentPart.pos;
            combinedNeg += currentPart.neg;
            currentIndex++;
        }

        let predicted = 'neutral';
        if (combinedPos > Math.abs(combinedNeg)) {
            predicted = 'positive';
        } else if (Math.abs(combinedNeg) > combinedPos) {
            predicted = 'negative';
        }

        if (predicted === 'neutral') {
            neutralPredictions++;
            if (expected === 'positive') {
                neutralPositiveMisses++;
                falseNeutrals++;
                falseNegatives_positive++;
            } else if (expected === 'negative') {
                neutralNegativeMisses++;
                falseNeutrals++;
                falseNegatives_negative++;
            } else if (expected === 'neutral') {
                correct++;
                trueNeutrals++;
            }
        }else if (predicted === 'positive') {
            if (expected === 'positive') {
                correct++;
                truePositives++;
            } else if (expected === 'negative') {
                falsePositives++;
                falseNegatives_negative++;
            } else if (expected === 'neutral') {
                falseNegatives_neutral++;
                falsePositives++;
            }
        } else if (predicted === 'negative') {
            if (expected === 'negative') {
                correct++;
                trueNegatives++;
            } else if (expected === 'positive') {
                falseNegatives++;
                falseNegatives_positive++;
            } else if (expected === 'neutral') {
                falseNegatives++;
                falseNegatives_neutral++;
            }
        }


        // } else if (predicted === expected) {
        //     correct++;
        //     if (predicted === 'positive') {
        //         truePositives++;
        //     } else if (predicted === 'negative') {
        //         trueNegatives++;
        //     }
        // } else {
        //     if (predicted === 'positive') {
        //         falsePositives++;
        //     } else {
        //         falseNegatives++;
        //     }
        // }
    }

    const accuracy = correct / total;
    
    // Calculate base metrics
    const precisionPositive = truePositives / (truePositives + falsePositives || 1);
    const recallPositive = truePositives / (truePositives + falseNegatives_positive || 1);
    const f1Positive = 2 * (precisionPositive * recallPositive) / (precisionPositive + recallPositive || 1);

    const precisionNegative = trueNegatives / (trueNegatives + falseNegatives || 1);
    const recallNegative = trueNegatives / (trueNegatives + falseNegatives_negative || 1);
    const f1Negative = 2 * (precisionNegative * recallNegative) / (precisionNegative + recallNegative || 1);

    // Calculate neutral metrics if present in dataset
    let precisionNeutral = null;
    let recallNeutral = null;
    let f1Neutral = null;

    if (neutral_in_dataset) {
        precisionNeutral = trueNeutrals / (trueNeutrals + falseNeutrals || 1);
        recallNeutral = trueNeutrals / (trueNeutrals + falseNegatives_neutral || 1);
        f1Neutral = 2 * (precisionNeutral * recallNeutral) / (precisionNeutral + recallNeutral || 1);
    }

    const result: any = {
        datasetType,
        timeTaken,
        accuracy,
        precision: {
            positive: precisionPositive,
            negative: precisionNegative
        },
        recall: {
            positive: recallPositive,
            negative: recallNegative
        },
        f1Score: {
            positive: f1Positive,
            negative: f1Negative
        },
        totalSamples: total,
        correctPredictions: correct,
        neutralStats: {
            total: neutralPredictions,
            missedPositives: neutralPositiveMisses,
            missedNegatives: neutralNegativeMisses,
            percentage: (neutralPredictions / total) * 100,
            trueNeutrals: neutral_in_dataset ? trueNeutrals : null
        }
    };

    // Add neutral metrics if applicable
    if (neutral_in_dataset) {
        result.precision.neutral = precisionNeutral;
        result.recall.neutral = recallNeutral;
        result.f1Score.neutral = f1Neutral;
    }

    return result;
}

// Function to load Twitter data
function loadTwitterData(filePath: string): { text: string; sentiment: string }[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    const twitterData: { text: string; sentiment: string }[] = [];

    lines.forEach(line => {
        if (!line.trim()) return;
        
        const matches = line.match(/"([^"]*)"(?:,|\s+)?/g);
        if (!matches || matches.length < 6) return;

        const values = matches.map(m => m.replace(/"/g, ''));
        
        const sentiment = values[0];
        const text = values[5];

        //console.log(sentiment, text);

        // Map Twitter sentiment values (0,2,4) to our format
        let mappedSentiment: string;
        switch (sentiment) {
            case '4,':
                mappedSentiment = 'positive';
                break;
            case '2,':
                mappedSentiment = 'neutral';
                break;
            case '0,':
                mappedSentiment = 'negative';
                break;
            default:
                return;
        }

        twitterData.push({
            text: text,
            sentiment: mappedSentiment
        });
    });

   return twitterData;
}