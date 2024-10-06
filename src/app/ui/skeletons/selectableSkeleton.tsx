import React from 'react';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full rounded-md before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


const SelectableSkeleton = () => {
  return (
    // <Skeleton className='w-10'>
    //     <SkeletonItem size={28} />
    // </Skeleton>
    <div className={`${shimmer} relative w-auto overflow-hidden md:col-span-4`} style={{width:"32%"}}>
      {/* <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" /> */}
      <div className="rounded-md bg-zinc-800  p-2">
        {/* <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" /> */}
        <div className="flex items-center pb-1 pt-2 pl-2 pr-2">
          <div className="h-8 w-8 rounded-sm bg-opacity-55 bg-zinc-900" />
          <div className="ml-2 h-6 w-72 rounded-md bg-opacity-25 bg-zinc-700" />
          <div className="ml-2 h-8 w-24 rounded-md bg-opacity-25 bg-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default SelectableSkeleton;