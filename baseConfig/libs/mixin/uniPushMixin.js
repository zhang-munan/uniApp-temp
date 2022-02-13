export default {
    data() {
        return {}
    },
    computed: {},
    methods: {
        /**
         * unipush初始化
         * @returns {Promise<void>}
         */
        initUniPushLaunch() {
            let self = this

            // 查询未读消息总数
            // self.getUnreadMessageCount()

            // #ifdef APP-PLUS
            // 绑定用户设备
            // self.bindUserCid();

            // 监听接收透传消息事件
            // plus.push.addEventListener('receive', function (msg) {
            //     self.getUnreadMessageCount()
            // }, false);
            // // 监听系统通知栏消息点击事件
            // plus.push.addEventListener('click', function (msg) {
            //     let payload = msg.payload
            //     self.messageRoutePage(payload.type, payload.page, payload.targetId, payload.userId)
            // }, false);
            // #endif
        },

        /**
         * 绑定用户设备
         */
        bindUserCid() {
            // 设备CID
            let cid = plus.push.getClientInfo().clientid
            if (cid) {
                this.$api.bindUserCid({
                    cid: cid
                })
            }
        },

        /**
         * 查询所有未读消息
         */
        getUnreadMessageCount() {
            let self = this

            this.$api.getUnreadMessageCount().then(res => {
                var thatView = getApp().globalData.thatView
                if (thatView && thatView.hasOwnProperty("unReadCount")) {
                    thatView.unReadCount = res.unreadCount
                }
                if (res.unreadCount) {
                    uni.setTabBarBadge({
                        index: 2,
                        text: res.unreadCount.toString()
                    })
                } else {
                    uni.removeTabBarBadge({
                        index: 2
                    })
                }
                setTimeout(function () {
                    self.getUnreadMessageCount()
                }, 5000)
                // 设置图标未读数量
                plus.runtime.setBadgeNumber(res.unreadCount);
            })
        },

        /**
         *查询通知权限是否开启
         */
        getNotificationAuthority() {
            let platform = uni.getSystemInfoSync().platform
            if (platform == 'ios') {
                //ios默认会有通知 不需要手动设置
            } else if (platform == 'android') {
                var main = plus.android.runtimeMainActivity();
                var pkName = main.getPackageName();
                var uid = main.getApplicationInfo().plusGetAttribute("uid");
                var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
                //android.support.v4升级为androidx
                if (NotificationManagerCompat == null) {
                    NotificationManagerCompat = plus.android.importClass("androidx.core.app.NotificationManagerCompat");
                }
                var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
                // 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置
                if (!areNotificationsEnabled) {
                    uni.showModal({
                        title: '通知权限开启提醒',
                        content: '您还没有开启通知权限，无法接受到消息通知，请前往设置！',
                        confirmText: '去设置',
                        success: function (res) {
                            if (res.confirm) {
                                var Intent = plus.android.importClass('android.content.Intent');
                                var Build = plus.android.importClass("android.os.Build");
                                //android 8.0引导
                                if (Build.VERSION.SDK_INT >= 26) {
                                    var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
                                    intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
                                } else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0
                                    var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
                                    intent.putExtra("app_package", pkName);
                                    intent.putExtra("app_uid", uid);
                                } else { //(<21)其他--跳转到该应用管理的详情页
                                    intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                                    var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
                                    intent.setData(uri);
                                }
                                // 跳转到该应用的系统通知设置页
                                main.startActivity(intent);
                            }
                        }
                    });
                }
            }
        }
    }
}
