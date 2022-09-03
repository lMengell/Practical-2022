using InterviewTest.Models;
using InterviewTest.Responses;
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

        [HttpGet]
        public IActionResult Search(string searchText, int pageNumber, int pageSize)
        {
            var contacts = new List<ContactModel>();

            var skipCount = (pageNumber - 1) * pageSize;
            skipCount = skipCount >= 0 ? skipCount : 0;

            if (string.IsNullOrWhiteSpace(searchText))
                contacts = _db.Contacts.ToList();
            else
            {
                var searchTerms = searchText.Trim().ToLower().Split(" ");

                foreach (var contact in _db.Contacts.ToList())
                {
                    if (searchTerms.Any(search =>
                        contact.FirstName.ToLower().Contains(search) ||
                        contact.LastName.ToLower().Contains(search)
                        ))
                        contacts.Add(contact);
                }
            }

            return Ok(new BaseResponse<ContactModel>()
            {
                TotalItems = contacts.Count,
                Items = contacts.Skip(skipCount).Take(pageSize).ToList()
            });
        }

        [HttpPut]
        public IActionResult Update([FromBody] ContactModel updatedContact)
        {
            var contact = _db.Contacts.FirstOrDefault(contact => contact.Id == updatedContact.Id);

            if (contact == null)
                return BadRequest($"{updatedContact.Id} not found");

            contact.FirstName = updatedContact.FirstName;
            contact.LastName = updatedContact.LastName;
            contact.PhoneNumber = updatedContact.PhoneNumber;
            contact.School = updatedContact.School;
            contact.DateOfBirth = updatedContact.DateOfBirth;

            return Ok();
        }

        [HttpPost]
        public IActionResult Create([FromBody] ContactModel contact)
        {
            if(string.IsNullOrWhiteSpace(contact.FirstName) ||
                string.IsNullOrWhiteSpace(contact.LastName))
            {
                return BadRequest("Required details of contact were missing");
            }

            contact.Id = _db.Contacts.Max(contact => contact.Id) + 1;
            _db.Contacts.Add(contact);

            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(int contactId)
        {
            var contact = _db.Contacts.FirstOrDefault(contact => contact.Id == contactId);

            if (contact == null)
                return BadRequest($"Contact with Id {contactId} does not exist");

            _db.Contacts.Remove(contact);

            return Ok();
        }
    }
}
