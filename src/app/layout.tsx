import type { Metadata, Viewport } from 'next';
import Head from 'next/head';
import './globals.css';
import localFont from 'next/font/local';
import AppInstallButton from '@/components/AppInstallButton';
import FCMComponent from '@/components/FCMComponent';

const APP_NAME = 'GYMMI';
const APP_DEFAULT_TITLE = 'GYMMI';
const APP_TITLE_TEMPLATE = 'GYMMI - PWA App';
const APP_DESCRIPTION = 'GYMMI is the BEST!';

// const inter = Inter({ subsets: ['latin'] });

const yungothic = localFont({
  src: '../../public/fonts/yungothic320.ttf',
  weight: '320',
  variable: '--font-yungothic',
});
const galmuri = localFont({
  src: '../../public/fonts/Galmuri9.ttf',
  weight: '320',
  variable: '--font-galmuri',
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    startupImage: { url: '../../public/images/splash.png', media: '?' },
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  themeColor: '#ffffff',
  icons: {
    other: [
      {
        rel: 'apple-touch-startup-image',
        url: '../../public/images/splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        url: '../../public/images/splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        url: '../../public/images/splash.png',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        url: '../../public/images/splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        url: '../../public/images/splash.png',
        media:
          '(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        url: '../../public/images/splash.png',
        media:
          '(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        rel: 'apple-touch-startup-image',
        url: '../../public/images/splash.png',
        media:
          '(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  viewportFit: 'cover',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kor" className={`${yungothic.variable} ${galmuri.variable}`}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link
          rel="preload"
          href="/fonts/Galmuri9.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </Head>

      <body>
        <FCMComponent />
        {children}
        {/* <AppInstallButton /> */}
      </body>
    </html>
  );
}
