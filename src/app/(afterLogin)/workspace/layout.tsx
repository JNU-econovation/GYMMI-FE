'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

import settings from '@/../public/svgs/workspace/settings.svg';
import BackArrow from '../_components/BackArrow';
import NavbarItems from './_components/NavbarItems';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const workspaceId = useSelectedLayoutSegment();
  const workspaceIdNumber = workspaceId ? Number(workspaceId) : 0;

  const pathName = usePathname();
  const segments = pathName.split('/');
  const currentSegment = segments[segments.length - 1];

  return (
    <div>
      <div
        className={`${
          currentSegment === 'workspaceConfirmation' &&
          'sticky top-0 bg-white z-10'
        } px-4 pt-12`}
      >
        <div className='flex justify-between'>
          <BackArrow />
          {currentSegment !== 'workspaceConfirmationObjectionList' && (
            <Link href={`/workspaceDetail/${workspaceIdNumber}`}>
              <div>
                <Image className='w-6 h-6' src={settings} alt='settings' />
              </div>
            </Link>
          )}
        </div>
        <nav className='my-3'>
          {currentSegment !== 'workspaceConfirmationObjectionList' && (
            <hr className='border-1 border-[#E5E7EB] w-screen -mx-4' />
          )}
          {currentSegment === 'workspaceConfirmationDetail' ||
          currentSegment === 'workspaceConfirmationObjectionList' ? (
            <></>
          ) : (
            <>
              <ul className='flex text-sm gap-x-11 sm:gap-x-8 lg:gap-x-12 justify-center my-2.5 text-[#E5E7EB]'>
                <NavbarItems
                  workspaceId={workspaceId}
                  currentSegment={currentSegment}
                />
              </ul>
              <hr className='border-1 border-[#E5E7EB] w-screen -mx-4' />
            </>
          )}
        </nav>
      </div>
      <div
        className={`px-4 ${
          pathName.includes('/workout') ||
          pathName.includes('workspaceConfirmation')
            ? 'bg-white'
            : 'bg-custom-gradient2'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
