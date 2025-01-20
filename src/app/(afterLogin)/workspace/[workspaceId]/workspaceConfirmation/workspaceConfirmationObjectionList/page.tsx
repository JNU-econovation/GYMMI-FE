'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ObjectionListButton from './_components/ObjectionListButton';

import useWorkoutIdFromParams from '@/hooks/workoutHistory/useWorkoutIdFromParams';
import useInfiniteQuerys from '@/hooks/workoutConfirmation/ useInfiniteQuerys';
import { workoutConfirmationObjectionLists } from '@/api/workspaceConfirmaion';
import WorkoutConfirmationObjectionList from './_components/WorkoutConfirmationObjectionList';
import NoDataUI from '../../../_components/NoDataUI';

export default function Page() {
  const workspaceId = useWorkoutIdFromParams();
  const [statusButton, setStatusButton] = useState('inProgress');
  const [ref, inView] = useInView();

  const workoutConfirmationObjectionList = useInfiniteQuerys({
    queryKey: ['workoutConfirmations', workspaceId, statusButton],
    dataReqFn: workoutConfirmationObjectionLists,
    params: { workspaceId, status: statusButton },
    inView,
  });

  const workoutConfirmationObjectionListPages =
    workoutConfirmationObjectionList?.pages.flatMap((pages) => pages.data);

  return (
    <div className='h-max pb-3'>
      <span className='text-2xl font-semibold text-[#374151]'>
        이의 신청 알림 목록
      </span>
      <hr className='border-1 border-[#E5E7EB] w-screen -mx-4 mt-6' />
      <div className='flex my-4'>
        <ObjectionListButton
          comment='모두'
          onClick={() => setStatusButton('inProgress')}
          isClick={statusButton === 'inProgress'}
        />
        <ObjectionListButton
          comment='투표 안함'
          onClick={() => setStatusButton('incompletion')}
          isClick={statusButton === 'incompletion'}
        />
        <ObjectionListButton
          comment='완료됨'
          onClick={() => setStatusButton('closed')}
          isClick={statusButton === 'closed'}
        />
      </div>
      {workoutConfirmationObjectionListPages?.length === 0 ? (
        <div className='h-[500px]'>
          <NoDataUI content='이의신청 알림이 없습니다.' />
        </div>
      ) : (
        <WorkoutConfirmationObjectionList
          workoutConfirmationObjectionListPages={
            workoutConfirmationObjectionListPages
          }
          workspaceId={workspaceId}
        />
      )}
      <div ref={ref} style={{ height: 10 }} />
    </div>
  );
}
