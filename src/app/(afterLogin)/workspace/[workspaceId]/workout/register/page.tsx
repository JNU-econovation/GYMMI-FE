'use client';

import pencil from '@/../public/svgs/workspace/pencil.svg';
import photo from '@/../public/svgs/workspace/photo.svg';
import plus from '@/../public/svgs/plus.svg';
import checkedCircle from '@/../public/svgs/workspace/checkedCircle.svg';
import nonCheckedCircle from '@/../public/svgs/workspace/nonCheckedCircle.svg';
import warning from '@/../public/svgs/workspace/warning.svg';
import cancelPhoto from '@/../public/svgs/workspace/workout/cancelPhoto.svg';

import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useWorkoutStore } from '@/hooks/useWorkout';
import { Input } from '@/components/ui/input';
import { s3PutPresifnedUrls, workout } from '@/api/workout';
import { useParams, useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { compressingImage } from '@/utils/image/compressingImage';
import ButtonLoading from '@/app/(afterLogin)/_components/ButtonLoading';
import { AxiosError } from 'axios';
import { MyErrorResponse } from '@/types/error';

export default function Page() {
  const { workspaceId } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photoCheck, setPhotoCheck] = useState(false);
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { workoutInfo } = useWorkoutStore();

  const router = useRouter();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const compressedImage = await compressingImage(e);
    if (compressedImage) {
      setImagePreview(compressedImage);
    }
  };

  const handleImageRemove = (e: any) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImagePreview(null);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (imagePreview) {
      const imageUrl = await s3PutPresifnedUrls(imagePreview);

      const data = {
        imageUrl,
        comment,
        willLink: photoCheck,
        missions: workoutInfo.missions.map(({ id, count }) => ({ id, count })),
      };
      const id = Number(workspaceId);
      try {
        const workoutRes = await workout({ workspaceId: id, data });
        console.log(workoutRes);
        setIsLoading(false);
        if (workoutRes.status === 200) {
          setOpen(true);
        }
      } catch (error) {
        setIsLoading(false);
        const axiosError = error as AxiosError<MyErrorResponse>;
        if (axiosError.response?.data?.errorCode === 'INVALID_STATE') {
          alert('일일 가능한 운동을 초과했어요!');
        } else {
          alert(
            axiosError?.response?.data?.message ||
              '알 수 없는 에러가 발생했습니다.',
          );
        }
        console.log(error);
      }
    } else {
      alert('이미지를 등록해주세요!');
    }
  };

  return (
    <div className="">
      <div className="mb-4">
        <Label htmlFor="photo" className="flex items-center justify-start mb-2">
          <Image src={photo} alt="photo" className="mr-1" />
          <span className="text-base mr-1">사진 등록</span>
          <span className="text-base">(필수)</span>
        </Label>
        <div className="flex flex-col justify-start items-start gap-2">
          <div
            className="w-24 h-24 bg-[#F9FAFB] rounded-lg flex justify-center items-center relative"
            onClick={handleClick}
          >
            {imagePreview && (
              <span
                className="absolute -right-1 -top-1 rounded-full shadow-sm"
                onClick={(e) => handleImageRemove(e)}
              >
                <Image src={cancelPhoto} alt="cancel-photo" />
              </span>
            )}
            {imagePreview ? (
              <img
                src={URL.createObjectURL(imagePreview)}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image src={plus} alt="plus" />
            )}
          </div>
          <div onClick={() => setPhotoCheck((v) => !v)}>
            <span
              className={`${
                photoCheck ? 'text-[#1F2937]' : ' text-[#B7C4D5]'
              } text-xs flex`}
            >
              <Image
                src={photoCheck ? checkedCircle : nonCheckedCircle}
                alt="check"
                className="mr-1"
              />
              사진 커뮤니티에도 사진을 등록할까요?
            </span>
          </div>

          <Input
            required
            id="photo"
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <hr className="-mx-6 mb-3" />
      <div className="mb-2">
        <Label
          htmlFor="pencil"
          className="flex items-center justify-start mb-2"
        >
          <Image src={pencil} alt="pencil" className="mr-1" />
          <span className="text-base mr-1">코멘트 작성</span>
          <span className="text-base">(선택)</span>
        </Label>
        <div>
          <textarea
            id="pencil"
            className="bg-[#F9FAFB] px-3 py-[10px] w-full h-24 rounded-lg appearance-none focus:outline-none placeholder:text-xs text-xs"
            placeholder="운동에 대한 간단한 코멘트를 작성해주세요!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="flex items-center space-x-1 mb-2">
        <Image src={warning} alt="warning" className="-mt-4" />
        <label
          htmlFor="terms"
          className="font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs text-[#F87171] leading-4"
        >
          성의없는 운동인증은 이의제기를 받을 수 있습니다. 또한 운동인증은 하루
          최대 3번까지만 등록 가능합니다.
        </label>
      </div>
      <div className="bg-[#F3F4F6] min-h-80 h-full -mx-6">
        {workoutInfo.missions.map((item, i) => {
          const isLast = i === workoutInfo.missions.length - 1;
          return (
            <div
              key={item.id}
              className={`px-6 py-4 ${
                !isLast ? 'border-b' : null
              } border-white flex justify-between items-center`}
            >
              <div>
                <h3>{item.mission}</h3>
                <h5 className="text-xs font-light">{`${item.score}점`}</h5>
              </div>
              <div className="text-2xl mr-4">{item.count}</div>
            </div>
          );
        })}
      </div>
      <div className="w-full fixed bottom-10">
        <button
          className={`py-3 w-[90%] bg-main text-white
             rounded-full flex justify-center items-center text-base`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <ButtonLoading /> : <span>인증 등록하기</span>}
        </button>
      </div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent className="w-9/12 rounded-lg h-36 font-yungothic">
          <div className="text-center text-sm mt-4 mb-4">
            운동 인증을 등록했어요!
          </div>

          <div
            className="flex justify-around items-center border-t-[1px] -mx-6"
            onClick={() => router.push(`/workspace/${workspaceId}`)}
          >
            <div className="text-main py-3 px-12">yes</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
