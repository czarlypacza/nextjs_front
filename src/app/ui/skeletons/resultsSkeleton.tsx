import React from 'react';

const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full rounded-md before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


const ResultsSkeleton = () => {
    return (
        // <Skeleton className='w-10'>
        //     <SkeletonItem size={28} />
        // </Skeleton>
        <div className='mt-4 flex flex-col items-center'>
            <div className={`${shimmer} relative w-fit overflow-hidden md:col-span-4 mb-4 flex justify-center gap-4`}>
                <div className="h-16 w-36 rounded-md bg-zinc-200 dark:bg-zinc-800" >
                    <div className="h-5 w-12 bg-opacity-55 bg-zinc-300 dark:bg-zinc-400 m-2 rounded-md ml-auto mr-auto" />
                    <div className="h-5 w-24 bg-opacity-55 bg-zinc-300 dark:bg-zinc-400 m-2 mt-0 rounded-md ml-auto mr-auto" />
                </div>
                <div className="h-16 w-40 rounded-md bg-zinc-200 dark:bg-zinc-800" >
                    <div className="h-5 w-12 bg-opacity-55 bg-zinc-300 dark:bg-zinc-400 m-2 rounded-md ml-auto mr-auto" />
                    <div className="h-5 w-24 bg-opacity-55 bg-zinc-300 dark:bg-zinc-400 m-2 mt-0 rounded-md ml-auto mr-auto" />
                </div>
                <div className="h-16 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800" >
                    <div className="h-5 w-20 bg-opacity-55 bg-zinc-300 dark:bg-zinc-400 m-2 rounded-md ml-auto mr-auto" />
                    <div className="h-5 w-16 bg-opacity-55 bg-zinc-300 dark:bg-zinc-400 m-2 mt-0 rounded-md ml-auto mr-auto" />
                </div>
            </div>

            <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
                <div className="rounded-md">
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-full bg-opacity-55 bg-zinc-300 dark:bg-zinc-700" />
                        <div className="h-10 w-full bg-opacity-55 bg-zinc-200 dark:bg-zinc-400 opacity-5 border-b-2" />
                        <div className="h-10 w-full bg-opacity-55 bg-zinc-200 dark:bg-zinc-400 opacity-5 border-b-2" />
                        <div className="h-10 w-full bg-opacity-55 bg-zinc-200 dark:bg-zinc-400 opacity-5 border-b-2" />
                        <div className="h-10 w-full bg-opacity-55 bg-zinc-200 dark:bg-zinc-400 opacity-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsSkeleton;