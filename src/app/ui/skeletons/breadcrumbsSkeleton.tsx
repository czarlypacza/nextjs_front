import React from 'react';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full rounded-md before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


const BreadcrumbsSkeleton = () => {
  return (
    // <Skeleton className='w-10'>
    //     <SkeletonItem size={28} />
    // </Skeleton>
    <div className={`${shimmer} relative overflow-hidden md:col-span-4 w-fit`}>
      <div className="rounded-md bg-zinc-200 dark:bg-zinc-800 bg-opacity-55 w-fit p-1">
        <div className="flex items-center pb-1 pt-1 pl-1 pr-1 w-fit">
          <div className="h-6 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700 bg-opacity-55" />
          <div className="ml-2 h-6 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700 bg-opacity-55" />
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbsSkeleton;