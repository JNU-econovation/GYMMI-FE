'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import notFound from '@/../public/svgs/notFound.svg';

const NotFound: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen py-11">
      <div className="flex flex-col justify-around items-center">
        <div className="mb-8">
          <Image src={notFound} alt="not-found" />
        </div>
        <h3 className="text-[#EF4444] ">존재하지 않는 페이지입니다.</h3>
        <h3 className="text-[#9CA3AF] ">돌아가세용.</h3>
      </div>

      <div onClick={() => router.back()} className="fixed bottom-10">
        <button className="bg-main text-white rounded-full py-2.5 px-36">
          뒤로가기
        </button>
      </div>
      <div className="h-10"></div>
    </div>
  );
};

export default NotFound;
