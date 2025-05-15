import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

export const setupFCMForegroundHandler = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Notifications par défaut',
    importance: AndroidImportance.HIGH,
    vibration: true,
    sound: 'default',
  });

  messaging().onMessage(async remoteMessage => {
    const title = remoteMessage.notification?.title ?? '📨 Notification';
    const body = remoteMessage.notification?.body ?? 'Tu as un nouveau message !';
    console.log("📩 Notification reçue en avant-plan :", remoteMessage);
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'default',
        pressAction: { id: 'default' },
        vibrationPattern: [200, 300],
        sound: 'default',
      },
    });
  });
};
