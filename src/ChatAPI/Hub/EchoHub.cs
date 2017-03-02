using System;
using System.Linq;
using System.Security.Claims;
using Akka.Actor;
using ChatAPI.Messages;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Owin;
// ReSharper disable UnusedMember.Global
// ReSharper disable ClassNeverInstantiated.Global

namespace ChatAPI.Hub
{
    [Authorize(Roles = "chatapi.user")]

    public class EchoHub : Microsoft.AspNet.SignalR.Hub
    {

        public void SendMessage(String message)
        {
            // uses 
            var actorSystem = FindActorSystem();
            var echoActorRef = actorSystem.ActorSelection("/user/echoActor");
            echoActorRef.Tell(new EchoRequest(message, GetClaim("name")));

        }
        
        private string GetClaim(string key)
        {
            var identity = Context.User?.Identity as ClaimsIdentity;
            var name = identity?.Claims
                .Where(claim => claim.Type == key)
                .Select(claim => claim.Value)
                .FirstOrDefault();
            return name;
        }

        private ActorSystem FindActorSystem()
        {
            var ctx = Context.Request as ServerRequest;
            if (ctx == null)
            {
                throw new Exception("The context was not initialized");
            }
            var actorSystem = ctx.Environment["akka.actorsystem"] as ActorSystem;
            if (actorSystem == null)
            {
                throw new Exception("The ActorSystem was not initialized");
            }
            return actorSystem;
        }
    }
}
