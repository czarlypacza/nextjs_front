// components/CompaniesSkeleton.tsx
import React from 'react';

const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full rounded-md before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

const CompaniesSkeleton = () => {
    return (
        <div className='flex flex-col items-center h-full w-full max-w-md'>
            <div className={`${shimmer} relative w-full overflow-hidden h-full flex justify-center gap-4`}>
                <div className="h-full w-full rounded-md bg-zinc-200 dark:bg-zinc-800">
                    <div className="h-4 mt-6 ml-5 mr-20 bg-opacity-55 bg-zinc-300 dark:bg-zinc-700 m-2 rounded-md" />

                    <div className="h-8 ml-5 mr-5 bg-opacity-55 bg-zinc-300 dark:bg-zinc-700 m-2 rounded-md" />
                    <div className="h-4 mt-5 ml-5 mr-20 bg-opacity-55 bg-zinc-300 dark:bg-zinc-700 m-2 rounded-md" />

                    <div className="h-8 ml-5 mr-5 bg-opacity-55 bg-zinc-300 dark:bg-zinc-700 m-2 rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default CompaniesSkeleton;