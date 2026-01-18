#!/bin/bash

# سكريبت تحديث ونشر موقع ماروان هوب

echo "🚀 بدء تحديث موقع ماروان هوب..."
echo "==============================="

# التحقق من المجلد
if [ ! -f "index.html" ]; then
    echo "❌ يجب تشغيل السكريبت من مجلد الموقع"
    exit 1
fi

# نسخ احتياطي
echo "📦 إنشاء نسخة احتياطية..."
BACKUP_DIR="backup/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r . "$BACKUP_DIR/" 2>/dev/null
echo "✅ تم النسخ الاحتياطي في: $BACKUP_DIR"

# تحديث Git
echo "🔄 تحديث Git..."
git add .
git commit -m "🎨 تحديث موقع ماروان هوب - $(date +'%Y-%m-%d %H:%M:%S')"

# رفع التحديثات
echo "📤 رفع التحديثات إلى GitHub..."
if git push origin main; then
    echo "✅ تم رفع التحديثات بنجاح!"
else
    echo "❌ فشل رفع التحديثات"
    echo "🔧 حاول: git push origin main --force"
    exit 1
fi

# الانتظار لبناء GitHub Pages
echo "⏳ انتظر 2 دقيقة لبناء GitHub Pages..."
sleep 120

# اختبار الموقع
echo "🔍 اختبار الموقع..."
URL="https://marwanhubeg.github.io/marwanhub-website"
if curl -s -o /dev/null -w "%{http_code}" "$URL" | grep -q "200"; then
    echo "🎉 الموقع يعمل بنجاح!"
    echo "🌐 الرابط: $URL"
else
    echo "⚠️  قد يكون الموقع مازال يبنى"
    echo "🔧 تحقق من: https://github.com/marwanhubeg/marwanhub-website/deployments"
fi

echo ""
echo "✅ تم الانتهاء!"
echo "📊 الخطوة التالية: مشاركة الموقع مع المجتمع"
