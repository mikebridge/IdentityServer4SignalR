using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Utils
{
    public class UrlUtils
    {
        public static string UrlCombine(string url1, string url2)
        {
            if (url1.Length == 0) { return url2; }

            if (url2.Length == 0) { return url1; }

            return string.Format("{0}/{1}", url1.TrimEnd('/', '\\'), url2.TrimStart('/', '\\'));
        }
    }
}
