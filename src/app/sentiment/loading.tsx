import SelectableSkeleton from "../ui/skeletons/selectableSkeleton";


export default function Loading() {
  return (
    <div className="flex-col">
      <p className=" font-semibold text-5xl mt-12">Sentiment Analysis</p>
      <div className="flex flex-row h-48 mt-10 justify-between items-center">
        <SelectableSkeleton />
        <SelectableSkeleton />
        <SelectableSkeleton />
      </div>
    </div>
  );
}
