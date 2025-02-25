import React from 'react';

const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full rounded-md before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


const AnalyzerSkeleton = () => {
    return (
        // <Skeleton className='w-10'>
        //     <SkeletonItem size={28} />
        // </Skeleton>
        <div className="mt-4">
        <div className={`${shimmer} relative w-fit overflow-hidden md:col-span-4 mb-4`}>
          <div className="h-8 w-48 rounded-md bg-opacity-55 bg-zinc-200 dark:bg-zinc-700" />
        </div>
  
        <div className={`${shimmer} relative w-auto overflow-hidden md:col-span-4`}>
          <div className="rounded-md bg-opacity-55 bg-zinc-200 dark:bg-zinc-800 p-2">
            <div className="flex flex-col items-center gap-4 pb-1 pt-1 pl-1 pr-1">
              <div className="h-6 w-full rounded-md flex justify-start pt-2 mb-1">
                <div className="h-6 w-1/3 rounded-md bg-opacity-55 bg-zinc-200 dark:bg-zinc-700" />
              </div>
  
              <div className="h-56 w-full rounded-md bg-opacity-55 bg-zinc-200 dark:bg-zinc-700" />
  
              <div className="h-8 w-full rounded-md flex justify-start gap-2">
                <div className="h-8 w-28 rounded-md bg-opacity-55 bg-blue-400 dark:bg-blue-600" />
                <div className="h-8 w-28 rounded-md bg-opacity-55 bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AnalyzerSkeleton;