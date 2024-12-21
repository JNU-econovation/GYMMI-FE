import Image from 'next/image';

import profileIcon from '@/../public/svgs/workspace/workspaceConfirmaion/profileIcon.svg';
import profileIconWhite from '@/../public/svgs/workspace/workspaceConfirmaion/profileIconWhite.svg';

import { imageLoader } from '@/utils/image';

type TProfileImageUrlParams = {
  profileImageUrlParams: string;
};

export default function ConfirmationProfileImg({
  profileImageUrlParams,
}: TProfileImageUrlParams) {
  return (
    <div>
      {profileImageUrlParams === 'default.png' ? (
        <Image src={profileIconWhite} alt='profileIconWhite' />
      ) : (
        <Image
          src={profileImageUrlParams}
          alt='profileIcon'
          loader={() => imageLoader(profileImageUrlParams)}
          width={30}
          height={30}
          className='w-10 h-10 rounded-full'
        />
      )}
    </div>
  );
}
