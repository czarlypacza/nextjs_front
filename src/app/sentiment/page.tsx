import { BookLetter20Filled, BrainCircuit20Filled } from "@fluentui/react-icons";
import { Selectable } from "../ui/selectable";
import { HybridFilled } from "../ui/sidenav";
import SelectableSkeleton from "../ui/skeletons/selectableSkeleton";


//const text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore dicta quia itaque, consequatur eos tempora facilis maxime nam quas temporibus, aliquam qui accusantium totam repudiandae facere. In quasi totam incidunt ratione modi, perspiciatis tempore hic accusamus, ad voluptas praesentium provident unde iste commodi qui ducimus, at adipisci aspernatur dicta ex!";

const text = {
  rule:" This method uses predefined rules and lexicons to analyze text and determine sentiment based on set parameters.",
  ml:"This method uses machine learning algorithms to analyze text and determine sentiment based on patterns in the data.",
  hybrid:"This method uses a combination of rule-based and machine learning algorithms to analyze text and determine sentiment based on set parameters and patterns in the data."
}


export default async function Page() {
  
  await new Promise((resolve) => setTimeout(resolve, 3000));


    return (
        <div className="flex-col">
          <p className=" font-semibold text-5xl mt-12">Sentiment Analysis</p>
          <div className="flex flex-row h-48 mt-10 justify-between items-center">
            <Selectable text={text.ml} href="/sentiment/machine" logo={<BrainCircuit20Filled/>}>Machine learning</Selectable>
            <Selectable text={text.rule} href="/sentiment/rule" logo={<BookLetter20Filled/>}>Rule-based</Selectable>
            <Selectable text={text.hybrid} href="/sentiment/hybrid" logo={<HybridFilled/>}>Hybrid approach</Selectable>
            {/* <SelectableSkeleton /> */}
            
          </div>
        </div>
    );
  }

  