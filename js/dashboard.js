// لوحة تحكم ماروان هوب - JavaScript الرئيسي

document.addEventListener('DOMContentLoaded', function() {
    console.log('👑 لوحة تحكم حافظ القمة جاهزة!');
    
    // تهيئة المكونات
    initSidebar();
    initSearch();
    initNotifications();
    initTimeFilters();
    initDecisionActions();
    initAutomationToggle();
    initFooterActions();
    
    // تحديث البيانات تلقائياً
    startAutoRefresh();
    
    // تحديث الوقت
    updateLiveTime();
    setInterval(updateLiveTime, 60000);
});

// تفعيل القائمة الجانبية
function initSidebar() {
    const menuItems = document.querySelectorAll('.menu-item');
    const currentSection = window.location.hash || '#vision';
    
    // تعيين العنصر النشط
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentSection) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);
                
                // تحديث العنصر النشط
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // وظيفة التمرير السلس
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// تفعيل البحث السريع
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length > 2) {
            performQuickSearch(query);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            e.preventDefault();
            showSearchResults(this.value);
        }
    });
}

function performQuickSearch(query) {
    // هنا يمكن إضافة منطق البحث الفعلي
    console.log(`🔍 البحث السريع عن: ${query}`);
    
    // عرض اقتراحات البحث (مثال)
    const suggestions = [
        'القرارات الاستراتيجية',
        'نمو المجتمع',
        'التحالفات',
        'التقارير',
        'الأنظمة الآلية'
    ];
    
    const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(query)
    );
    
    if (filtered.length > 0) {
        console.log('💡 اقتراحات:', filtered);
    }
}

function showSearchResults(query) {
    // في الواقع، سيتم توجيه المستخدم لصفحة نتائج البحث
    alert(`🔍 سيتم البحث عن: "${query}"\n(هذه نسخة تجريبية)`);
    document.querySelector('.search-input').value = '';
}

// تفعيل الإشعارات
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    if (!notificationBtn) return;
    
    notificationBtn.addEventListener('click', function() {
        showNotificationsPanel();
    });
    
    // تحديث عدد الإشعارات تلقائياً
    setInterval(updateNotificationCount, 30000);
}

function showNotificationsPanel() {
    // إنشاء لوحة الإشعارات
    const panel = document.createElement('div');
    panel.className = 'notifications-panel';
    panel.innerHTML = `
        <div class="notifications-header">
            <h4><i class="fas fa-bell"></i> الإشعارات (3)</h4>
            <button class="btn-close">&times;</button>
        </div>
        <div class="notifications-list">
            <div class="notification-item urgent">
                <div class="notification-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="notification-content">
                    <h5>قرار عاجل يحتاج مراجعة</h5>
                    <p>توظيف قائد المجتمع ينتهي غداً</p>
                    <span class="notification-time">⏰ قبل 2 ساعة</span>
                </div>
            </div>
            <div class="notification-item info">
                <div class="notification-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="notification-content">
                    <h5>تقرير النمو الأسبوعي جاهز</h5>
                    <p>نمو المجتمع: +25% هذا الأسبوع</p>
                    <span class="notification-time">⏰ اليوم 10:30</span>
                </div>
            </div>
            <div class="notification-item success">
                <div class="notification-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="notification-content">
                    <h5>نظام النسخ الاحتياطي اكتمل</h5>
                    <p>تم إنشاء نسخة احتياطية جديدة</p>
                    <span class="notification-time">⏰ أمس 02:00</span>
                </div>
            </div>
        </div>
        <div class="notifications-footer">
            <button class="btn-mark-read">✅ وضع علامة مقروءة للكل</button>
        </div>
    `;
    
    // الأنماط
    const style = document.createElement('style');
    style.textContent = `
        .notifications-panel {
            position: fixed;
            top: 70px;
            right: 20px;
            width: 350px;
            background: var(--bg-card);
            border-radius: var(--radius-lg);
            border: 1px solid #334155;
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            overflow: hidden;
        }
        
        .notifications-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-md);
            background: var(--bg-dark);
            border-bottom: 1px solid #334155;
        }
        
        .notifications-header h4 {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            margin: 0;
            color: var(--text-primary);
        }
        
        .btn-close {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .btn-close:hover {
            background-color: var(--danger-color);
            color: white;
        }
        
        .notifications-list {
            max-height: 400px;
            overflow-y: auto;
        }
        
        .notification-item {
            display: flex;
            gap: var(--space-md);
            padding: var(--space-md);
            border-bottom: 1px solid #334155;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .notification-item:hover {
            background-color: var(--bg-hover);
        }
        
        .notification-item.urgent {
            border-left: 4px solid var(--danger-color);
        }
        
        .notification-item.info {
            border-left: 4px solid var(--info-color);
        }
        
        .notification-item.success {
            border-left: 4px solid var(--success-color);
        }
        
        .notification-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .notification-item.urgent .notification-icon {
            background-color: rgba(239, 68, 68, 0.2);
            color: var(--danger-color);
        }
        
        .notification-item.info .notification-icon {
            background-color: rgba(59, 130, 246, 0.2);
            color: var(--info-color);
        }
        
        .notification-item.success .notification-icon {
            background-color: rgba(16, 185, 129, 0.2);
            color: var(--success-color);
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-content h5 {
            margin: 0 0 var(--space-xs) 0;
            color: var(--text-primary);
            font-size: 0.95rem;
        }
        
        .notification-content p {
            margin: 0 0 var(--space-xs) 0;
            color: var(--text-secondary);
            font-size: 0.85rem;
        }
        
        .notification-time {
            color: var(--text-muted);
            font-size: 0.8rem;
        }
        
        .notifications-footer {
            padding: var(--space-md);
            background: var(--bg-dark);
            border-top: 1px solid #334155;
        }
        
        .btn-mark-read {
            width: 100%;
            padding: var(--space-sm);
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            font-family: 'Cairo', sans-serif;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-mark-read:hover {
            background-color: var(--primary-dark);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(panel);
    
    // إغلاق اللوحة عند النقر على الزر
    panel.querySelector('.btn-close').addEventListener('click', function() {
        document.body.removeChild(panel);
    });
    
    // وضع علامة مقروءة
    panel.querySelector('.btn-mark-read').addEventListener('click', function() {
        updateNotificationBadge(0);
        document.body.removeChild(panel);
    });
    
    // إغلاق عند النقر خارج اللوحة
    document.addEventListener('click', function closePanel(e) {
        if (!panel.contains(e.target) && e.target !== notificationBtn) {
            document.body.removeChild(panel);
            document.removeEventListener('click', closePanel);
        }
    });
}

function updateNotificationCount() {
    // في الواقع، سيكون هناك طلب API
    const newCount = Math.floor(Math.random() * 5);
    updateNotificationBadge(newCount);
}

function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// تفعيل مرشحات الوقت
function initTimeFilters() {
    const filters = document.querySelectorAll('.time-filter');
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const period = this.textContent;
            updateChartsData(period);
        });
    });
}

function updateChartsData(period) {
    console.log(`📊 تحديث البيانات للفترة: ${period}`);
    // هنا سيتم تحديث الرسوم البيانية
    // سيكون هناك طلبات API حقيقية
}

// تفعيل إجراءات القرارات
function initDecisionActions() {
    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', function() {
            const decisionTitle = this.closest('.decision-card').querySelector('.decision-title').textContent;
            approveDecision(decisionTitle, this);
        });
    });
    
    document.querySelectorAll('.btn-review').forEach(btn => {
        btn.addEventListener('click', function() {
            const decisionTitle = this.closest('.decision-card').querySelector('.decision-title').textContent;
            requestReview(decisionTitle, this);
        });
    });
    
    document.querySelectorAll('.btn-deny').forEach(btn => {
        btn.addEventListener('click', function() {
            const decisionTitle = this.closest('.decision-card').querySelector('.decision-title').textContent;
            denyDecision(decisionTitle, this);
        });
    });
    
    document.querySelectorAll('.btn-delay').forEach(btn => {
        btn.addEventListener('click', function() {
            const decisionTitle = this.closest('.decision-card').querySelector('.decision-title').textContent;
            delayDecision(decisionTitle, this);
        });
    });
}

function approveDecision(title, button) {
    showToast(`✅ تم الموافقة على: "${title}"`, 'success');
    button.closest('.decision-card').style.opacity = '0.5';
    button.disabled = true;
    updateDashboardStats('decisionsApproved');
}

function requestReview(title, button) {
    showToast(`🤔 تم طلب مراجعة: "${title}"`, 'info');
    button.textContent = '⏳ جاري المراجعة';
    button.disabled = true;
}

function denyDecision(title, button) {
    if (confirm(`⚠️ هل أنت متأكد من رفض القرار: "${title}"؟`)) {
        showToast(`❌ تم رفض: "${title}"`, 'error');
        button.closest('.decision-card').remove();
        updateDashboardStats('decisionsDenied');
    }
}

function delayDecision(title, button) {
    showToast(`⏸️ تم تأجيل: "${title}" لمدة أسبوع`, 'warning');
    button.textContent = '📅 مؤجل';
    button.disabled = true;
}

// تفعيل تبديل الأنظمة الآلية
function initAutomationToggle() {
    const toggle = document.querySelector('.switch input');
    if (!toggle) return;
    
    toggle.addEventListener('change', function() {
        if (this.checked) {
            enableAllAutomation();
            showToast('🤖 تم تفعيل جميع الأنظمة الآلية', 'success');
        } else {
            disableAllAutomation();
            showToast('⏸️ تم إيقاف الأنظمة الآلية', 'warning');
        }
    });
}

function enableAllAutomation() {
    // تفعيل جميع الأنظمة
    document.querySelectorAll('.automation-card .status').forEach(status => {
        status.innerHTML = '<i class="fas fa-circle"></i> نشط';
        status.className = 'status active';
    });
    
    document.querySelectorAll('.btn-activate, .btn-configure').forEach(btn => {
        btn.style.display = 'none';
    });
}

function disableAllAutomation() {
    // إيقاف جميع الأنظمة
    document.querySelectorAll('.automation-card .status').forEach(status => {
        status.innerHTML = '<i class="fas fa-circle"></i> غير نشط';
        status.className = 'status inactive';
    });
    
    document.querySelectorAll('.btn-activate').forEach(btn => {
        btn.style.display = 'block';
    });
}

// تفعيل إجراءات الفوتر
function initFooterActions() {
    document.getElementById('exportData')?.addEventListener('click', exportDashboardData);
    document.getElementById('emergencyMeeting')?.addEventListener('click', startEmergencyMeeting);
}

function exportDashboardData() {
    showToast('📥 جاري تصدير البيانات...', 'info');
    
    // محاكاة تصدير البيانات
    setTimeout(() => {
        const data = {
            timestamp: new Date().toISOString(),
            stats: {
                communityGrowth: "+25%",
                stars: "75+",
                activeMembers: "100+",
                decisionsMade: "3"
            },
            decisions: document.querySelectorAll('.decision-card').length,
            alliances: document.querySelectorAll('.alliance-item').length,
            automation: document.querySelectorAll('.automation-card').length
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `marwanhub-dashboard-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('✅ تم تصدير البيانات بنجاح', 'success');
    }, 1000);
}

function startEmergencyMeeting() {
    if (confirm('🚨 بدء اجتماع طارئ مع الفريق القيادي؟')) {
        showToast('📞 جاري بدء الاجتماع الطارئ...', 'info');
        
        // محاكاة بدء اجتماع
        setTimeout(() => {
            const meetingUrl = 'https://meet.google.com/new?hs=197&authuser=0';
            window.open(meetingUrl, '_blank');
            showToast('🎯 الاجتماع جاهز، تم فتح علامة تبويب جديدة', 'success');
        }, 500);
    }
}

// التحديث التلقائي
function startAutoRefresh() {
    // تحديث البيانات كل 5 دقائق
    setInterval(() => {
        refreshDashboardData();
    }, 300000);
    
    // تحديث مؤشرات سريعة كل دقيقة
    setInterval(() => {
        updateQuickMetrics();
    }, 60000);
}

function refreshDashboardData() {
    console.log('🔄 تحديث بيانات اللوحة...');
    showToast('🔄 جاري تحديث البيانات...', 'info');
    
    // هنا ستكون طلبات API حقيقية
    setTimeout(() => {
        updateQuickMetrics();
        showToast('✅ تم تحديث البيانات', 'success');
    }, 1000);
}

function updateQuickMetrics() {
    // تحديث المؤشرات السريعة بشكل عشوائي (للتوضيح)
    const metrics = document.querySelectorAll('.quick-metric .metric-value');
    if (metrics.length >= 4) {
        metrics[0].textContent = Math.floor(Math.random() * 2000) + 1000;
        metrics[1].textContent = Math.floor(Math.random() * 30) + 10;
        metrics[2].textContent = Math.floor(Math.random() * 100) + 20;
        metrics[3].textContent = Math.floor(Math.random() * 10) + 1;
    }
}

// تحديث الوقت الحي
function updateLiveTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const dateString = now.toLocaleDateString('ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // تحديث الفوتر (مثال)
    const footer = document.querySelector('.footer-bottom p');
    if (footer) {
        const baseText = '© 2026 ماروان هوب - لوحة التحكم الذكية لحافظ القمة';
        footer.textContent = `${baseText} | ${dateString} ${timeString}`;
    }
}

// وظيفة عرض الإشعارات
function showToast(message, type = 'info') {
    // إنشاء عنصر الـ toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            ${getToastIcon(type)}
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    // الأنماط
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid #334155;
            border-left: 4px solid;
            border-radius: var(--radius-md);
            padding: var(--space-md);
            display: flex;
            align-items: center;
            gap: var(--space-md);
            z-index: 10000;
            box-shadow: var(--shadow-lg);
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .toast-success {
            border-left-color: var(--success-color);
        }
        
        .toast-warning {
            border-left-color: var(--warning-color);
        }
        
        .toast-error {
            border-left-color: var(--danger-color);
        }
        
        .toast-info {
            border-left-color: var(--info-color);
        }
        
        .toast-icon {
            font-size: 1.2rem;
        }
        
        .toast-success .toast-icon {
            color: var(--success-color);
        }
        
        .toast-warning .toast-icon {
            color: var(--warning-color);
        }
        
        .toast-error .toast-icon {
            color: var(--danger-color);
        }
        
        .toast-info .toast-icon {
            color: var(--info-color);
        }
        
        .toast-message {
            flex: 1;
            color: var(--text-primary);
        }
        
        .toast-close {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .toast-close:hover {
            background-color: var(--danger-color);
            color: white;
        }
    `;
    
    // إضافة الأنماط فقط إذا لم تكن موجودة
    if (!document.querySelector('#toast-styles')) {
        style.id = 'toast-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // إغلاق الـ toast
    toast.querySelector('.toast-close').addEventListener('click', function() {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
    
    // إغلاق تلقائي بعد 5 ثوان
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }, 5000);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return '✅';
        case 'warning': return '⚠️';
        case 'error': return '❌';
        case 'info': return 'ℹ️';
        default: return '💡';
    }
}

// تحديث إحصائيات اللوحة
function updateDashboardStats(statType) {
    console.log(`📈 تحديث إحصائيات: ${statType}`);
    // هنا سيتم تحديث الإحصائيات في قاعدة البيانات
}

// حدث تحميل الصفحة
window.addEventListener('load', function() {
    // تحميل الرسوم البيانية بعد تحميل الصفحة
    setTimeout(() => {
        if (typeof initCharts === 'function') {
            initCharts();
        }
    }, 1000);
    
    // إظهار رسالة ترحيب
    setTimeout(() => {
        showToast('👑 مرحباً حافظ القمة! لوحة التحكم جاهزة.', 'info');
    }, 2000);
});

// معالجة أخطاء الشبكة
window.addEventListener('offline', function() {
    showToast('⚠️ فقدت الاتصال بالإنترنت', 'error');
});

window.addEventListener('online', function() {
    showToast('✅ تم استعادة الاتصال بالإنترنت', 'success');
    refreshDashboardData();
});

// منع الإغلاق المفاجئ إذا كان هناك تغييرات غير محفوظة
window.addEventListener('beforeunload', function(e) {
    // يمكن التحقق مما إذا كانت هناك تغييرات غير محفوظة
    const hasUnsavedChanges = false; // سيتم تحديث هذا بناءً على حالة التطبيق
    
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'هناك تغييرات غير محفوظة. هل تريد المتابعة؟';
        return e.returnValue;
    }
});
