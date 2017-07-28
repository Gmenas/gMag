@echo off
set passed=true
if not exist %~dp0bin\selenium-standalone.jar (
    echo Download slenium-standalone.jar 3.40 from https://goo.gl/s4o9Vx and place it in %~dp0bin
    set passed=false
)
if not exist %~dp0bin\chromedriver.exe (
    echo Download chromedriver.exe 2.31 from https://goo.gl/WHFPZw and place it in %~dp0bin
    set passed=false
)
if not %passed% == true (
    pause
) else (
    cd %~dp0bin\
    java -jar selenium-standalone.jar
)
