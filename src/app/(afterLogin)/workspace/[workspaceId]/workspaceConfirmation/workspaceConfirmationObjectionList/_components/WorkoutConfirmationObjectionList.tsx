import Image from 'next/image';
import Link from 'next/link';

import objectionBellFill from '@/../public/svgs/workspace/workspaceConfirmaion/objectionBellFill.svg';
import { IWorkoutConfirmationObjectionListPageProps } from '@/types/workoutConfirmation';

interface IWorkoutConfirmationObjectionList {
  workoutConfirmationObjectionListPages:
    | IWorkoutConfirmationObjectionListPageProps[]
    | undefined;
  workspaceId: number;
}

export default function WorkoutConfirmationObjectionList({
  workoutConfirmationObjectionListPages,
  workspaceId,
}: IWorkoutConfirmationObjectionList) {
  return (
    <div>
      {workoutConfirmationObjectionListPages?.map(
        (
          workoutConfirmationObjectionListPage: IWorkoutConfirmationObjectionListPageProps
        ) => {
          return (
            <div
              key={workoutConfirmationObjectionListPage.objectionId}
              className={`${
                workoutConfirmationObjectionListPage.voteCompletion &&
                'bg-[#D9D9D9] opacity-30'
              } -mx-4 p-4`}
            >
              <Link
                href={{
                  pathname: `/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmaionDetail`,
                  query: {
                    workoutConfirmationId:
                      workoutConfirmationObjectionListPage.workoutConfirmationId,
                    isObjection:
                      workoutConfirmationObjectionListPage.objectionId !== null,
                    objectionId:
                      workoutConfirmationObjectionListPage.objectionId,
                  },
                }}
              >
                <div className='flex'>
                  <Image src={objectionBellFill} alt='objectionBellFill' />
                  <div className='text-[#1F2937] flex flex-col pl-5 gap-y-1'>
                    <span className='text-base'>
                      {
                        workoutConfirmationObjectionListPage.targetWorkerNickname
                      }
                      님의 인증이 이의신청되었어요.
                    </span>
                    <span className='text-xs'>
                      {' '}
                      {workoutConfirmationObjectionListPage.createdAt.substring(
                        0,
                        10
                      )}{' '}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      )}
    </div>
  );
}
