using System;
using System.Reflection;
using Microsoft.AspNet.SignalR.Infrastructure;
using Newtonsoft.Json.Serialization;

namespace ChatAPI
{

    /// <summary>
    /// Taken from 
    /// http://stackoverflow.com/questions/30005575/signalr-use-camel-case#answer-30019100
    /// </summary>
    public class SignalRContractResolver : IContractResolver
    {

        private readonly Assembly _assembly;
        private readonly IContractResolver _camelCaseContractResolver;
        private readonly IContractResolver _defaultContractSerializer;

        public SignalRContractResolver()
        {
            _defaultContractSerializer = new DefaultContractResolver();
            _camelCaseContractResolver = new CamelCasePropertyNamesContractResolver();
            _assembly = typeof(Connection).Assembly;
        }

        public JsonContract ResolveContract(Type type)
        {
            return type.Assembly.Equals(_assembly)
                ? _defaultContractSerializer.ResolveContract(type)
                : _camelCaseContractResolver.ResolveContract(type);
        }

    }

}
