using InterviewTest.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewTest.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {

        private readonly ILogger<ContactsController> _logger;
        private readonly FakeDb _db;

        // To prevent you having to deal with an actual database we'll just be using a Dependency Injected fake database.
        public ContactsController(ILogger<ContactsController> logger, FakeDb db)
        {
            _logger = logger;
            _db = db;
        }

        public IActionResult Get()
        {
            return Ok(_db.Contacts.Take(10).ToList());
        }

    }
}
