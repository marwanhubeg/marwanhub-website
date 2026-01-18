#!/bin/bash

# سكريبت تثبيت لوحة تحكم ماروان هوب

echo "🚀 بدء تثبيت لوحة التحكم الذكية..."
echo "================================="

# التحقق من التبعيات
echo "🔍 التحقق من التبعيات..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 غير مثبت. التثبيت:"
    echo "   Ubuntu/Debian: sudo apt install python3"
    echo "   macOS: brew install python"
    exit 1
fi

# إنشاء هيكل المجلدات
echo "📁 إنشاء هيكل المجلدات..."
mkdir -p ~/Marwan-Hub/dashboard/{assets,css,js,api,components,backup}

# نسخ الملفات (إذا لم تكن موجودة)
echo "📦 نسخ الملفات..."

# التحقق من وجود الملفات الأساسية
REQUIRED_FILES=("index.html" "css/dashboard.css" "css/responsive.css" "js/dashboard.js")

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "dashboard/$file" ]; then
        echo "⚠️  ملف $file مفقود"
    fi
done

# تثبيت خادم ويب محلي
echo "🌐 تثبيت خادم ويب محلي..."
cd ~/Marwan-Hub/dashboard

# إنشاء خادم ويب بسيط
cat << 'PYTHON_EOF' > server.py
#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # توجيه كل شيء إلى index.html
        if self.path != '/' and not '.' in self.path:
            self.path = '/'
        return super().do_GET()

    def log_message(self, format, *args):
        # تقليل السجلات
        pass

os.chdir(DIRECTORY)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 خادم لوحة التحكم يعمل على: http://localhost:{PORT}")
    print(f"👑 حافظ القمة: http://localhost:{PORT}/index.html")
    print("📱 يمكنك الوصول من أي جهاز على الشبكة نفسها")
    print("🛑 اضغط Ctrl+C لإيقاف الخادم")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 إيقاف الخادم...")
        httpd.shutdown()
PYTHON_EOF

chmod +x server.py

# إنشاء ملف التكوين
cat << 'EOF' > config.json
{
  "dashboard": {
    "name": "لوحة تحكم ماروان هوب",
    "version": "1.0.0",
    "author": "مروان هوب - حافظ القمة",
    "port": 8080,
    "autoStart": true,
    "notifications": true,
    "analytics": true,
    "backup": true
  },
  "features": {
    "realTimeUpdates": true,
    "offlineSupport": true,
    "pushNotifications": true,
    "dataExport": true,
    "apiIntegration": true
  },
  "security": {
    "passwordProtected": false,
    "encryption": false,
    "sessionTimeout": 30
  }
}
