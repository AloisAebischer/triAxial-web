@echo off
taskkill /IM nw.exe 2> NUL
taskkill /IM VirtualHub.exe 2> NUL
start /MIN virtualhub\VirtualHub.exe 
start /B nw\nw.exe .
wmic process where name="tri-axial.exe" CALL setpriority "high priority"