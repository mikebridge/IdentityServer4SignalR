using System;

namespace ChatAPI.Messages
{
    public class EchoRequest
    {
        public string Message { get; }

        public string FullName { get; }

        public EchoRequest(String message, String fullName)
        {
            Message = message;
            FullName = fullName;
        }
    }
}
