#!/bin/bash

echo "🎯 تفعيل GitHub Pages لموقع ماروان هوب..."

# إضافة ملف .nojekyll
echo "📝 إضافة .nojekyll..."
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll for GitHub Pages" 2>/dev/null

# دفع التغييرات
echo "📤 دفع التغييرات إلى GitHub..."
git push origin main

# عرض التعليمات
echo ""
echo "✅ تم رفع الملفات!"
echo ""
echo "🌐 الآن قم بـ:"
echo "   1. افتح: https://github.com/marwanhubeg/marwanhub-website/settings/pages"
echo "   2. اختر: Branch: main, Folder: /"
echo "   3. انقر: Save"
echo ""
echo "⏳ انتظر 1-2 دقيقة"
echo "🔗 ثم افتح: https://marwanhubeg.github.io/marwanhub-website"
echo ""
echo "📱 للاختبار السريع:"
echo "   curl -I https://marwanhubeg.github.io/marwanhub-website"
