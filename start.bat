@echo off
cd /d "%~dp0"
echo ============================================
echo   A0 MSS KPI Dashboard Starting...
echo ============================================
echo   URL : http://localhost:4321
echo   User: Jeeva
echo   Pass: 0123
echo ============================================
start "" "http://localhost:4321"
if exist "node.exe" (
  node.exe server.js
) else (
  node server.js
)
pause
