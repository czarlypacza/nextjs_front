import { NextRequest, NextResponse } from 'next/server';

type InputData = {
    result: {
      [key: string]: number[][];
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
      const [pos, neg] = item[sentence][0];
  
      const sentiment = pos > Math.abs(neg) ? 'positive' : neg < 0 ? 'negative' : 'neutral';
  
      scores.push({ pos, neg });
      results.push({ sentence, pos, neg, sentiment });
    });
  
    const outputData: OutputData = { scores, results };
    return outputData;
  };
  

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get('company');

    if (!company) {
        return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }

    try {
        const sentimentData = await fetch(`http://192.168.0.140:5000/sentiment/${company}`).then((res) => res.json());

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
        const sentimentData = await fetch('http://192.168.0.140:5000/sentiment', {
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