using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Timers;

namespace RealTimeRatesServer.Services
{
    public class TimerManager : ITimerManager
    {
        private Timer _timer = null;
        private Action _action = null;
        private readonly IConfiguration _configuration = null;
        private readonly ILogger<TimerManager> _logger = null;

        public TimerManager(IConfiguration configuration, ILogger<TimerManager> logger)
        {
            _configuration = configuration;
            _logger = logger;
            var interval = _configuration.GetValue<int>("AppSettings:TimerInterval", 3000);
            _timer = new Timer(interval);
            _timer.Elapsed += Elapsed;
            _logger.LogDebug("TimerManager initialized.");
        }

        public void Start(Action action)
        {
            _logger.LogDebug("TimerManager->Start()");
            _action = action;
            _timer.Start();
        }

        public void Stop()
        {
            _logger.LogDebug("TimerManager->Stop()");
            _timer.Stop();
        }

        private void Elapsed(object sender, ElapsedEventArgs e)
        {
            _logger.LogDebug("TimerManager->Elapsed()");
            _action();
        }
    }
}
