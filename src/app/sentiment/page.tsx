import { BookLetter20Filled, BrainCircuit20Filled } from "@fluentui/react-icons";
import { Selectable } from "../ui/selectable";
import { HybridFilled } from "../ui/sidenav";


//const text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore dicta quia itaque, consequatur eos tempora facilis maxime nam quas temporibus, aliquam qui accusantium totam repudiandae facere. In quasi totam incidunt ratione modi, perspiciatis tempore hic accusamus, ad voluptas praesentium provident unde iste commodi qui ducimus, at adipisci aspernatur dicta ex!";

const text = {
  rule:"This method uses predefined rules and lexicons to analyze text and determine sentiment based on scores assigned to words in lexicons. Gives best results in single sentence analysis.",
  ml:"This method uses machine learning algorithms to analyze text and determine sentiment based on patterns in the data.",
  hybrid:"This method uses a combination of rule-based and machine learning algorithms to analyze text and determine sentiment based on set parameters and patterns in the data. Gives best results in bulk sentence analysis."
}


export default async function Page() {
  
  //await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
        <div className="flex-col">
          <p className=" font-semibold text-5xl mt-12">Sentiment Analysis</p>
          <p className="text-xl mt-3">This tool is used to conduct sentiment analysis, pick one of two methods below by clicking start or click the banner for more info</p>
          <div className="flex flex-row h-48 mt-10 justify-around items-center">
            {/* <Selectable text={text.ml} href="/sentiment/machine" logo={<BrainCircuit20Filled/>}>Machine learning</Selectable> */}
            <Selectable text={text.rule} href="/sentiment/rule" logo={<BookLetter20Filled/>}>Rule-based</Selectable>
            <Selectable text={text.hybrid} href="/sentiment/hybrid" logo={<HybridFilled/>}>Hybrid approach</Selectable>
          </div>
        </div>
    );
  }

  