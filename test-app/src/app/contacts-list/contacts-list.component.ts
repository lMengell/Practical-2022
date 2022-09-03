import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  
  @Output() editContact = new EventEmitter<Contact>();
  @Output() removeContact = new EventEmitter<number>();

  contacts: Contact[] = [];
  searchText: string = "";
  pageNumber: number = 1;
  pageSize: number = 10;
  totalResults: number = 0;

  tableRowToggle: boolean = true;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.searchContacts();
  }

  edit(contact: Contact): void {
    console.log("Emitting edit contact"); 
    console.log(contact);

    this.editContact.emit(contact);
  }

  remove(contactId: number): void {
    this.removeContact.emit(contactId);
  }

  searchChanged(): void {
    this.searchContacts();
  }

  searchContacts(): void {
    console.log('GetContacts ContactsList');
    this.contactService.searchContats(this.searchText, this.pageNumber, this.pageSize)
    .subscribe(data => {
      this.contacts = data.items;
      this.totalResults = data.totalItems;
    } );
  }

  showingResults(): string {
    let start = ((this.pageNumber - 1) * this.pageSize) + 1;
    let end = (this.pageNumber * this.pageSize);

    if(end > this.totalResults)
      end = this.totalResults;

    return `Showing results ${start} to ${end}`;
  }

  enableNextPage(): boolean {
    return (this.pageNumber * this.pageSize) <= this.totalResults;
  }

  enablePreviousPage(): boolean {
    return this.pageNumber > 1;
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

  pageSizeChanged(): void {
    this.searchContacts();
  }

}
