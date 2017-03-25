using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerIdentityHttpHeaderStripping
{
    /// <summary>
    /// Class that implements methods used for
    /// stripping out HTTP response headers.
    /// </summary>
    public class ServerIdentityStripper
    {
        #region Public Methods
        /// <summary>
        /// Method that strips out HTTP response headers 
        /// from response.
        /// execution.
        /// </summary>
        /// <param name="context">
        ///     Http context associated with the response 
        ///     that would be stripped of server identity 
        ///     headers.
        /// </param>
        public void Execute(HttpContext context)
        {
            var serverHeaders = GetServerIdentityHeaders();

            StripServerHeaders(context.Response, serverHeaders);
        }
        #endregion

        #region Private Methods
        private bool CheckIfHttpHeaderExists(HttpResponse response, string header)
        {
            return response.Headers
                           .AllKeys
                           .Any(k => k == header);
        }

        private List<string> GetServerIdentityHeaders()
        {
            return new List<string>
            {
                "Server",
                "X-AspNetMvc-Version",
                "X-AspNet-Version"
            };
        }

        private void StripServerHeaders(HttpResponse response, List<string> headers)
        {
            foreach (var header in headers)
            {
                if (CheckIfHttpHeaderExists(response, header))
                    response.Headers.Remove(header);
            }
        }
        #endregion
    }
}