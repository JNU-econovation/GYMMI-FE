'use client';

import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseApp } from '@/utils/firebase/firebase';

const useSendPush = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey:
                'BA7IMG0FzL6yAX3F2fIQsirwLnul46MEvC0HGKbJt9aZQTLap647uLjLaS7VIDODY8fbVSiJ64u_Of0QXLKCk4E',
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log(
                'No registration token available. Request permission to generate one.',
              );
            }
          }
        }
      } catch (error) {
        console.log('An error occurred while retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useSendPush;
