import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  
  @Output() editContactEmitter = new EventEmitter<Contact>();
  @Output() removeContactEmitter = new EventEmitter<number>();
  @Output() addContactEmitter = new EventEmitter<void>();

  @Input()contacts: Contact[] = [];
  searchText: string = "";
  pageNumber: number = 1;
  pageSize: number = 10;
  totalResults: number = 0;

  tableRowToggle: boolean = true;
  isLoading: boolean = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.searchContacts();
  }

  edit(contact: Contact): void {
    this.editContactEmitter.emit(contact);
  }

  remove(contactId: number): void {
    this.isLoading = true;
    this.removeContactEmitter.emit(contactId);

    setTimeout(() => {
      this.searchContacts();
      this.isLoading = false;
    }, 3000)
  }

  searchChanged(): void {
    this.searchContacts();
  }

  searchContacts(): void {
    this.pageNumber = 1;

    this.contactService.searchContats(this.searchText, this.pageNumber, this.pageSize)
    .subscribe(data => {
      this.contacts = data.items;
      this.totalResults = data.totalItems;
    } );
  }

  nextPage(): void {
    this.pageNumber++;
    this.searchContacts();
  }

  previousPage(): void {
    this.pageNumber--;
    this.searchContacts();
  }

  assignRowClass(): string {
    this.tableRowToggle = !this.tableRowToggle;

    return this.tableRowToggle ? "row-type-1" : "row-type-2";
  }

  pageSizeChanged(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.searchContacts();
  }

  addContact(): void {
    this.addContactEmitter.emit();
  }
}