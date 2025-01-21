'use client';

import Link from 'next/link';
import Image from 'next/image';

import objectionBell from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBell.svg';
import objectionBellFilled from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBellFilled.svg';

interface IObjectionProps {
  workspaceId: number;
  workoutConfirmationVoteInCompletionCount: number[] | undefined;
}

export default function ObjectionBell({
  workspaceId,
  workoutConfirmationVoteInCompletionCount,
}: IObjectionProps) {
  const voteInCompeletionCount =
    workoutConfirmationVoteInCompletionCount?.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  return (
    <Link
      href={`/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmationObjectionList`}
    >
      <div className='fixed bottom-14 right-2 z-50'>
        {voteInCompeletionCount ? (
          <div className='relative'>
            <div className='h-5 w-5 absolute right-1 bottom-9 rounded-full bg-[#ffffff] drop-shadow-md'>
              <span className='text-sm absolute right-2 left-1'>
                {voteInCompeletionCount}
              </span>
            </div>
            <Image
              src={objectionBellFilled}
              alt='objectionBellFilled'
              className='w-14 h-14'
            />
          </div>
        ) : (
          <Image
            src={objectionBell}
            alt='objectionBell'
            className='w-14 h-14'
          />
        )}
      </div>
    </Link>
  );
}
