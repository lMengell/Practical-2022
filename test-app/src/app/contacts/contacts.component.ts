import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contact: Contact = {} as Contact;
  isAddOrEditState: boolean = false;

  constructor(
    private contactService: ContactService
  ) { }

  returnToContactList(): void {
    this.isAddOrEditState = false;
  }

  editContact(contact: Contact): void {
    console.log(contact);
    console.log("Editting contact Id: " + contact.id);
    
    this.contact = contact;
    this.isAddOrEditState = true;
  }

  removeContact(contactId: number): void {
    this.contactService.removeContact(contactId)
    .subscribe();
  }
  
  
}
