import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { GET_CALENDAR_APPOINTMENT_ACTION, GET_LIST_NOTIFICATION_ACTION } from "../../apis/redux/actions";
import { Linking, Platform } from "react-native";
import { store } from "../../apis";
import { NavigationService } from "../../navigations";

class NotificationServices {

    // Check device permission
    async checkPermission() {

        const enabled = await messaging().hasPermission();
        if (enabled === 1) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    // Get device registration token
    async getToken() {

        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            await messaging().deleteToken();
            await messaging().getToken().then( async function(fcmToken){
                if (fcmToken) {
                    console.log("[FCM Token] : ", fcmToken);
                    await AsyncStorage.setItem('fcmToken', fcmToken);
                }
            }).catch(err => console.log(err))
        } else {
            console.log("[FCM Token] : ", fcmToken);
        }
    }

    // Get refresh device registration token
    async refreshToken() {
        
        await AsyncStorage.removeItem('fcmToken');
        await messaging().deleteToken();
        await messaging().getToken(true).then( async function(fcmToken){
            if (fcmToken) {
                console.log("[FCM Token (Refresh)] : ", fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }).catch(err => console.log(err))
    }

    // Get IOS automatic device registration token
    async registerIOSAPP() {

        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true)
        }
    }

    // Request device permisson for notification
    async requestPermission() {

        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            this.getToken();
        } else {
            console.log('permission rejected with status : ', enabled);
        }
    }

    // Set background / Killed state notification receiver
    async backgroundNotificationListener(){

        messaging().setBackgroundMessageHandler((payload) => {
            // Linking.openURL('com.zenwel.personnel://');
            // console.log("handling background message : ", payload)
        });
    }
    
    // Set fore ground notification receiver
    async foreGroundNotificationListener(){
        messaging().onMessage(async remoteMessage => {

            if(remoteMessage?.data){

                console.log('[NOTIFICATION DATA]: ', remoteMessage.data);

                store.dispatch(GET_LIST_NOTIFICATION_ACTION({}, null, true));
                store.dispatch(GET_CALENDAR_APPOINTMENT_ACTION(undefined, undefined, undefined, undefined, true));

                PushNotification.localNotification({
                    channelId: "Personnel",
                    title: remoteMessage.notification.title,
                    message: remoteMessage.notification.body,
                    messageId: remoteMessage.messageId,
                    playSound: true,
                    vibrate: true,
                    ignoreInForeground: false,
                    autoCancel: true,
                    userInteraction: true,
                    data: remoteMessage,
                    userInfo: {
                        id: remoteMessage.messageId,
                        item: remoteMessage
                    }
                });
            }
        });
    }
    
    // Get notification when tap from killed app
    async getInitialNotification() {

        messaging().getInitialNotification().then(remoteMessage => this.notificationEncapsulationHandler(remoteMessage))
    }

    // Get notification when tap from foreground or background
    async getNotificationOpened() {

        messaging().onNotificationOpenedApp(remoteMessage => this.notificationEncapsulationHandler(remoteMessage))
    }
    
    // Notification data encapsulation handler
    async notificationEncapsulationHandler(remoteMessage) {

        setTimeout(async function(){
            
            if(remoteMessage && remoteMessage?.data){
                const {data: {type_reference_id, type}} = remoteMessage
                
                let pars = {}
                if (type === '5') {
                    pars = await JSON.parse(type_reference_id)            
                }

                const params = {
                    appointment_id: type === 1 ? type_reference_id : pars.session_id,
                    type: type === '1' ? 'S' : 'C',
                    session_date: pars.date || '',
                    is_class: type === '5'
                }

                NavigationService.navigate('APPOINTMENT_NAVIGATOR', {screen: 'DETAIL_APPOINTMENT_SCREEN', params})
            }
        }, 200);
    }

    // Class main function to start notification services configuration
    configure = (encapsulationNotification = this.notificationEncapsulationHandler) => {

        // Configurations
        PushNotification.configure({
        
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
            onNotification: function (notification) {

                console.log('[NOTIFICATION] : ')
                console.warn(notification.data);

                // Handle on notification opened IOS
                if (!notification?.data) {
                    return null;
                }
                if (Platform.OS === 'ios') {
                    notification.userInteraction = true;
                    encapsulationNotification(notification.data.item);
                    notification.finish(PushNotificationIOS.FetchResult.NoData)
                }
            },
        })
        PushNotification.createChannel({channelId: "Personnel", channelName: "DefaultChannel"});

        // Start service ...
        this.registerIOSAPP()
        this.checkPermission();
        this.backgroundNotificationListener();
        this.getInitialNotification();
        this.foreGroundNotificationListener();
        this.getNotificationOpened();
    }
}

const NotificationService = new NotificationServices();

export default NotificationService;