using Akka.Actor;
using ChatAPI.Actors;
using ChatAPI.Auth;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Owin;

//using Akka;

namespace ChatAPI
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class Startup
    {
        readonly ILogger _logger;

        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<Startup>();
            _logger.LogDebug("Startup");

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }


        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors();

            // NOTE: unhandled Exception: System.InvalidOperationException: Unable to resolve service for type 
            // 'System.Text.Encodings.Web.UrlEncoder' while attempting to activate 
            // 'Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerMiddleware'
            // is resolved by AddAuthentication (esp. if it's not brought in by MVC config)
            services.AddAuthentication();

            // ensure that the PascalCased C# objects map to camelCased JSON objects
            SetCamelCaseSerialization();
        }

        private static void SetCamelCaseSerialization()
        {
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new SignalRContractResolver()
            };
            var serializer = JsonSerializer.Create(settings);
            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => serializer);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            JWTInitialization.Initialize(app, Configuration);
           
            app.UseCors(policy =>
            {
                //policy.WithOrigins("*");
                policy.WithOrigins("http://localhost:3000");
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
                policy.AllowCredentials();
            });

            ConfigureAkka(app);

        }

        private void ConfigureAkka(IApplicationBuilder app)
        {
            _logger.LogInformation("Initializing Akka ActorSystem");
            var actorSystem = ActorSystem.Create("SignalRChatAPI");

            var echoActor = actorSystem.ActorOf(Props.Create(() => new SignalREchoActor()), "echoActor");

            app.UseAppBuilder(appBuilder => appBuilder.Use((ctx, next1) =>
            {
                // make the actor system available via the owin environment
                ctx.Environment["akka.actorsystem"] = actorSystem;
                return next1();
            }).MapSignalR());

        }



    }
}
