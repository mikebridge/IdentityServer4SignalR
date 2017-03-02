using System;
using Akka.Actor;
using ChatAPI.Hub;
using ChatAPI.Messages;
using Microsoft.AspNet.SignalR;

namespace ChatAPI.Actors
{
    public class SignalREchoActor : TypedActor,
        IHandle<EchoRequest>
    {

        private IHubContext _context;

        protected override void PreStart()
        {
            _context = GlobalHost.ConnectionManager.GetHubContext<EchoHub>();
        }

        public void Handle(EchoRequest message)
        {
            Console.WriteLine($"handing message \"{message}\"");
            // send the message back to all clients.
            _context.Clients.All.echoMessage(message);
        }
    }
}
