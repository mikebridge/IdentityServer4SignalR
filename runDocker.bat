dotnet restore

dotnet build src\IdentityServer
dotnet build src\ChatAPI

dotnet publish src\IdentityServer
dotnet publish src\ChatAPI

docker-compose build

