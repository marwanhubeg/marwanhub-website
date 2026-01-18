// نظام الأنظمة الآلية

class AutomationSystem {
    constructor() {
        this.systems = {};
        this.intervalIds = {};
        this.loadAutomationState();
    }
    
    // تحميل حالة الأنظمة
    loadAutomationState() {
        const saved = localStorage.getItem('marwanhub_automation');
        if (saved) {
            this.systems = JSON.parse(saved);
        } else {
            this.initializeDefaultSystems();
        }
    }
    
    // حفظ حالة الأنظمة
    saveAutomationState() {
        localStorage.setItem('marwanhub_automation', JSON.stringify(this.systems));
    }
    
    // تهيئة الأنظمة الافتراضية
    initializeDefaultSystems() {
        this.systems = {
            security: {
                name: 'نظام الأمان التلقائي',
                enabled: true,
                interval: 7200000, // كل ساعتين
                lastRun: null,
                nextRun: null
            },
            backup: {
                name: 'نظام النسخ الاحتياطي',
                enabled: true,
                interval: 86400000, // يومياً
                lastRun: null,
                nextRun: null
            },
            reporting: {
                name: 'نظام التقارير',
                enabled: false,
                interval: 604800000, // أسبوعياً
                lastRun: null,
                nextRun: null
            },
            community: {
                name: 'نظام التفاعل المجتمعي',
                enabled: false,
                interval: 3600000, // كل ساعة
                lastRun: null,
                nextRun: null
            },
            cleanup: {
                name: 'نظام التنظيف التلقائي',
                enabled: true,
                interval: 43200000, // كل 12 ساعة
                lastRun: null,
                nextRun: null
            },
            monitoring: {
                name: 'نظام المراقبة',
                enabled: true,
                interval: 300000, // كل 5 دقائق
                lastRun: null,
                nextRun: null
            }
        };
        
        this.saveAutomationState();
        this.scheduleAllSystems();
    }
    
    // تفعيل نظام معين
    enableSystem(systemId) {
        if (this.systems[systemId]) {
            this.systems[systemId].enabled = true;
            this.scheduleSystem(systemId);
            this.saveAutomationState();
            this.updateUI();
            return true;
        }
        return false;
    }
    
    // تعطيل نظام معين
    disableSystem(systemId) {
        if (this.systems[systemId]) {
            this.systems[systemId].enabled = false;
            this.unscheduleSystem(systemId);
            this.saveAutomationState();
            this.updateUI();
            return true;
        }
        return false;
    }
    
    // جدولة جميع الأنظمة
    scheduleAllSystems() {
        Object.keys(this.systems).forEach(systemId => {
            if (this.systems[systemId].enabled) {
                this.scheduleSystem(systemId);
            }
        });
    }
    
    // جدولة نظام معين
    scheduleSystem(systemId) {
        const system = this.systems[systemId];
        if (!system || !system.enabled) return;
        
        // إلغاء الجدولة السابقة إن وجدت
        this.unscheduleSystem(systemId);
        
        // جدولة جديدة
        this.intervalIds[systemId] = setInterval(() => {
            this.runSystem(systemId);
        }, system.interval);
        
        // تشغيل النظام الآن أول مرة
        setTimeout(() => {
            this.runSystem(systemId);
        }, 1000);
    }
    
    // إلغاء جدولة نظام
    unscheduleSystem(systemId) {
        if (this.intervalIds[systemId]) {
            clearInterval(this.intervalIds[systemId]);
            delete this.intervalIds[systemId];
        }
    }
    
    // تشغيل نظام معين
    runSystem(systemId) {
        const system = this.systems[systemId];
        if (!system || !system.enabled) return;
        
        console.log(`🤖 تشغيل النظام: ${system.name}`);
        
        // تحديث وقت التشغيل
        system.lastRun = new Date().toISOString();
        system.nextRun = new Date(Date.now() + system.interval).toISOString();
        this.saveAutomationState();
        
        // تنفيذ النظام المحدد
        switch(systemId) {
            case 'security':
                this.runSecuritySystem();
                break;
            case 'backup':
                this.runBackupSystem();
                break;
            case 'reporting':
                this.runReportingSystem();
                break;
            case 'community':
                this.runCommunitySystem();
                break;
            case 'cleanup':
                this.runCleanupSystem();
                break;
            case 'monitoring':
                this.runMonitoringSystem();
                break;
        }
        
        this.updateUI();
    }
    
    // نظام الأمان التلقائي
    async runSecuritySystem() {
        try {
            // فحص التحديثات الأمنية
            const updates = await this.checkSecurityUpdates();
            
            // فحص الثغرات
            const vulnerabilities = await this.scanVulnerabilities();
            
            // فحص الأذونات
            const permissions = await this.checkPermissions();
            
            // تسجيل النتائج
            const report = {
                timestamp: new Date().toISOString(),
                updates: updates,
                vulnerabilities: vulnerabilities,
                permissions: permissions,
                status: 'completed'
            };
            
            console.log('🛡️ تقرير الأمان:', report);
            
            // إشعار إذا كانت هناك مشاكل
            if (vulnerabilities.length > 0 || updates.length > 0) {
                this.showSecurityAlert(updates, vulnerabilities);
            }
            
        } catch (error) {
            console.error('❌ خطأ في نظام الأمان:', error);
        }
    }
    
    // نظام النسخ الاحتياطي
    async runBackupSystem() {
        try {
            console.log('💾 بدء النسخ الاحتياطي...');
            
            // إنشاء نسخة احتياطية للبيانات
            const backupData = {
                timestamp: new Date().toISOString(),
                systems: this.systems,
                dashboardStats: this.collectDashboardStats(),
                decisions: this.collectDecisions(),
                alliances: this.collectAlliances()
            };
            
            // حفظ محلي
            this.saveLocalBackup(backupData);
            
            // محاولة الحفظ على السحابة
            await this.tryCloudBackup(backupData);
            
            console.log('✅ اكتمل النسخ الاحتياطي');
            
            // إشعار النجاح
            if (typeof showToast === 'function') {
                showToast('💾 تم إنشاء نسخة احتياطية جديدة', 'success');
            }
            
        } catch (error) {
            console.error('❌ خطأ في النسخ الاحتياطي:', error);
        }
    }
    
    // نظام التقارير
    async runReportingSystem() {
        try {
            console.log('📊 إنشاء التقارير الأسبوعية...');
            
            // جمع البيانات
            const reportData = {
                weeklyGrowth: this.calculateWeeklyGrowth(),
                communityActivity: this.analyzeCommunityActivity(),
                decisionMetrics: this.analyzeDecisionMetrics(),
                systemHealth: this.checkSystemHealth(),
                recommendations: this.generateRecommendations()
            };
            
            // إنشاء التقرير
            const report = this.generateWeeklyReport(reportData);
            
            // حفظ التقرير
            this.saveReport(report);
            
            // إرسال الإشعار
            this.notifyReportReady(report);
            
        } catch (error) {
            console.error('❌ خطأ في نظام التقارير:', error);
        }
    }
    
    // نظام التفاعل المجتمعي
    async runCommunitySystem() {
        try {
            console.log('👥 تفعيل التفاعل المجتمعي...');
            
            // تحليل نشاط المجتمع
            const activity = await this.analyzeCommunityActivity();
            
            // تحديد الأعضاء النشطين
            const activeMembers = this.identifyActiveMembers(activity);
            
            // تحديد الأعضاء الذين يحتاجون متابعة
            const membersNeedingAttention = this.identifyMembersNeedingAttention(activity);
            
            // تنفيذ إجراءات التفاعل
            await this.executeCommunityActions(activeMembers, membersNeedingAttention);
            
        } catch (error) {
            console.error('❌ خطأ في نظام المجتمع:', error);
        }
    }
    
    // نظام التنظيف التلقائي
    async runCleanupSystem() {
        try {
            console.log('🧹 بدء التنظيف التلقائي...');
            
            // تنظيف السجلات القديمة
            this.cleanOldLogs();
            
            // تنظيف البيانات المؤقتة
            this.cleanTempData();
            
            // تنظيف الذاكرة المؤقتة
            this.clearCaches();
            
            // تحسين قاعدة البيانات
            await this.optimizeDatabase();
            
            console.log('✅ اكتمل التنظيف التلقائي');
            
        } catch (error) {
            console.error('❌ خطأ في نظام التنظيف:', error);
        }
    }
    
    // نظام المراقبة
    async runMonitoringSystem() {
        try {
            // مراقبة أداء النظام
            const performance = this.monitorPerformance();
            
            // مراقبة استخدام الموارد
            const resourceUsage = this.monitorResourceUsage();
            
            // مراقبة الأخطاء
            const errors = this.monitorErrors();
            
            // مراقبة النمو
            const growth = this.monitorGrowth();
            
            // إذا كانت هناك مشاكل حرجة
            if (this.hasCriticalIssues(performance, resourceUsage, errors)) {
                this.sendEmergencyAlert(performance, resourceUsage, errors);
            }
            
            // حفظ بيانات المراقبة
            this.saveMonitoringData({ performance, resourceUsage, errors, growth });
            
        } catch (error) {
            console.error('❌ خطأ في نظام المراقبة:', error);
        }
    }
    
    // وظائف مساعدة
    async checkSecurityUpdates() {
        // محاكاة فحص التحديثات
        return new Promise(resolve => {
            setTimeout(() => {
                const updates = Math.random() > 0.7 ? [
                    { package: 'express', version: '4.18.0', severity: 'medium' },
                    { package: 'lodash', version: '4.17.21', severity: 'low' }
                ] : [];
                resolve(updates);
            }, 500);
        });
    }
    
    async scanVulnerabilities() {
        // محاكاة فحص الثغرات
        return new Promise(resolve => {
            setTimeout(() => {
                const vulnerabilities = Math.random() > 0.8 ? [
                    { id: 'CVE-2023-1234', severity: 'high', affected: 'package-a' },
                    { id: 'CVE-2023-5678', severity: 'medium', affected: 'package-b' }
                ] : [];
                resolve(vulnerabilities);
            }, 500);
        });
    }
    
    async checkPermissions() {
        // محاكاة فحص الأذونات
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    files: 'secure',
                    database: 'secure',
                    api: 'secure'
                });
            }, 300);
        });
    }
    
    showSecurityAlert(updates, vulnerabilities) {
        const message = [];
        
        if (updates.length > 0) {
            message.push(`${updates.length} تحديث أمني متاح`);
        }
        
        if (vulnerabilities.length > 0) {
            message.push(`${vulnerabilities.length} ثغرة أمنية تحتاج معالجة`);
        }
        
        const alertMessage = `🛡️ تنبيه أمني: ${message.join('، ')}`;
        
        if (typeof showToast === 'function') {
            showToast(alertMessage, 'warning');
        }
        
        // إضافة إشعار للنظام
        if (typeof notificationSystem !== 'undefined') {
            notificationSystem.addNotification({
                type: 'warning',
                title: 'تنبيه أمني',
                message: alertMessage,
                action: 'view_system_health'
            });
        }
    }
    
    collectDashboardStats() {
        // جمع إحصائيات اللوحة
        return {
            timestamp: new Date().toISOString(),
            pageViews: Math.floor(Math.random() * 1000) + 500,
            activeUsers: Math.floor(Math.random() * 100) + 50,
            decisionsMade: document.querySelectorAll('.decision-card').length,
            alliances: document.querySelectorAll('.alliance-item').length
        };
    }
    
    collectDecisions() {
        // جمع بيانات القرارات
        const decisions = [];
        document.querySelectorAll('.decision-card').forEach(card => {
            decisions.push({
                title: card.querySelector('.decision-title')?.textContent || 'قرار',
                status: card.querySelector('.decision-priority')?.textContent || 'معلّق',
                timestamp: new Date().toISOString()
            });
        });
        return decisions;
    }
    
    collectAlliances() {
        // جمع بيانات التحالفات
        const alliances = [];
        document.querySelectorAll('.alliance-item').forEach(item => {
            alliances.push({
                name: item.querySelector('h5')?.textContent || 'تحالف',
                status: item.querySelector('.alliance-status')?.textContent || 'نشط'
            });
        });
        return alliances;
    }
    
    saveLocalBackup(data) {
        const timestamp = new Date().toISOString().split('T')[0];
        const backupKey = `marwanhub_backup_${timestamp}`;
        
        try {
            localStorage.setItem(backupKey, JSON.stringify(data));
            console.log(`💾 تم حفظ النسخة الاحتياطية محلياً: ${backupKey}`);
        } catch (error) {
            console.error('❌ فشل حفظ النسخة الاحتياطية محلياً:', error);
        }
    }
    
    async tryCloudBackup(data) {
        // محاكاة النسخ الاحتياطي على السحابة
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% نجاح
                    console.log('☁️ تم رفع النسخة الاحتياطية للسحابة');
                    resolve(true);
                } else {
                    console.warn('⚠️ فشل رفع النسخة الاحتياطية للسحابة');
                    reject(new Error('فشل الاتصال بالسحابة'));
                }
            }, 1000);
        });
    }
    
    calculateWeeklyGrowth() {
        // محاكاة حساب النمو الأسبوعي
        return {
            community: Math.floor(Math.random() * 30) + 10, // 10-40%
            engagement: Math.floor(Math.random() * 25) + 5, // 5-30%
            decisions: Math.floor(Math.random() * 10) + 1  // 1-10
        };
    }
    
    analyzeCommunityActivity() {
        // محاكاة تحليل نشاط المجتمع
        return {
            activeMembers: Math.floor(Math.random() * 50) + 20,
            newPosts: Math.floor(Math.random() * 30) + 5,
            interactions: Math.floor(Math.random() * 200) + 50,
            peakTime: '19:00-21:00'
        };
    }
    
    analyzeDecisionMetrics() {
        // محاكاة تحليل مقاييس القرارات
        return {
            total: document.querySelectorAll('.decision-card').length,
            approved: document.querySelectorAll('.btn-approve:disabled').length,
            pending: document.querySelectorAll('.btn-approve:not(:disabled)').length,
            avgDecisionTime: '2.5 أيام'
        };
    }
    
    checkSystemHealth() {
        // محاكاة فحص صحة النظام
        return {
            status: 'healthy',
            uptime: '99.9%',
            responseTime: '120ms',
            lastIncident: 'لا توجد'
        };
    }
    
    generateRecommendations() {
        // محاكاة إنشاء توصيات
        return [
            'زيادة التفاعل مع المجتمع في ساعات الذروة',
            'تسريع عملية اتخاذ القرارات',
            'التواصل مع 3 شركاء جدد هذا الأسبوع'
        ];
    }
    
    generateWeeklyReport(data) {
        return {
            title: `تقرير أداء أسبوعي - ${new Date().toISOString().split('T')[0]}`,
            period: 'الأسبوع الماضي',
            summary: `النمو: ${data.weeklyGrowth.community}% | النشاط: ${data.communityActivity.activeMembers} عضو نشط`,
            details: data,
            generatedAt: new Date().toISOString()
        };
    }
    
    saveReport(report) {
        const reportKey = `weekly_report_${new Date().toISOString().split('T')[0]}`;
        try {
            localStorage.setItem(reportKey, JSON.stringify(report));
            console.log(`📊 تم حفظ التقرير: ${reportKey}`);
        } catch (error) {
            console.error('❌ فشل حفظ التقرير:', error);
        }
    }
    
    notifyReportReady(report) {
        if (typeof notificationSystem !== 'undefined') {
            notificationSystem.addNotification({
                type: 'info',
                title: 'تقرير أسبوعي جاهز',
                message: report.summary,
                action: 'view_weekly_report'
            });
        }
    }
    
    async identifyActiveMembers(activity) {
        // محاكاة تحديد الأعضاء النشطين
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'عضو 1', contributions: 15 },
                    { id: 2, name: 'عضو 2', contributions: 12 },
                    { id: 3, name: 'عضو 3', contributions: 8 }
                ]);
            }, 300);
        });
    }
    
    async identifyMembersNeedingAttention(activity) {
        // محاكاة تحديد الأعضاء الذين يحتاجون متابعة
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 4, name: 'عضو جديد', lastActive: '3 أيام' },
                    { id: 5, name: 'عضو قليل النشاط', contributions: 1 }
                ]);
            }, 300);
        });
    }
    
    async executeCommunityActions(activeMembers, membersNeedingAttention) {
        // محاكاة تنفيذ إجراءات المجتمع
        console.log('👥 تنفيذ إجراءات المجتمع:', {
            activeMembers: activeMembers.length,
            membersNeedingAttention: membersNeedingAttention.length
        });
        
        // هنا ستكون هناك طلبات API حقيقية
    }
    
    cleanOldLogs() {
        // تنظيف السجلات القديمة
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const keysToRemove = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('log_')) {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (item.timestamp && new Date(item.timestamp).getTime() < oneWeekAgo) {
                        keysToRemove.push(key);
                    }
                } catch (e) {
                    // تجاهل العناصر غير الصالحة
                }
            }
        }
        
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        console.log(`🗑️ تم تنظيف ${keysToRemove.length} سجل قديم`);
    }
    
    cleanTempData() {
        // تنظيف البيانات المؤقتة
        const tempKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('temp_') || key.includes('_cache')) {
                tempKeys.push(key);
            }
        }
        
        tempKeys.forEach(key => {
            localStorage.removeItem(key);
        });
        
        console.log(`🗑️ تم تنظيف ${tempKeys.length} عنصر مؤقت`);
    }
    
    clearCaches() {
        // مسح الذاكرة المؤقتة
        if ('caches' in window) {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    caches.delete(cacheName);
                });
                console.log(`🗑️ تم مسح ${cacheNames.length} ذاكرة تخزين مؤقت`);
            });
        }
    }
    
    async optimizeDatabase() {
        // محاكاة تحسين قاعدة البيانات
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('⚡ تم تحسين قاعدة البيانات');
                resolve();
            }, 500);
        });
    }
    
    monitorPerformance() {
        // مراقبة الأداء
        return {
            loadTime: performance.now().toFixed(2) + 'ms',
            memory: (performance.memory?.usedJSHeapSize / 1048576).toFixed(2) + 'MB',
            fps: 60,
            requests: performance.getEntriesByType('resource').length
        };
    }
    
    monitorResourceUsage() {
        // مراقبة استخدام الموارد
        return {
            cpu: 'low',
            memory: 'normal',
            storage: 'adequate',
            network: 'stable'
        };
    }
    
    monitorErrors() {
        // مراقبة الأخطاء
        return [];
    }
    
    monitorGrowth() {
        // مراقبة النمو
        return {
            daily: Math.floor(Math.random() * 20) + 5,
            weekly: Math.floor(Math.random() * 100) + 30,
            monthly: Math.floor(Math.random() * 400) + 150
        };
    }
    
    hasCriticalIssues(performance, resourceUsage, errors) {
        // التحقق من وجود مشاكل حرجة
        const memoryUsage = parseFloat(performance.memory);
        return memoryUsage > 500 || errors.length > 5 || resourceUsage.cpu === 'high';
    }
    
    sendEmergencyAlert(performance, resourceUsage, errors) {
        const alertMessage = `🚨 تنبيه نظام: استخدام ذاكرة عالي (${performance.memory})`;
        
        if (typeof showToast === 'function') {
            showToast(alertMessage, 'error');
        }
        
        if (typeof notificationSystem !== 'undefined') {
            notificationSystem.addNotification({
                type: 'urgent',
                title: 'تنبيه نظام حرج',
                message: alertMessage,
                action: 'view_system_health'
            });
        }
    }
    
    saveMonitoringData(data) {
        const monitoringKey = `monitoring_${new Date().toISOString().split('T')[0]}_${Date.now()}`;
        try {
            localStorage.setItem(monitoringKey, JSON.stringify(data));
        } catch (error) {
            console.error('❌ فشل حفظ بيانات المراقبة:', error);
        }
    }
    
    // تحديث واجهة المستخدم
    updateUI() {
        // تحديث حالة الأنظمة في الواجهة
        Object.keys(this.systems).forEach(systemId => {
            const system = this.systems[systemId];
            const statusElement = document.querySelector(`.automation-card:has(h4:contains('${system.name}')) .status`);
            
            if (statusElement) {
                if (system.enabled) {
                    statusElement.innerHTML = '<i class="fas fa-circle"></i> نشط';
                    statusElement.className = 'status active';
                    
                    // تحديث وقت التشغيل الأخير
                    const lastRunElement = statusElement.nextElementSibling;
                    if (lastRunElement && lastRunElement.classList.contains('last-run')) {
                        if (system.lastRun) {
                            const lastRun = new Date(system.lastRun);
                            const now = new Date();
                            const diff = Math.floor((now - lastRun) / 60000); // دقائق
                            
                            if (diff < 60) {
                                lastRunElement.textContent = `⏱️ قبل ${diff} دقيقة`;
                            } else if (diff < 1440) {
                                lastRunElement.textContent = `⏱️ قبل ${Math.floor(diff / 60)} ساعة`;
                            } else {
                                lastRunElement.textContent = `⏱️ قبل ${Math.floor(diff / 1440)} يوم`;
                            }
                        }
                    }
                } else {
                    statusElement.innerHTML = '<i class="fas fa-circle"></i> غير نشط';
                    statusElement.className = 'status inactive';
                }
            }
            
            // إخفاء/إظهار أزرار التفعيل
            const button = document.querySelector(`.automation-card:has(h4:contains('${system.name}')) .btn-activate, 
                                                 .automation-card:has(h4:contains('${system.name}')) .btn-configure`);
            if (button) {
                button.style.display = system.enabled ? 'none' : 'block';
            }
        });
    }
    
    // الحصول على حالة جميع الأنظمة
    getSystemsStatus() {
        return Object.keys(this.systems).map(systemId => ({
            id: systemId,
            ...this.systems[systemId]
        }));
    }
    
    // تشغيل جميع الأنظمة
    enableAllSystems() {
        Object.keys(this.systems).forEach(systemId => {
            this.enableSystem(systemId);
        });
        return true;
    }
    
    // إيقاف جميع الأنظمة
    disableAllSystems() {
        Object.keys(this.systems).forEach(systemId => {
            this.disableSystem(systemId);
        });
        return true;
    }
    
    // تشغيل نظام محدد يدوياً
    runSystemManually(systemId) {
        if (this.systems[systemId]) {
            this.runSystem(systemId);
            return true;
        }
        return false;
    }
}

// تهيئة نظام الأنظمة الآلية
const automationSystem = new AutomationSystem();

// تفعيل النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ربط تبديل الأنظمة الآلية
    const toggle = document.querySelector('.switch input');
    if (toggle) {
        toggle.checked = automationSystem.getSystemsStatus().filter(s => s.enabled).length > 0;
        
        toggle.addEventListener('change', function() {
            if (this.checked) {
                automationSystem.enableAllSystems();
                if (typeof showToast === 'function') {
                    showToast('🤖 تم تفعيل جميع الأنظمة الآلية', 'success');
                }
            } else {
                automationSystem.disableAllSystems();
                if (typeof showToast === 'function') {
                    showToast('⏸️ تم إيقاف الأنظمة الآلية', 'warning');
                }
            }
        });
    }
    
    // ربط أزرار التفعيل
    document.querySelectorAll('.btn-activate').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.automation-card');
            const systemName = card.querySelector('h4').textContent;
            
            // البحث عن معرف النظام من الاسم
            const systemId = Object.keys(automationSystem.systems).find(id => 
                automationSystem.systems[id].name === systemName
            );
            
            if (systemId) {
                automationSystem.enableSystem(systemId);
                if (typeof showToast === 'function') {
                    showToast(`✅ تم تفعيل ${systemName}`, 'success');
                }
            }
        });
    });
    
    // ربط أزرار الإعداد
    document.querySelectorAll('.btn-configure').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.automation-card');
            const systemName = card.querySelector('h4').textContent;
            
            if (typeof showToast === 'function') {
                showToast(`⚙️ إعدادات ${systemName} (قريباً)`, 'info');
            }
        });
    });
    
    // تشغيل النظام يدوياً (للتجربة)
    window.runAutomationSystem = function(systemId) {
        return automationSystem.runSystemManually(systemId);
    };
    
    // الحصول على حالة النظام
    window.getAutomationStatus = function() {
        return automationSystem.getSystemsStatus();
    };
    
    // تحديث الواجهة أول مرة
    automationSystem.updateUI();
});

// اختصارات لوحة المفاتيح للأنظمة الآلية
document.addEventListener('keydown', function(e) {
    // Ctrl + Alt + A لتفعيل جميع الأنظمة
    if (e.ctrlKey && e.altKey && e.key === 'A') {
        e.preventDefault();
        automationSystem.enableAllSystems();
        if (typeof showToast === 'function') {
            showToast('🤖 تم تفعيل جميع الأنظمة الآلية', 'success');
        }
    }
    
    // Ctrl + Alt + D لإيقاف جميع الأنظمة
    if (e.ctrlKey && e.altKey && e.key === 'D') {
        e.preventDefault();
        automationSystem.disableAllSystems();
        if (typeof showToast === 'function') {
            showToast('⏸️ تم إيقاف جميع الأنظمة الآلية', 'warning');
        }
    }
    
    // Ctrl + Alt + R لتشغيل النسخ الاحتياطي يدوياً
    if (e.ctrlKey && e.altKey && e.key === 'R') {
        e.preventDefault();
        automationSystem.runSystemManually('backup');
        if (typeof showToast === 'function') {
            showToast('💾 جاري النسخ الاحتياطي اليدوي...', 'info');
        }
    }
});
