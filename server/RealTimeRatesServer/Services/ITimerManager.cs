using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealTimeRatesServer.Services
{
    public interface ITimerManager
    {
        void Start(Action action);
        void Stop();
    }
}
