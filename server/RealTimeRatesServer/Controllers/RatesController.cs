using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RealTimeRatesServer.DataStorage;
using RealTimeRatesServer.HubConfig;
using RealTimeRatesServer.Services;

namespace RealTimeRatesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatesController : ControllerBase
    {
        private IHubContext<RatesHub> _hub;
        private readonly ITimerManager _timerManager;

        public RatesController(IHubContext<RatesHub> hub, ITimerManager timerManager) 
        { 
            _hub = hub;
            _timerManager = timerManager;
        }

        public IActionResult Get()
        { 
            _timerManager.Start(() => _hub.Clients.All.SendAsync("sendrates", DataManager.GetData())); 
            return Ok(new { Message = "Done" }); 
        }
    }
}