import { ReactNode } from 'react';
import ReactQueryProvider from '@/app/(afterLogin)/_components/ReactQueryProvider';
import LoadingScreen from '@/app/(afterLogin)/_components/LoadingScreen';
import CheckAuth from '@/app/(afterLogin)/_components/CheckAuth';

//여기에서만 네브바 넣기 - 워크스페이스 부분,

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <ReactQueryProvider>
      <LoadingScreen />
      <CheckAuth />
      <div>
        <div>{children}</div>
      </div>
    </ReactQueryProvider>
  );
}
