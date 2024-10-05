"use client";
import { Skeleton, SkeletonItem } from '@fluentui/react-components';
import React from 'react';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


const SelectableSkeleton = () => {
    return (
        <Skeleton className='w-10'>
            <SkeletonItem size={28} />
        </Skeleton>
      );
};

export default SelectableSkeleton;