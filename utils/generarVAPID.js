import webpush from 'web-push';

const vapidKeys = webpush.generateVAPIDKeys();

console.log('VAPID PUBLIC KEY:', vapidKeys.publicKey);
console.log('VAPID PRIVATE KEY:', vapidKeys.privateKey);
