@echo off
echo ============================================================
echo Restoring: Dashboard UI - Original Version
echo ============================================================
echo.
copy /Y "%~dp0app.js" "%~dp0..\..\public\app.js"
copy /Y "%~dp0chart.umd.js" "%~dp0..\..\public\chart.umd.js"
copy /Y "%~dp0client.css" "%~dp0..\..\public\client.css"
copy /Y "%~dp0client.html" "%~dp0..\..\public\client.html"
copy /Y "%~dp0client.js" "%~dp0..\..\public\client.js"
copy /Y "%~dp0client_standalone.html" "%~dp0..\..\public\client_standalone.html"
copy /Y "%~dp0index.html" "%~dp0..\..\public\index.html"
copy /Y "%~dp0style.css" "%~dp0..\..\public\style.css"
echo.
echo ============================================================
echo Restore complete! All original UI files successfully restored.
echo Please hard refresh your browser (Ctrl + F5).
echo ============================================================
pause
