using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Demo01.AppWebMvc.Controllers
{
    public class ConsultaController : Controller
    {
        public ActionResult Inicio()
        {
            return View();
        }

        public string listarUbigeo()
        {
            var url = $"https://api.samishop.pe/v1/store/971/ubigeo";
            string responseBody ="";
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = "application/json";
            request.Accept = "application/json";
            try
            {
                using (WebResponse response = request.GetResponse())
                {
                    using (Stream strReader = response.GetResponseStream())
                    {
                        if (strReader != null)
                        {
                            using (StreamReader objReader = new StreamReader(strReader))
                            {
                                responseBody = objReader.ReadToEnd();
                                
                                // Do something with responseBody
                                Console.WriteLine(responseBody);
                            }
                        }
                        
                    }
                }
            }
            catch (WebException ex)
            {
                // Handle error
            }
            return responseBody;
        }

    }
}
