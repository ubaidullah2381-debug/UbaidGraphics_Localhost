@echo off
chcp 65001 >nul
title عبید گرافکس - Local Server
color 0B
echo ============================================
echo    عبید گرافکس لوکل سرور
echo ============================================
echo.

:: Node.js کی جانچ
where node >nul 2>&1
if errorlevel 1 (
    color 0C
    echo [غلطی] Node.js انسٹال نہیں ہے!
    pause
    exit
)

:: Dependencies کی جانچ
if not exist "node_modules" (
    echo پیکجز انسٹال ہو رہے ہیں، انتظار کریں...
    call npm install
)

:: سرور فائل کی جانچ
if not exist "server.js" (
    color 0C
    echo [غلطی] server.js نہیں ملی!
    pause
    exit
)

echo سرور شروع ہو رہا ہے...
:: براؤزر کھولنے کے لیے پہلے کمانڈ دیں
start http://localhost:3000
start http://localhost:3000/admin.html

:: سرور چلائیں
node server.js

pause