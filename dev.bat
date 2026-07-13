@echo off
cd /d "%~dp0"
echo.
echo [마음챙김] 개발 서버를 시작합니다...
echo 포트 3005 사용 (3000/3001/3002 충돌 방지)
echo.
"C:\Program Files\nodejs\npm.cmd" run dev -- -p 3005
pause
