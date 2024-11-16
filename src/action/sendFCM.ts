'use server';

import admin, { ServiceAccount } from 'firebase-admin';

interface NotificationData {
  title: string;
  body: string;
  image?: string;
  click_action?: string;
  token: string;
}

export const sendFCMNotification = async (data: NotificationData) => {
  const serviceAccount: ServiceAccount = {
    projectId: 'gymmi-a0438',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLzqarzyueDoFt\nJx27JQQ37VtYW0CXPn0sPTvpAgfHdZPoah0ygfR6LHTcU5jhjzsEhTg9e8jVjX29\nMsSHpBgVVZDNbi5qUfMNPTgAeCaAO2/j32uBBhxdcX1mQUNRKaQ+f7asLvwmhXBW\nm4MHGdl7bjvacE43x1Y4TcUOUr9X96s7PNhRYOhjDdGOmdOm3fjC9bv69I/rqXoN\n9lwNxysLpjKZ//TaEi84vjx/0w2VJn1FXCySctWwzAAvQniDS5u8E1peEywhQUmc\niCioDB9Ux7qkqrCBALYs7eGLAZZ++rpma6DVKyQwnnS7nMbxYkRDMieTHk69WLH+\n0WfJLbjzAgMBAAECggEACORjPSHkzJFyOrxXHa8/twkvZV8AF7k59+PFnlau1vva\nBZemwiJUnmkcCNStkt6y/1TFVMq934dmsDTWdDBdRNs+7Ga9byPGFQuDrn9Woc7g\nvX0XuEh3XD7MUpJQDIdUa3iMsN2C0lM4AdIFRzbekT1BhA1jV9I7R6Jh5yGxAPaG\nZddyBb/DYNE1WGMvsDfLzK107VURxSMVeXpqSSjPh07E9mydmy5gkRi1APv4vkC3\nyYmViv14lgontFOhan1xi4rKbvhPFZGl93Z7vWE5TTSvWmv5Fx4w/KI1U9Gb2das\nz1iWW1O1UlYjW3wfPyqRk+B84xVG1jhzLWaUBnui/QKBgQD8GxSg6CeXqPfIjCni\n0pzcwespb38nFcsiYWD2rMQZE0wyteAysJAzHPUq6NpWvaB9rQO5vN/Jc1nMuE0S\naJWf3umqxR8xxq94Wn7U4JOJFvvaqPTA72pSOsyaulx+QU2B+Sc7PDnFl33RwRiS\nCijN2UyoG3c53xgp+2NSKNUGtwKBgQDO9JSFCSNUU2SQIEH8QLIsfWUXqhK2vhYs\nke21UTdfnI6ZUU2rY9uRG6qZicsBAIbJIhz+Y654zHfMtg/ZGWzerG8CR5QpVoKP\nMzQwV7n2SwcwIKg/JHcmbgWBi0UnSqVrBOUQgdfmZAPhWY3QuT4fAf3SRV37l1qQ\nUDBQz1XDpQKBgQC+UKs39Um+Qb4cVUNhieEE/hdKxnLUzKz2nVCXp0C6NUk2lvpT\nCdsx2tBxvirlhG1dsni3hI/kAgJue0sjdHRPpfX8BqdP6k+YqahJh+eYfBNQtG9g\nHtzCisTeoYUlgqLCVZZ6LzLlqUFAUWb9CFJZY4ts9J8Cvxn8x1vpMA3w7QKBgBgz\noeqs1uTVm7z/CLhnGG77ewb5bJbSQ+WSayn5BXC47jQfveV9GAAwLBMoegTz+s8q\nnhlhrtWRk7Ds2Y2Z25FuuMybckgjRcFZS5EbsTOMMpr+Nq6rpQNpeltb3gpqQE3z\nlJYJmSXoLEv+HQd7ojgeE4Cze/ogCQc3WW8Zz/3BAoGASStYneX+In5105L4/axt\nANRgmaupiks8KVNwhWsXSgF4ahQ/Eu6a2TJ6lwMdMO6E1UvwAVLiPcI+NseJhrvs\nkGmjnSpUGCTEkVEFQp03EeFALVPVAJqlZSQo0HHx0D32z5gKGITmgEmKoNmX7ewJ\nxbCQty/+4157IwaeYIkgU9k=\n-----END PRIVATE KEY-----\n',
    clientEmail: 'firebase-adminsdk-c3siu@gymmi-a0438.iam.gserviceaccount.com',
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const message = {
    notification: {
      title: data.title,
      body: data.body,
      image: data.image,
    },
    data: {
      click_action: data.click_action || '/',
    },
    token: data.token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send FCM notification');
  }
};
