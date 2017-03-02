FROM microsoft/aspnetcore:1.1.0
#RUN apt-get update

ENTRYPOINT ["dotnet", "IdentityServer.dll"]
ARG source=./bin/Debug/netcoreapp1.1/publish
WORKDIR /app
EXPOSE 5000
COPY $source .

