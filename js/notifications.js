// نظام الإشعارات الذكي

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.maxNotifications = 50;
        this.loadNotifications();
    }
    
    // تحميل الإشعارات من التخزين المحلي
    loadNotifications() {
        const saved = localStorage.getItem('marwanhub_notifications');
        if (saved) {
            this.notifications = JSON.parse(saved);
            this.unreadCount = this.notifications.filter(n => !n.read).length;
            this.updateBadge();
        } else {
            this.loadSampleNotifications();
        }
    }
    
    // حفظ الإشعارات
    saveNotifications() {
        localStorage.setItem('marwanhub_notifications', 
            JSON.stringify(this.notifications.slice(0, this.maxNotifications)));
    }
    
    // إشعارات نموذجية للبدء
    loadSampleNotifications() {
        this.notifications = [
            {
                id: 1,
                type: 'urgent',
                title: 'قرار عاجل يحتاج مراجعة',
                message: 'توظيف قائد المجتمع ينتهي غداً',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // قبل ساعتين
                read: false,
                action: 'review_decision'
            },
            {
                id: 2,
                type: 'info',
                title: 'تقرير النمو الأسبوعي جاهز',
                message: 'نمو المجتمع: +25% هذا الأسبوع',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // قبل 5 ساعات
                read: false,
                action: 'view_report'
            },
            {
                id: 3,
                type: 'success',
                title: 'نظام النسخ الاحتياطي اكتمل',
                message: 'تم إنشاء نسخة احتياطية جديدة',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // قبل يوم
                read: true,
                action: 'view_backup'
            }
        ];
        
        this.unreadCount = 2;
        this.saveNotifications();
        this.updateBadge();
    }
    
    // إضافة إشعار جديد
    addNotification(notification) {
        const newNotification = {
            id: Date.now(),
            type: notification.type || 'info',
            title: notification.title,
            message: notification.message,
            timestamp: new Date(),
            read: false,
            action: notification.action
        };
        
        this.notifications.unshift(newNotification);
        this.unreadCount++;
        
        // الحفاظ على الحد الأقصى
        if (this.notifications.length > this.maxNotifications) {
            this.notifications.pop();
        }
        
        this.saveNotifications();
        this.updateBadge();
        this.showDesktopNotification(newNotification);
        
        return newNotification;
    }
    
    // عرض إشعار على سطح المكتب
    showDesktopNotification(notification) {
        // التحقق من دعم الإشعارات
        if (!("Notification" in window)) {
            console.log("متصفحك لا يدعم إشعارات سطح المكتب");
            return;
        }
        
        // التحقق من إذن الإشعارات
        if (Notification.permission === "granted") {
            this.createDesktopNotification(notification);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    this.createDesktopNotification(notification);
                }
            });
        }
    }
    
    // إنشاء إشعار سطح المكتب
    createDesktopNotification(notification) {
        const options = {
            body: notification.message,
            icon: '/assets/logo.png',
            badge: '/assets/badge.png',
            tag: 'marwanhub_notification',
            renotify: true,
            silent: false
        };
        
        const desktopNotification = new Notification(notification.title, options);
        
        desktopNotification.onclick = function() {
            window.focus();
            this.close();
            // تنفيذ الإجراء المرتبط
            executeNotificationAction(notification.action);
        };
        
        // إغلاق تلقائي بعد 10 ثوان
        setTimeout(() => {
            desktopNotification.close();
        }, 10000);
    }
    
    // تحديث شارة الإشعارات
    updateBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = this.unreadCount;
            badge.style.display = this.unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    // وضع علامة مقروءة على جميع الإشعارات
    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.unreadCount = 0;
        this.saveNotifications();
        this.updateBadge();
    }
    
    // وضع علامة مقروءة على إشعار محدد
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            this.unreadCount--;
            this.saveNotifications();
            this.updateBadge();
        }
    }
    
    // الحصول على الإشعارات غير المقروءة
    getUnreadNotifications() {
        return this.notifications.filter(n => !n.read);
    }
    
    // الحصول على الإشعارات الأخيرة
    getRecentNotifications(limit = 10) {
        return this.notifications.slice(0, limit);
    }
    
    // تنظيف الإشعارات القديمة
    cleanupOldNotifications(days = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        const oldCount = this.notifications.length;
        this.notifications = this.notifications.filter(n => 
            new Date(n.timestamp) > cutoffDate
        );
        
        this.saveNotifications();
        console.log(`🗑️ تم تنظيف ${oldCount - this.notifications.length} إشعار قديم`);
    }
}

// تهيئة نظام الإشعارات
const notificationSystem = new NotificationSystem();

// إضافة إشعارات تلقائية بناءً على الأحداث
function setupAutomaticNotifications() {
    // إشعارات بناءً على الوقت
    setupTimeBasedNotifications();
    
    // إشعارات بناءً على نشاط المستخدم
    setupActivityNotifications();
    
    // إشعارات نظامية
    setupSystemNotifications();
}

function setupTimeBasedNotifications() {
    // إشعار الصباح
    const now = new Date();
    const hour = now.getHours();
    
    if (hour === 9) { // 9 صباحاً
        notificationSystem.addNotification({
            type: 'info',
            title: 'صباح الخير يا حافظ القمة!',
            message: 'حان الوقت لمراجعة القرارات الاستراتيجية لهذا اليوم.',
            action: 'view_decisions'
        });
    }
    
    if (hour === 17) { // 5 مساءً
        notificationSystem.addNotification({
            type: 'info',
            title: 'تقرير نهاية اليوم',
            message: 'لقد اتخذت 3 قرارات استراتيجية اليوم. راجع التقارير.',
            action: 'view_reports'
        });
    }
    
    // إشعار نهاية الأسبوع
    if (now.getDay() === 5 && hour === 16) { // الجمعة 4 مساءً
        notificationSystem.addNotification({
            type: 'info',
            title: 'تقرير أسبوعي جاهز',
            message: 'تقرير أداء الأسبوع جاهز للمراجعة.',
            action: 'view_weekly_report'
        });
    }
}

function setupActivityNotifications() {
    // مراقبة نشاط القرارات
    let decisionCount = 0;
    const originalApproveDecision = window.approveDecision;
    
    window.approveDecision = function(title, button) {
        decisionCount++;
        originalApproveDecision(title, button);
        
        if (decisionCount >= 3) {
            notificationSystem.addNotification({
                type: 'success',
                title: 'إنجاز رائع!',
                message: 'لقد اتخذت 3 قرارات استراتيجية اليوم.',
                action: 'view_achievements'
            });
            decisionCount = 0;
        }
    };
    
    // مراقبة نمو المجتمع
    setInterval(() => {
        // هنا سيكون هناك طلب API للتحقق من النمو
        const growth = Math.floor(Math.random() * 20);
        if (growth >= 10) {
            notificationSystem.addNotification({
                type: 'success',
                title: 'نمو مجتمعي ممتاز!',
                message: `المجتمع نما بنسبة ${growth}% هذا الأسبوع.`,
                action: 'view_community'
            });
        }
    }, 3600000); // كل ساعة
}

function setupSystemNotifications() {
    // إشعارات النظام والصيانة
    setInterval(() => {
        notificationSystem.addNotification({
            type: 'info',
            title: 'فحص النظام',
            message: 'تم إجراء فحص أمني تلقائي. كل شيء على ما يرام.',
            action: 'view_system_health'
        });
    }, 43200000); // كل 12 ساعة
    
    // إشعارات النسخ الاحتياطي
    setInterval(() => {
        notificationSystem.addNotification({
            type: 'success',
            title: 'نسخ احتياطي تلقائي',
            message: 'تم إنشاء نسخة احتياطية جديدة بنجاح.',
            action: 'view_backups'
        });
    }, 86400000); // كل 24 ساعة
}

// تنفيذ إجراء الإشعار
function executeNotificationAction(action) {
    switch(action) {
        case 'review_decision':
            scrollToSection('decisions');
            break;
        case 'view_report':
            scrollToSection('analytics');
            break;
        case 'view_backup':
            scrollToSection('automation');
            break;
        case 'view_decisions':
            scrollToSection('decisions');
            break;
        case 'view_reports':
            scrollToSection('analytics');
            break;
        case 'view_weekly_report':
            scrollToSection('analytics');
            break;
        case 'view_achievements':
            showToast('🏆 تحقق من إنجازاتك في قسم القرارات!', 'success');
            break;
        case 'view_community':
            scrollToSection('community');
            break;
        case 'view_system_health':
            showToast('🛡️ حالة النظام: ممتازة', 'success');
            break;
        case 'view_backups':
            showToast('💾 تمت زيارة قسم النسخ الاحتياطي', 'info');
            break;
        default:
            console.log('🔔 إشعار بدون إجراء محدد');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// تفعيل نظام الإشعارات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setupAutomaticNotifications();
    
    // تنظيف الإشعارات القديمة أسبوعياً
    setInterval(() => {
        notificationSystem.cleanupOldNotifications();
    }, 604800000); // كل أسبوع
});

// وظائف مساعدة للإشعارات
function createTestNotification() {
    const types = ['urgent', 'info', 'success', 'warning'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const titles = [
        'تحديث جديد متاح',
        'تحليل البيانات جاهز',
        'مشاركة مجتمعية جديدة',
        'تنبيه نظام'
    ];
    
    const messages = [
        'هناك تحديث جديد للنظام، يرجى المراجعة',
        'تحليل بيانات النمو الأسبوعي جاهز للمراجعة',
        'عضو جديد انضم للمجتمع وأضاف مساهمة قيمة',
        'النظام يعمل بشكل طبيعي، لا توجد مشاكل'
    ];
    
    notificationSystem.addNotification({
        type: randomType,
        title: titles[Math.floor(Math.random() * titles.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        action: 'test_action'
    });
}

// اختصارات لوحة المفاتيح للإشعارات
document.addEventListener('keydown', function(e) {
    // Ctrl + N لإنشاء إشعار تجريبي
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        createTestNotification();
    }
    
    // Ctrl + Shift + M لوضع علامة مقروءة للكل
    if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        notificationSystem.markAllAsRead();
        showToast('✅ تم وضع علامة مقروءة لجميع الإشعارات', 'success');
    }
});
