FROM microsoft/nanoserver

# This doesn't work---it seems to fail with no error message when executing
# the .exe.

SHELL ["powershell"]

RUN [System.Environment]::OSVersion 

RUN Get-CimInstance win32_operatingsystem | Select-Object Version

RUN new-item c:\ChatAPI -itemtype directory
COPY .\\bin\\Debug\\net461\\win7-x64\\publish ChatAPI  

EXPOSE 5000

# commented out for debugging
#ENTRYPOINT ["C:\\ChatAPI", "ChatAPI.exe"]
ENTRYPOINT ["powershell"]
