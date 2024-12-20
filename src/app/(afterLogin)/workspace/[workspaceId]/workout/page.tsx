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
import { useState } from 'react';
import { getBookmarks, postBookmark } from '@/api/workout';
import { useWorkoutStore } from '@/hooks/useWorkout';

import noBookmark from '@/../public/svgs/workspace/workout/noBookmark.svg';

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
  const [isEditing, setIsEditing] = useState(false);
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
      setIsEditing(false);
    }
  };

  const handleDrawerOpen = (mission: TMission) => {
    setOpen(true);
    setSelectedMission(mission);
    setActiveNumber(getMissionCount(mission.id));

    if (mission && getMissionCount(mission.id) > 0) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
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

  const getMissionCount = (missionId: number) => {
    const mission = workoutInfo.missions.find((item) => item.id === missionId);
    return mission ? mission.count : 0;
  };

  const isMissionCompleted = (missionId: number) =>
    getMissionCount(missionId) > 0;

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          {data?.length === 0 ? (
            <div className="flex justify-center items-center flex-col absolute inset-0 transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
              <Image src={noBookmark} alt="no-bookmark" />
              <span className="text-sm text-[#4B5563] font-normal mt-5">
                아직 즐겨찾기한 운동이 없어요.
              </span>
            </div>
          ) : (
            data?.map((item: TMission) => (
              <div
                className="w-full h-16 py-3 px-4 rounded-lg bg-[#FEFCE8] flex justify-between items-center"
                key={item.id}
                onClick={() => handleDrawerOpen(item)}
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
            ))
          )}
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
                {isEditing ? '변경하기' : '추가하기'}
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
              : 'bg-[#EFF6FF] text-main'
          } rounded-full flex justify-center items-center text-base`}
          onClick={() => {
            if (workoutInfo.missions.length <= 0) return;
            router.push(`/workspace/${workspaceId}/workout/register`);
          }}
        >
          <span>등록하러 가기</span>
        </button>
      </div>
    </div>
  );
}
