// الملف الرئيسي لجافاسكريبت - ماروان هوب

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 موقع ماروان هوب جاهز للعمل!');
    
    // تفعيل القائمة المتنقلة
    initMobileMenu();
    
    // تفعيل تأثيرات التمرير
    initScrollEffects();
    
    // تحديث السنة في الفوتر
    updateCopyrightYear();
    
    // تتبع الأحداث
    setupAnalytics();
});

// تفعيل القائمة المتنقلة
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // تغيير الأيقونة
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// تأثيرات التمرير
function initScrollEffects() {
    // إضافة تأثير للشريط العلوي عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.75rem 0';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '1rem 0';
        }
    });
    
    // تفعيل الظهور عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // إضافة الفئة للعناصر التي نريد أن تظهر
    document.querySelectorAll('.skill-category, .project-card, .principle, .timeline-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// تحديث السنة في الفوتر
function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.footer-copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} ماروان هوب. جميع الحقوق محفوظة.`;
    }
}

// تتبع الأحداث البسيط
function setupAnalytics() {
    // تتبع نقرات الروابط الخارجية
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log(`🔗 رابط خارجي تم النقر عليه: ${this.href}`);
            // هنا يمكن إضافة Google Analytics
        });
    });
    
    // تتبع وقت البقاء على الصفحة
    let pageLoadTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000);
        console.log(`⏱️ الوقت على الصفحة: ${timeSpent} ثانية`);
    });
    
    // تتبع التفاعل مع المشاريع
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function() {
            const projectName = this.closest('.project-card').querySelector('.project-title').textContent;
            console.log(`📂 مشروع تم النقر عليه: ${projectName}`);
        });
    });
}

// وظائف مساعدة
function showNotification(message, type = 'info') {
    // يمكن تطوير هذه الوظيفة لعرض إشعارات
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
}

// تحميل البيانات الديناميكية (مثال)
async function loadDynamicData() {
    try {
        // هنا يمكن جلب بيانات من API
        // مثال: عدد النجوم على GitHub
        const response = await fetch('https://api.github.com/repos/marwanhubeg/marwanhub-cli');
        const data = await response.json();
        
        console.log(`⭐ النجوم على GitHub: ${data.stargazers_count}`);
        
        // يمكن تحديث واجهة المستخدم بالبيانات
        const starElement = document.querySelector('.github-stars');
        if (starElement) {
            starElement.textContent = data.stargazers_count;
        }
    } catch (error) {
        console.error('❌ خطأ في جلب البيانات:', error);
    }
}

// استدعاء تحميل البيانات عند الحاجة
// loadDynamicData();
