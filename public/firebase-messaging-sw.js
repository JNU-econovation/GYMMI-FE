importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

// Firebase 초기화
firebase.initializeApp({
  apiKey: 'AIzaSyB7c23HokEYKt5hyXt9nH2_Ojhw7hWuU9A',
  authDomain: 'gymmi-a0438.firebaseapp.com',
  projectId: 'gymmi-a0438',
  storageBucket: 'gymmi-a0438.appspot.com',
  messagingSenderId: '953459196581',
  appId: '1:953459196581:web:55732bc8a7e2a94e85834c',
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('[서비스 워커] 백그라운드 메시지 수신:', payload);
  const notificationTitle = payload.notification?.title || '알림';
  const notificationOptions = {
    body: payload.notification?.body || '내용 없음',
    icon: payload.notification?.icon || '/images/basicIcon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', (event) => {
  console.log('알림 클릭 이벤트 발생:', event);
  event.notification.close();
  const url = event.notification.data?.click_action || '/';
  event.waitUntil(clients.openWindow(url));
});
