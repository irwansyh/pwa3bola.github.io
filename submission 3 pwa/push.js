var webPush = require('web-push');
const vapidKeys = {
    "publicKey":"BM2pjG-ehJuykf8dMA5S-1YjPNclbHmdUPkxqw6tU-ktts-GZztjUAhLMtFrX-N67yhndbaYDtEss-IUjEu3q8M",
    "privateKey": "ZPU9EGPKSib1J2PSa7TNCyhhEUzw6ar4xGXSXB47ik8"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/ezHRpOSJ70U:APA91bGdpVErErVDFWcEtIVrzstbJqQ6VuVKtGhDvQaIaheE10R3oYzbu_I6wPz1a2mnPXflGQeylpQ2SLd3r0R9W_SzVf2vA6QuDr_r0OO45hKYbkz0AE543Jts_G-JINJsWyPPUAYz",
    "keys": {
        "p256dh": "BAy6DF30L5D9p50JaaFgRAHytg8bA/zFWk4b2O3ap42XHa61paSvOL1AzptcRVdtzKmwKVeCX6ZfvZeVGlpI5RE=",
        "auth": "gky3BSkNOCVzgOt2A5lOaA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '774449711438',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);