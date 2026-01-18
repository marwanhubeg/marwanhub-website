#!/bin/bash

# سكريبت النسخ الاحتياطي للوحة التحكم

BACKUP_DIR="backup/$(date +%Y%m%d_%H%M%S)"
BACKUP_FILE="marwanhub-dashboard-backup-$(date +%Y%m%d).tar.gz"

echo "💾 بدء النسخ الاحتياطي للوحة التحكم..."
echo "==================================="

# إنشاء مجلد النسخ الاحتياطي
mkdir -p "$BACKUP_DIR"

# نسخ الملفات
echo "📁 نسخ الملفات..."
cp -r ./* "$BACKUP_DIR/" 2>/dev/null

# إنشاء أرشيف
echo "📦 إنشاء الأرشيف..."
tar -czf "$BACKUP_FILE" "$BACKUP_DIR"

# تنظيف
rm -rf "$BACKUP_DIR"

echo "✅ تم إنشاء النسخة الاحتياطي: $BACKUP_FILE"
echo "📏 الحجم: $(du -h "$BACKUP_FILE" | cut -f1)"
