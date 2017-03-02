using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Owin.Builder;
using Owin;

namespace ChatAPI
{
    using AppFunc = Func<IDictionary<string, object>, Task>;

    // SEE: https://github.com/aspnet/Entropy/blob/dev/samples/Owin.IAppBuilderBridge/KAppBuilderExtensions.cs
    public static class KatanaIApplicationBuilderExtensions
    {
        
        public static IApplicationBuilder UseAppBuilder(this IApplicationBuilder app, Action<IAppBuilder> configure)
        {
            app.UseOwin(addToPipeline =>
            {
                addToPipeline(next =>
                {
                    var appBuilder = new AppBuilder();
                    appBuilder.Properties["builder.DefaultApp"] = next;

                    configure(appBuilder);

                    return appBuilder.Build<AppFunc>();
                });
            });
            return app;
        }
    }
}

