import React from 'react';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full rounded-md before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


const SelectableSkeleton = () => {
  return (
    // <Skeleton className='w-10'>
    //     <SkeletonItem size={28} />
    // </Skeleton>
    <div
      className={`${shimmer} relative w-auto overflow-hidden md:col-span-4`}
      style={{ width: '32%' }}
    >
      <div className="rounded-md bg-zinc-200 dark:bg-zinc-800 p-2">
        <div className="flex justify-between pb-1 pt-2 pl-2 pr-2 ">
          <div className="h-8 w-8 rounded-sm bg-zinc-300 dark:bg-zinc-900 bg-opacity-55" />
          <div className="ml-2 h-6 w-full rounded-md bg-zinc-200 dark:bg-zinc-700 bg-opacity-25" />
          <div className="ml-2 h-8 w-24 rounded-md bg-violet-300 dark:bg-violet-700 bg-opacity-25" />
        </div>
      </div>
    </div>
  );
};

export default SelectableSkeleton;