@echo off
chcp 65001 >nul
title عبید گرافکس - Local Server
color 0B
echo.
echo  ============================================
echo   عبید گرافکس لوکل سرور
echo  ============================================
echo.

:: Check Node.js
where node >nul 2>&1
if errorlevel 1 (
    color 0C
    echo  [غلطی] Node.js انسٹال نہیں ہے!
    echo.
    echo  براہ کرم یہ کریں:
    echo  1. https://nodejs.org پر جائیں
    echo  2. LTS والا بٹن دبائیں اور انسٹال کریں
    echo  3. کمپیوٹر ری اسٹارٹ کریں
    echo  4. پھر یہ فائل چلائیں
    echo.
    pause
    exit
)

echo  Node.js مل گیا:
node --version
echo.

:: Check if node_modules exist
if not exist "node_modules" (
    echo  پیکجز انسٹال ہو رہے ہیں، انتظار کریں...
    npm install
    if errorlevel 1 (
        color 0C
        echo.
        echo  [غلطی] npm install ناکام ہوا!
        pause
        exit
    )
    echo  انسٹال مکمل!
    echo.
)

:: Check server.js exists
if not exist "server.js" (
    color 0C
    echo  [غلطی] server.js فائل نہیں ملی!
    echo  یقینی بنائیں کہ تمام فائلیں ایک ہی فولڈر میں ہیں۔
    pause
    exit
)

echo  سرور شروع ہو رہا ہے...
echo.
echo  ویب سائٹ:   http://localhost:3000
echo  ایڈمن پینل: http://localhost:3000/admin.html
echo.
echo  بند کرنے کے لیے یہ window بند کریں یا Ctrl+C دبائیں
echo  ============================================
echo.

timeout /t 2 /nobreak >nul
start "" "http://localhost:3000"
start "" "http://localhost:3000/admin.html"

node server.js

echo.
echo  سرور بند ہو گیا۔
pause
