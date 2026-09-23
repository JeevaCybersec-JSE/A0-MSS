@echo off
cd /d "%~dp0"
echo ============================================
echo   A0 MSS KPI Dashboard (RBAC Console)
echo ============================================
echo   URL : http://localhost:4321
echo --------------------------------------------
echo   Super Admin : Jeeva  / 0123
echo   Admin       : admin  / admin123
echo   Editor      : editor / editor123
echo   Viewer      : viewer / viewer123
echo ============================================
echo   [NOTE] Do NOT close this window while using the app!
echo ============================================
start "" "http://localhost:4321"
if exist "node.exe" (
  node.exe server.js
) else (
  node server.js
)
pause
