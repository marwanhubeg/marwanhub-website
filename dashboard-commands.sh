#!/bin/bash

case "$1" in
    "start")
        echo "🚀 بدء لوحة التحكم..."
        python3 server.py &
        echo "✅ تعمل على: http://localhost:8080"
        ;;
    "stop")
        echo "🛑 إيقاف لوحة التحكم..."
        pkill -f "server.py"
        echo "✅ متوقفة"
        ;;
    "restart")
        echo "🔄 إعادة تشغيل..."
        pkill -f "server.py"
        sleep 2
        python3 server.py &
        echo "✅ أعيد التشغيل"
        ;;
    "status")
        if pgrep -f "server.py" > /dev/null; then
            echo "✅ تعمل على: http://localhost:8080"
            echo "📊 منذ: $(ps -o etime= -p $(pgrep -f "server.py"))"
        else
            echo "❌ متوقفة"
        fi
        ;;
    "backup")
        echo "💾 إنشاء نسخة احتياطية..."
        ./backup.sh
        ;;
    "logs")
        echo "📝 سجلات النظام..."
        tail -f nohup.out 2>/dev/null || echo "لا توجد سجلات"
        ;;
    *)
        echo "👑 أوامر لوحة التحكم:"
        echo "   ./dashboard-commands.sh start    - بدء التشغيل"
        echo "   ./dashboard-commands.sh stop     - الإيقاف"
        echo "   ./dashboard-commands.sh restart  - إعادة التشغيل"
        echo "   ./dashboard-commands.sh status   - حالة النظام"
        echo "   ./dashboard-commands.sh backup   - نسخ احتياطي"
        echo "   ./dashboard-commands.sh logs     - عرض السجلات"
        ;;
esac
