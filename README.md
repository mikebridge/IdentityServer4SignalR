## IdentityServer4 and SignalR

This is an example of how to generate JWT tokens using 
IdentityServer4 and use them in SignalR via a React Single Page App.  
It accompanies [this blog post](https://mikebridge.github.io/identityserver4-signalr/).

### Prerequisites:

You should be able to run this just from the command line if you have Node and Dotnet Core installed,
but otherwise you'll need VS2015 or greater:

- Install [Visual Studio 2015 Update 3](https://www.visualstudio.com/en-us/news/releasenotes/vs2015-update3-vs)
and/or [DotNet Core 1.1](https://www.microsoft.com/net/download/core#/current).

- Install [Node](https://nodejs.org/en/).  I'm using 6.9.5.

- Optionally install the [Node extension for Visual Studio](https://www.visualstudio.com/vs/node-js/)

### Asymmetric Key Setup

...

### Usage in Docker

```
> runDocker.bat
> docker-compose up
```

In a browser, navigate to [http://localhost:3000/](http://localhost:3000/).

### Usage from Command Line:

From one console:

```cmd
> cd src\ChatAPI
> dotnet restore
> dotnet run
```

And in another console:

```cmd
> cd src\IdentityServer
> dotnet restore
> dotnet run
```

And in a third console:

```cmd
> cd src\Web
> npm install
> npm run start
```

In a browser, navigate to [http://localhost:3000/](http://localhost:3000/).