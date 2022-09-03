import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Input() contact: Contact = {} as Contact;

  @Output() exit = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  returnToContactList(): void {
    this.exit.emit();
  }

}
