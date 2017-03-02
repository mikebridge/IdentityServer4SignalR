using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace ChatAPI
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class Program
    {
        public static void Main(string[] args)
        {
            var listen = "http://0.0.0.0:5000";
            Console.WriteLine($"Starting on {listen}");

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseUrls(listen) // for docker to work, don't use localhost
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            Console.WriteLine("running...");
            host.Run();
            Console.WriteLine("started...");
        }
    }
}
