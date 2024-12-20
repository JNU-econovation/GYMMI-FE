import { Loader2 } from 'lucide-react';

export default function ButtonLoading() {
  // 로딩중 스핀바 띄우기
  return (
    <div className="w-full flex justify-center items-center">
      <Loader2 color="white" className="animate-spin text-white" />
    </div>
  );
}
