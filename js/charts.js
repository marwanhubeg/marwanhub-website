// الرسوم البيانية للوحة تحكم ماروان هوب

function initCharts() {
    // التحقق من وجود Chart.js
    if (typeof Chart === 'undefined') {
        console.warn('⚠️ Chart.js غير محمل');
        return;
    }
    
    // تسجيل تدرجات الألوان
    registerGradients();
    
    // إنشاء الرسوم البيانية
    createCommunityChart();
    createProjectsChart();
}

// تسجيل التدرجات اللونية
function registerGradients() {
    const communityCtx = document.getElementById('communityChart')?.getContext('2d');
    const projectsCtx = document.getElementById('projectsChart')?.getContext('2d');
    
    if (communityCtx) {
        const communityGradient = communityCtx.createLinearGradient(0, 0, 0, 200);
        communityGradient.addColorStop(0, 'rgba(124, 58, 237, 0.8)');
        communityGradient.addColorStop(1, 'rgba(124, 58, 237, 0.2)');
        window.communityGradient = communityGradient;
    }
    
    if (projectsCtx) {
        const projectsGradient = projectsCtx.createLinearGradient(0, 0, 0, 200);
        projectsGradient.addColorStop(0, 'rgba(14, 165, 233, 0.8)');
        projectsGradient.addColorStop(1, 'rgba(14, 165, 233, 0.2)');
        window.projectsGradient = projectsGradient;
    }
}

// رسم بياني لنمو المجتمع
function createCommunityChart() {
    const ctx = document.getElementById('communityChart');
    if (!ctx) return;
    
    // بيانات نموذجية
    const data = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [{
            label: 'نمو المجتمع',
            data: [50, 80, 120, 180, 250, 400],
            backgroundColor: window.communityGradient || 'rgba(124, 58, 237, 0.5)',
            borderColor: '#7c3aed',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#7c3aed',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    rtl: true,
                    titleFont: {
                        family: 'Cairo'
                    },
                    bodyFont: {
                        family: 'Cairo'
                    },
                    callbacks: {
                        label: function(context) {
                            return `الأعضاء: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Cairo'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Cairo'
                        },
                        callback: function(value) {
                            return value;
                        }
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

// رسم بياني لنجاح المشاريع
function createProjectsChart() {
    const ctx = document.getElementById('projectsChart');
    if (!ctx) return;
    
    // بيانات نموذجية
    const data = {
        labels: ['MarwanHub CLI', 'الموقع', 'أدوات', 'مكتبات', 'توثيق'],
        datasets: [{
            label: 'النجوم',
            data: [75, 45, 30, 25, 20],
            backgroundColor: window.projectsGradient || 'rgba(14, 165, 233, 0.5)',
            borderColor: '#0ea5e9',
            borderWidth: 2,
            borderRadius: 10,
            borderSkipped: false
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    rtl: true,
                    titleFont: {
                        family: 'Cairo'
                    },
                    bodyFont: {
                        family: 'Cairo'
                    },
                    callbacks: {
                        label: function(context) {
                            return `النجوم: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Cairo'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Cairo'
                        },
                        callback: function(value) {
                            return value;
                        }
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

// تحديث بيانات الرسوم البيانية بناءً على الفترة
function updateChartsData(period) {
    console.log(`📊 تحديث الرسوم البيانية للفترة: ${period}`);
    
    // في الواقع، سيكون هناك طلب API لجلب البيانات الحقيقية
    // هذه بيانات نموذجية للتجربة
    
    const communityData = getSampleData('community', period);
    const projectsData = getSampleData('projects', period);
    
    // تحديث الرسوم البيانية إذا كانت موجودة
    updateChartData('communityChart', communityData);
    updateChartData('projectsChart', projectsData);
}

function getSampleData(type, period) {
    // بيانات نموذجية بناءً على النوع والفترة
    const data = {
        community: {
            اليوم: [10, 15, 20, 25, 30, 35, 40],
            أسبوع: [50, 55, 60, 65, 70, 75, 80],
            شهر: [100, 120, 140, 160, 180, 200, 220],
            '3 أشهر': [50, 80, 120, 180, 250, 350, 400]
        },
        projects: {
            اليوم: [5, 3, 2, 4, 6],
            أسبوع: [15, 12, 8, 10, 7],
            شهر: [25, 20, 15, 18, 12],
            '3 أشهر': [75, 45, 30, 25, 20]
        }
    };
    
    return data[type]?.[period] || data[type]?.أسبوع || [];
}

function updateChartData(chartId, newData) {
    const chart = Chart.getChart(chartId);
    if (chart) {
        chart.data.datasets[0].data = newData;
        chart.update();
    }
}

// إنشاء رسوم بيانية إضافية عند الطلب
function createAdditionalCharts() {
    // يمكن إضافة رسوم بيانية إضافية هنا
    createEngagementChart();
    createGrowthChart();
}

function createEngagementChart() {
    const canvas = document.createElement('canvas');
    canvas.id = 'engagementChart';
    canvas.style.maxHeight = '200px';
    
    // إضافة للوحة التحليلات
    const analyticsSection = document.querySelector('.analytics-grid');
    if (analyticsSection) {
        const card = document.createElement('div');
        card.className = 'analytics-card';
        card.innerHTML = `
            <h4><i class="fas fa-comments"></i> تفاعل المجتمع</h4>
            <div class="chart-container">
                <canvas id="engagementChart"></canvas>
            </div>
        `;
        analyticsSection.appendChild(card);
        
        // إنشاء الرسم البياني
        setTimeout(() => {
            const ctx = document.getElementById('engagementChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['مناقشات', 'أسئلة', 'اقتراحات', 'إجابات'],
                        datasets: [{
                            data: [40, 25, 20, 15],
                            backgroundColor: [
                                '#7c3aed',
                                '#0ea5e9',
                                '#10b981',
                                '#f59e0b'
                            ],
                            borderWidth: 2,
                            borderColor: '#1e293b'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                rtl: true,
                                labels: {
                                    font: {
                                        family: 'Cairo'
                                    },
                                    color: '#cbd5e1'
                                }
                            }
                        }
                    }
                });
            }
        }, 100);
    }
}

function createGrowthChart() {
    // رسم بياني للنمو المقارن
    console.log('📈 إنشاء رسوم بيانية إضافية...');
}

// تصدير الرسوم البيانية كصور
function exportChartAsImage(chartId, filename) {
    const chart = Chart.getChart(chartId);
    if (chart) {
        const image = chart.toBase64Image();
        const link = document.createElement('a');
        link.href = image;
        link.download = filename || `chart-${chartId}-${new Date().toISOString()}.png`;
        link.click();
    }
}

// تحديث تلقائي للرسوم البيانية
setInterval(() => {
    // تحديث الرسوم البيانية كل دقيقة (للتجربة)
    const charts = ['communityChart', 'projectsChart'];
    charts.forEach(chartId => {
        const chart = Chart.getChart(chartId);
        if (chart) {
            // تحديث عشوائي بسيط للبيانات (للتجربة فقط)
            const currentData = chart.data.datasets[0].data;
            const newData = currentData.map(value => 
                Math.max(0, value + Math.floor(Math.random() * 10) - 5)
            );
            chart.data.datasets[0].data = newData;
            chart.update('none');
        }
    });
}, 60000);
