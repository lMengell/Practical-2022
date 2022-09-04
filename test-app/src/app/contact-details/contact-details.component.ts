import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { delay, takeLast } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Input() contact: Contact = {} as Contact;

  @Output() exit = new EventEmitter<void>();

  isLoading: boolean = false;
  isSavedSuccessfully: boolean = false;
  showErrors: boolean = false;
  isAdd: boolean = false;

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    if(!this.contact.firstName
      || !this.contact.lastName)
      {
        this.isAdd = true;
      }
  }

  returnToContactList(): void {
    this.exit.emit();
  }

  saveContact(): void {
    if(!this.contact.firstName
      || !this.contact.lastName)
      {
        this.showErrors = true;
        return;
      }

    this.isLoading = true;

    if(this.isAdd){
      this.addContact();
    }
    else {
      this.updateContact();
    }
  }

  updateContact(): void {
    this.contactService.updateContact(this.contact)
    .subscribe(response => {
      this.isSavedSuccessfully = true;
      setTimeout(()=>{ this.exit.emit() }, 3000)
    });
  }

  addContact(): void {
    this.contactService.addContact(this.contact)
    .subscribe(response => {
      this.isSavedSuccessfully = true;
      setTimeout(()=>{ this.exit.emit() }, 3000)
    });
  }

  stringErrorClass(value: string): string {
    if(this.showErrors && !value) {
      return "input-error";
    }
    
    return "";
  }

}
