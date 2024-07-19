'use client';

//svgs
import createGroup from '@/../public/svgs/createGroup.svg';
import group from '@/../public/svgs/group.svg';
import home from '@/../public/svgs/home.svg';
import photoCommunity from '@/../public/svgs/photoCommunity.svg';
import myPage from '@/../public/svgs/myPage.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavBar() {
  const router = useRouter();
  return (
    <div className="w-full h-[96px] fixed bottom-0 flex justify-around items-start border-t-2 pt-3 bg-white">
      <div
        className="flex flex-col items-center"
        onClick={() => router.replace('/create-workspace/first')}
      >
        <Image src={createGroup} alt="createGroupIcon" className="my-0.5" />
        <span className="text-[6px] ">그룹만들기</span>
      </div>
      <Link href={'/workspace-list/mygroup'}>
        <div className="flex flex-col items-center">
          <Image src={group} alt="groupIcon" className="my-0.5" />
          <span className="text-[6px] mt-0.5">그룹페이지</span>
        </div>
      </Link>
      <Link href={'/'}>
        <div className="flex flex-col items-center">
          <Image src={home} alt="homeIcon" className="my-0.5" />
          <span className="text-[6px] ">홈</span>
        </div>
      </Link>
      <Link href={'/photoCommunity'}>
        <div className="flex flex-col items-center">
          <Image
            src={photoCommunity}
            alt="photoCommunityIcon"
            className="my-0.5"
          />
          <span className="text-[6px] ">사진커뮤니티</span>
        </div>
      </Link>
      <Link href={'/mypage/user'}>
        <div className="flex flex-col items-center">
          <Image src={myPage} alt="myPageIcon" className="my-0.5" />
          <span className="text-[6px] ">마이페이지</span>
        </div>
      </Link>
    </div>
  );
}
