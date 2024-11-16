'use client';

import plus from '@/../public/svgs/plus.svg';
import filledCheck from '@/../public/svgs/workspace/filledCheck.svg';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import registerIcon from '@/../public/svgs/workspace/registerOff.svg';
import registerOnIcon from '@/../public/svgs/workspace/registerOn.svg';

import emptyStar from '@/../public/svgs/workspace/emptyStar.svg';
import filledStart from '@/../public/svgs/workspace/filledStar.svg';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { userMissions } from '@/api/workspace';
import { useEffect, useState } from 'react';
import { getBookmarks, postBookmark } from '@/api/workout';
import { useWorkoutStore } from '@/hooks/useWorkout';
import { sendFCMNotification } from '@/action/sendFCM';

type TMission = {
  id: number;
  mission: string;
  score: number;
  isFavorite: boolean;
};

export default function Page() {
  const { workspaceId } = useParams();
  const { workoutInfo, updateMission } = useWorkoutStore();
  const [activeNumber, setActiveNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [bookmark, setBookmark] = useState('all');
  const [selectedMission, setSelectedMission] = useState<TMission | null>(null);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['missions', bookmark],
    queryFn: async () => {
      if (bookmark === 'all') {
        return await userMissions(Number(workspaceId));
      } else {
        return await getBookmarks(Number(workspaceId));
      }
    },
  });

  const handleAddClick = () => {
    if (selectedMission) {
      updateMission({
        id: selectedMission.id,
        mission: selectedMission.mission,
        score: selectedMission.score,
        count: activeNumber,
      });
      setActiveNumber(0);
      setOpen(false);
    }
  };
  const handleBookmark = async () => {
    try {
      const numId = Number(workspaceId);
      const res = await postBookmark({
        workspaceId: numId,
        missionId: selectedMission?.id,
      });
      //임시로 설정. 추후 optimistic update로 바꿀 예정
      if (res.status === 200 && selectedMission) {
        setSelectedMission({
          ...selectedMission,
          isFavorite: !selectedMission.isFavorite,
        });
        await queryClient.invalidateQueries({ queryKey: ['missions'] });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTest = async () => {
    try {
      const res = await sendFCMNotification({
        title: '테스트 알림', // 알림 제목
        body: '이것은 테스트 알림입니다.', // 알림 내용
        token: localStorage.getItem('fcmToken') as string, // 실제 클라이언트에서 생성된 FCM 토큰
        image: '/images/basicIcon.png', // 선택: 아이콘 또는 이미지 경로
        click_action: 'https://example.com', // 선택: 알림 클릭 시 이동할 URL
      });
      console.log('FCM 전송 성공:', res);
    } catch (error) {
      console.error('FCM 전송 실패:', error);
    }
  };

  const getMissionCount = (missionId: number) => {
    const mission = workoutInfo.missions.find((item) => item.id === missionId);
    return mission ? mission.count : 0;
  };

  const isMissionCompleted = (missionId: number) =>
    getMissionCount(missionId) > 0;

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('알림 권한 허용됨');
        } else {
          console.warn('알림 권한 거부됨');
        }
      });
    }
  }, []);
  return (
    <div>
      <div className="flex justify-start items-center text-xs gap-2 mb-4">
        <div
          className={`${
            bookmark === 'all'
              ? 'bg-[#9CA3AF] text-white'
              : 'bg-[#F9FAFB] text-[#9CA3AF]'
          } px-3 py-1 rounded-xl`}
          onClick={() => setBookmark('all')}
        >
          전체
        </div>
        <div
          className={`${
            bookmark === 'bookmark'
              ? 'bg-[#9CA3AF] text-white'
              : 'bg-[#F9FAFB] text-[#9CA3AF]'
          } px-3 py-1 rounded-xl`}
          onClick={() => setBookmark('bookmark')}
        >
          즐겨찾기
        </div>
        <div className="bg-blue-500" onClick={handleTest}>
          fcm text
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          {data?.map((item: TMission) => (
            <div
              className="w-full h-16 py-3 px-4 rounded-lg bg-[#FEFCE8] flex justify-between items-center"
              key={item.id}
              onClick={() => {
                setOpen(true);
                setSelectedMission(item);
                setActiveNumber(getMissionCount(item.id));
              }}
            >
              <div className="flex flex-col">
                <h3 className="text-base">{item.mission}</h3>
                <span className="text-xs font-normal">{`${item.score}점`}</span>
              </div>

              <div>
                <DrawerTrigger asChild id={item.id.toString()}>
                  <button>
                    <Image
                      src={isMissionCompleted(item.id) ? filledCheck : plus}
                      alt="icon"
                    />
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ))}
        </div>
        <DrawerContent>
          <div className="w-full max-w-sm">
            <DrawerHeader>
              <div className="flex justify-between">
                <DrawerTitle className="mb-2">
                  {selectedMission
                    ? selectedMission.mission
                    : '선택된 미션이 없습니다'}
                </DrawerTitle>
                <div onClick={handleBookmark}>
                  {selectedMission?.isFavorite ? (
                    <Image src={filledStart} alt="filled-star" />
                  ) : (
                    <Image src={emptyStar} alt="empty-star" />
                  )}
                </div>
              </div>

              <DrawerDescription>
                {selectedMission ? `${selectedMission.score}점` : ''}
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              <div className="w-full py-2 px-5 rounded-full bg-[#F3F4F6] flex justify-between mb-2">
                <button
                  className="text-2xl"
                  onClick={() =>
                    setActiveNumber((prev) => Math.max(prev - 1, 0))
                  }
                >
                  -
                </button>
                <div className="text-2xl">{activeNumber}</div>
                <button
                  className="text-2xl"
                  onClick={() => setActiveNumber((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="w-full py-3 rounded-full bg-main text-white"
                onClick={handleAddClick}
              >
                추가하기
              </button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <div className="w-full fixed bottom-10">
        <button
          className={`py-3 w-[90%] ${
            workoutInfo.missions.length > 0
              ? 'bg-main text-white'
              : 'bg-[#EFF6FF]'
          } rounded-full flex justify-center items-center text-base`}
          onClick={() => {
            if (workoutInfo.missions.length <= 0) return;
            router.push(`/workspace/${workspaceId}/workout/register`);
          }}
        >
          <div className="absolute left-4">
            {workoutInfo.missions.length > 0 ? (
              <Image src={registerOnIcon} alt="registerOnIcon" />
            ) : (
              <Image src={registerIcon} alt="registerIcon" />
            )}
          </div>
          <span>등록하러 가기</span>
        </button>
      </div>
    </div>
  );
}
