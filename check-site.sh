#!/bin/bash

echo "🔍 فحص شامل لموقع ماروان هوب..."
echo "================================"

URL="https://marwanhubeg.github.io/marwanhub-website"

# 1. التحقق من الوصول
echo "1️⃣ اختبار الوصول إلى الموقع..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
echo "   الحالة HTTP: $STATUS"

if [ "$STATUS" = "200" ]; then
    echo "   ✅ الموقع متاح"
else
    echo "   ❌ الموقع غير متاح"
    exit 1
fi

# 2. التحقق من المحتوى
echo "2️⃣ التحقق من المحتوى الأساسي..."
CONTENT=$(curl -s "$URL")

# البحث عن عناصر رئيسية
echo "   البحث عن:"
echo -n "   • العنوان الرئيسي: "
if echo "$CONTENT" | grep -q "ماروان هوب"; then
    echo "✅ موجود"
else
    echo "❌ غير موجود"
fi

echo -n "   • قسم المهارات: "
if echo "$CONTENT" | grep -q "مهاراتي وتقنياتي"; then
    echo "✅ موجود"
else
    echo "❌ غير موجود"
fi

echo -n "   • قسم المشاريع: "
if echo "$CONTENT" | grep -q "مشاريعي"; then
    echo "✅ موجود"
else
    echo "❌ غير موجود"
fi

# 3. التحقق من الموارد
echo "3️⃣ التحقق من الموارد..."
echo -n "   • ملف CSS الرئيسي: "
if curl -s -o /dev/null -w "%{http_code}" "$URL/assets/css/styles.css" | grep -q "200"; then
    echo "✅ يعمل"
else
    echo "❌ غير متاح"
fi

echo -n "   • ملف JavaScript: "
if curl -s -o /dev/null -w "%{http_code}" "$URL/assets/js/main.js" | grep -q "200"; then
    echo "✅ يعمل"
else
    echo "❌ غير متاح"
fi

# 4. اختبار SEO
echo "4️⃣ اختبار SEO أساسي..."
TITLE=$(echo "$CONTENT" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g')
DESCRIPTION=$(echo "$CONTENT" | grep -o 'name="description"[^>]*content="[^"]*"' | cut -d'"' -f4)

echo "   العنوان: $TITLE"
echo "   الوصف: $DESCRIPTION"

# 5. وقت التحميل
echo "5️⃣ قياس وقت التحميل..."
START=$(date +%s%N)
curl -s -o /dev/null "$URL"
END=$(date +%s%N)
DURATION=$(( (END - START) / 1000000 ))
echo "   وقت التحميل: ${DURATION}ms"

# 6. النتيجة النهائية
echo ""
echo "🎯 نتيجة الفحص:"
if [ "$STATUS" = "200" ] && echo "$CONTENT" | grep -q "ماروان هوب"; then
    echo "✅ الموقع يعمل بشكل صحيح!"
    echo "🌐 الرابط: $URL"
else
    echo "⚠️  هناك مشاكل تحتاج لحل"
fi
