import Link from 'next/link';
import Image from 'next/image';

import { IWorkoutConfirmationPageProps } from '@/types/workoutConfirmation';
import { s3ImageLoader } from '@/utils/image';

interface IConfirmationCompoConfirmProps {
  workoutConfirmationPage: IWorkoutConfirmationPageProps;
  workspaceId: number;
}

export default function ConfirmationCompoConfirm({
  workoutConfirmationPage,
  workspaceId,
}: IConfirmationCompoConfirmProps) {
  return (
    <div id={`confirmation-${workoutConfirmationPage.objectionId}`}>
      <Link
        href={{
          pathname: `/workspace/${workspaceId}/workspaceConfirmation/workspaceConfirmationDetail`,
          query: {
            workoutConfirmationId:
              workoutConfirmationPage.workoutConfirmationId,
            isObjection:
              workoutConfirmationPage.isObjection ||
              workoutConfirmationPage.objectionId !== null,
            objectionId: workoutConfirmationPage.objectionId,
          },
        }}
      >
        <div
          className={`${
            workoutConfirmationPage.isMine ? 'bg-[#FFEDA6]' : 'bg-[#FDFDFD]'
          } w-[155px] h-[155px] pl-2 pt-1 rounded-lg drop-shadow-lg`}
        >
          <span className='text-[#1F2937] text-sm'>운동인증을 올렸어요!</span>
          <div className='flex gap-x-2 mt-1'>
            <div className='w-28 h-28 flex items-center justify-center relative'>
              <Image
                src={workoutConfirmationPage.workoutConfirmationImageUrl}
                alt='workoutConfirmationImageUrl'
                fill
                loader={() =>
                  s3ImageLoader(
                    workoutConfirmationPage.workoutConfirmationImageUrl
                  )
                }
                sizes='105px'
                className='object-cover'
                quality={75}
              />
            </div>
            <div className='flex items-end'>...</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
