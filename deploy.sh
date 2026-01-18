#!/bin/bash

echo "🚀 بدء نشر موقع ماروان هوب..."

# التأكد من أننا في المجلد الصحيح
cd ~/Marwan-Hub/marwanhub-website

# إعداد Git
echo "📦 إعداد Git..."
git init
git add .
git commit -m "🚀 إطلاق موقع ماروان هوب الرسمي - $(date)"

# إضافة المستودع البعيد
echo "🔗 إضافة المستودع البعيد..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/marwanhubeg/marwanhub-website.git

# رفع الموقع
echo "📤 رفع الموقع إلى GitHub..."
if git push -u origin main; then
    echo "✅ تم رفع الموقع بنجاح!"
    echo ""
    echo "🌐 الآن قم بتفعيل GitHub Pages:"
    echo "   1. اذهب إلى: https://github.com/marwanhubeg/marwanhub-website"
    echo "   2. Settings → Pages"
    echo "   3. Branch: main, Folder: /"
    echo "   4. Save"
    echo ""
    echo "🎉 سيكون موقعك متاحاً على:"
    echo "   https://marwanhubeg.github.io/marwanhub-website"
else
    echo "❌ حدث خطأ في الرفع. جرب:"
    echo "   git push -u origin main --force"
fi
