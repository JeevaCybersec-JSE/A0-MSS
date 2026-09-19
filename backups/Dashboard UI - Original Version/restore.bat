@echo off
echo Restoring Dashboard UI - Original Version...
copy /Y "%~dp0app.js" "%~dp0..\..\public\app.js"
copy /Y "%~dp0index.html" "%~dp0..\..\public\index.html"
copy /Y "%~dp0style.css" "%~dp0..\..\public\style.css"
echo.
echo Restore complete! Please refresh your browser.
pause
