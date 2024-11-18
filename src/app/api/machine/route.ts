import { NextRequest, NextResponse } from 'next/server';

type InputData = {
    result: {
      [key: string]: string[];
    }[];
  };
  
  type OutputData = {
    scores: { pos: number; neg: number }[];
    results: { sentence: string; pos: number; neg: number; sentiment: string }[];
  };

  const convertData = (input: string): OutputData => {
    const inputData: InputData = JSON.parse(input);
    const scores: { pos: number; neg: number }[] = [];
    const results: { sentence: string; pos: number; neg: number; sentiment: string }[] = [];
  
    inputData.result.forEach((item) => {
      const sentence = Object.keys(item)[0];
      const sentiment = item[sentence][0];
      const pos = sentiment == "positive" ? 1 : 0;
      const neg = sentiment == "negative" ? -1 : 0;

      scores.push({ pos, neg });
      results.push({ sentence, pos, neg, sentiment });
    });
  
    const outputData: OutputData = { scores, results };
    return outputData;
  };
  

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get('company');
    const limit = searchParams.get('limit');

    if (!company) {
        return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }

    try {
        const sentimentData = await fetch(`http://192.168.0.140:5002/sentiment/${company}?limit=${limit}`).then((res) => res.json());

        console.log("sentiment data:\n\n"+sentimentData);
        const convertedData = convertData(JSON.stringify(sentimentData));

        return NextResponse.json(convertedData);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    try {
        const sentimentData = await fetch('http://192.168.0.140:5002/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((res) => res.json());

        console.log(sentimentData);
        const { scores, results } = sentimentData;
        return NextResponse.json({ scores, results });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}