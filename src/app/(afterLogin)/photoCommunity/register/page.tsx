'use client';

import { Label } from '@/components/ui/label';
import photo from '@/../public/svgs/workspace/photo.svg';
import pencil from '@/../public/svgs/workspace/pencil.svg';
import plus from '@/../public/svgs/plus.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import cancelPhoto from '@/../public/svgs/workspace/workout/cancelPhoto.svg';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

import { postFeed, s3PutPresifnedUrlsPhoto } from '@/api/photoCommunity';
import { compressingImage } from '@/utils/image/compressingImage';
import { AxiosError } from 'axios';
import { MyErrorResponse } from '@/types/error';
import ButtonLoading from '../../_components/ButtonLoading';

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [comment, setComment] = useState('');
  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const imageUrl = await s3PutPresifnedUrlsPhoto(imagePreview);

      try {
        const res = await postFeed(imageUrl, comment);

        if (res?.status === 200) {
          router.push(`/photoCommunity/${res.data.id}`);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        const axiosError = error as AxiosError<MyErrorResponse>;
        if (axiosError.response?.data?.errorCode === 'INVALID_STATE') {
          alert('에러!');
        } else {
          alert(
            axiosError?.response?.data?.message ||
              '알 수 없는 에러가 발생했습니다.',
          );
        }
      }
    } else {
      alert('이미지를 등록해주세요!');
    }
  };
  return (
    <div className="mt-4">
      <div className="text-2xl text-[#374151] font-yungothic font-semibold tracking-wider mb-6">
        <h1>운동 내용을</h1>
        <h1>커뮤니티에 공유해보세요!</h1>
      </div>
      <hr className="-mx-6 mb-6" />
      <div>
        <Label htmlFor="photo" className="flex items-center justify-start mb-2">
          <Image src={photo} alt="photo" className="mr-1" />
          <span className="text-base mr-1">사진 등록</span>
        </Label>
        <div
          className="w-24 h-24 bg-[#F9FAFB] rounded-lg flex justify-center items-center relative mb-5"
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
          <Input
            required
            id="photo"
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
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
      </div>
      <div className="w-full fixed bottom-10">
        <button
          className={`py-3 w-[90%]
             rounded-full flex justify-center items-center text-base ${
               imagePreview ? 'bg-main text-white' : 'text-main bg-[#EFF6FF]'
             }`}
          onClick={handleSubmit}
          disabled={imagePreview ? false : true || isLoading}
        >
          {isLoading ? <ButtonLoading /> : <span>업로드하기</span>}
        </button>
      </div>
    </div>
  );
}
