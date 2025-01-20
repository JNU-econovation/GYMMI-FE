'use client';

import Image from 'next/image';

import { Progress } from '@/components/ui/progress';
import voteChecked from '@/../public/svgs/workspace/workspaceConfirmaion/voteChecked.svg';
import { useState } from 'react';

interface ProgressProps {
  comment: string;
  progressValue: number;
  onClick: () => void;
  isObjectionVote: boolean | null;
}

export default function ProgressBar({
  comment,
  progressValue,
  onClick,
  isObjectionVote,
}: ProgressProps) {
  return (
    <div className='w-full relative' onClick={onClick}>
      <Progress
        indicatorColor='bg-[#FFEDA6]'
        className='h-10 my-2'
        value={progressValue}
      />
      <div
        className={`text-sm 
         ${isObjectionVote ? 'text-[#374151]' : 'text-[#848D99]'}
         w-[295px] absolute left-5 inset-y-2.5 flex justify-between`}
      >
        <div>{comment}</div>
        <div>
          {isObjectionVote && <Image src={voteChecked} alt='voteChecked' />}
        </div>
      </div>
    </div>
  );
}
