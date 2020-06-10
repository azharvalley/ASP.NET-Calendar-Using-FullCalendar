using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace SampleCalendar.Models
{
    public class Generic
    {
        static public string concatDateTime(double hr)
        {
            double h = Math.Truncate(hr);
            int d = (int)((hr - h) * 100);
            string tm = h.ToString() + ":00:00";// +d.ToString();
            string s = Convert.ToDateTime(DateTime.Now.Date.ToString()).ToString("yyyy-MM-dd") + " " + tm.ToString();
            return s;
        }

        public static long ConvertToUnixTime(DateTime datetime)
        {
            DateTime sTime = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            return (long)(datetime - sTime).TotalSeconds;
        }

        public static Int64 ConvertToUnixTime2(DateTime datetime)
        {
            DateTime sTime = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            return (Int64)(datetime - sTime).TotalSeconds;
        }

        public static string GetRandomString()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(4, false));
            builder.Append(RandomInt(1000, 9999));
            builder.Append(RandomString(2, false));
            return builder.ToString();
        }
        private static int RandomInt(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }

        private static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch = '\0';
            int i = 0;
            while (i < size)
            {
                ch = Convert.ToChar(Convert.ToInt32(26 * random.NextDouble() + 65));

                if (ch == '[')
                {
                    ch = 'h';

                }

                builder.Append(ch);
                i += 1;
            }
            if (lowerCase)
            {
                return builder.ToString().ToLower();
            }
            return builder.ToString();
        }
    }
}