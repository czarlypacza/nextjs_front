import SelectableSkeleton from "../ui/skeletons/selectableSkeleton";


export default function Loading() {
  return (
    <div className="flex-col">
      <p className=" font-semibold text-5xl mt-12">Sentiment Analysis</p>
      <p className="text-xl mt-3">This tool is used to conduct sentiment analysis, pick one of two methods below by clicking start or click the banner for more info</p>
      <div className="flex flex-row h-48 mt-10 justify-around items-center">
        {/* <SelectableSkeleton /> */}
        <SelectableSkeleton />
        <SelectableSkeleton />
      </div>
    </div>
  );
}
