using RealTimeRatesServer.Models;
using System;
using System.Collections.Generic;

namespace RealTimeRatesServer.DataStorage
{
    public static class DataManager
    {
        public static List<Currency> GetData()
        {
            List<Currency> randomData = new List<Currency>();

            var r = new Random();
            float randomNum = r.Next(4000, 4500);
            Currency curr = new Currency();
            curr.Rate = randomNum / 1000;
            curr.Code = "MYR";
            curr.Time = DateTime.Now.ToString("HH:mm:ss");
            randomData.Add(curr);

            float randomNum2 = r.Next(2900, 3400);
            Currency curr2 = new Currency();
            curr2.Rate = randomNum2 / 1000;
            curr2.Code = "SGD";
            curr2.Time = curr.Time;
            randomData.Add(curr2);

            return randomData;
        }
    }
}
