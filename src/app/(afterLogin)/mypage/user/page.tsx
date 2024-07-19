'use client';

import basicIcon from '@/../public/images/basicIcon.png';
import Image from 'next/image';
import NavBar from '../../_components/NavBar';
import NoFeed from '../_components/NoFeed';

export default function Page() {
  return (
    <div>
      <div className="px-5">
        <div className="flex flex-col justify-center items-center text-[#4B5563] mb-8">
          <div className="w-24 mb-5">
            <Image src={basicIcon} alt="profil-image" />
          </div>
          <span className="text-xl">조지미</span>
          <span>@gymmi12</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <button className="px-14 py-4 bg-[#F9FAFB] rounded-lg text-xs">
              프로필 편집
            </button>
          </div>
          <div>
            <button className="px-14 py-4 bg-[#F9FAFB] rounded-lg text-xs">
              피드 편집
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-[#F3F8FF]">
        <NoFeed />
      </div>
      <NavBar />
    </div>
  );
}