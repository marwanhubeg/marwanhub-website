// ملف JavaScript الرئيسي لـ ماروان هوب

// تفعيل القائمة المتنقلة
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            menuBtn.innerHTML = isVisible ? 
                '<i class="fas fa-bars"></i>' : 
                '<i class="fas fa-times"></i>';
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
}

// تأثير التمرير للشريط العلوي
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

// تفعيل نموذج التواصل
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // هنا يمكن إضافة إرسال البيانات للخادم
            console.log('بيانات التواصل:', formData);
            
            // رسالة نجاح
            alert('شكراً لتواصلك! سنرد عليك في أقرب وقت ممكن.');
            form.reset();
        });
    }
}

// تفعيل تأثيرات الظهور عند التمرير
function initScrollAnimations() {
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
    
    // إضافة الفئة للمشاهدات
    document.querySelectorAll('.service-card, .feature, .project-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// تحديث الإحصائيات الديناميكية
function updateDynamicStats() {
    // يمكن تحديث هذه القيم من API
    const stats = {
        projects: 50,
        clients: 100,
        support: 24,
        technologies: 15
    };
    
    // تحديث القيم في الصفحة
    document.querySelectorAll('.stat-item h3').forEach((stat, index) => {
        const values = Object.values(stats);
        if (values[index]) {
            // تأثير عد متدرج
            let current = 0;
            const target = values[index];
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (index === 2 ? '/7' : '+');
            }, 20);
        }
    });
}

// تهيئة جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initContactForm();
    initScrollAnimations();
    updateDynamicStats();
    
    console.log('🚀 موقع ماروان هوب جاهز للعمل!');
});
