@echo off
echo ========================================
echo   C++ Password Manager - Compile
echo ========================================
echo.

echo Compiling password.cpp...
g++ password.cpp -o password.exe

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Compilation successful!
    echo.
    echo Starting password manager...
    echo.
    password.exe
) else (
    echo.
    echo ✗ Compilation failed!
    echo Make sure g++ is installed and in your PATH
    pause
)
