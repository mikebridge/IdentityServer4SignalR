## IdentityServer4 and SignalR

This is an example of how to generate JWT tokens using 
IdentityServer4 and use them to authenticate users in SignalR via a React/TypeScript Single Page App.  
It will accompany [this future blog post](https://mikebridge.github.io/identityserver4-signalr/).

### Prerequisites:

You can run this from the command line if you have Node and Dotnet Core installed,
or you can use VS2015 or greater:

- Install [Visual Studio 2015 Update 3](https://www.visualstudio.com/en-us/news/releasenotes/vs2015-update3-vs)
and/or [DotNet Core 1.1](https://www.microsoft.com/net/download/core#/current).

- Install [Node](https://nodejs.org/en/).  I'm using 6.9.5.

- Optionally install the [Node extension for Visual Studio](https://www.visualstudio.com/vs/node-js/)

## Create and Install Asymmetric Keys

From the Developer Command Prompt:

```
> makecert -n "CN=ExampleTest" -a sha256 -sv ExampleTest.pvk -r ExampleTest.cer
> pvk2pfx -pvk ExampleTest.pvk -spc ExampleTest.cer -pfx ExampleTest.pfx
```

The pvk2pfx command combines the pvk and cer files into a single pfx file containing both the public and private 
keys for the certificate. The IdentityServer4 app will use the private key from the pfx to sign tokens. 
The .cer file containing the public key can be shared with other services for the purpose of signature validation.

To install asymmetric keys:

1. Go to `Manage Computer Certificates` in Windows
2. Under `Certificates - Local Computer => Personal => Certificates`, right click and select `All Tasks => Import...`
3. Select `ExampleTest.pfx` and import it (there's no password).  You should see ExampleTest in the list.
4. Under `Certificates - Local Computer => Trusted People => Certificates`, right click and select `All Tasks => Import...`
5. Select `ExampleTest.cer` and import it (there's no password).

If you want to verify generated JWT tokens yourself at [jwt.io](https://jwt.io/), you can translate the .pfx to 
a .pem file:

```bash
openssl x509 -inform der -in ExampleTest.cer -pubkey -noout > ExampleTest_pub.pem
```

### Launch from Command Line:

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

The two test users are "lou" and "bud" with the password "password".

## TODO

I have not been able to get a net461 app working in docker using a nanoserver image.  
