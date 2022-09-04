import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalResults: number = 0;
  @Input() pageNumber: number = 1;
  
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() pageSizeChanged = new EventEmitter<number>();
  
  pageSize: number = 10;
  

  constructor() { }

  ngOnInit(): void {
  }

  previousPage(): void {
    this.pageNumber--;
    this.previous.emit();
  }

  nextPage(): void {
    this.pageNumber++;
    this.next.emit();
  }

  pageSizeChange(): void {
    this.pageSizeChanged.emit(this.pageSize);
  }

  showingResults(): string {
    let start = ((this.pageNumber - 1) * this.pageSize) + 1;
    let end = (this.pageNumber * this.pageSize);

    if(end > this.totalResults)
      end = this.totalResults;

    return `Showing results ${start} to ${end} out of ${this.totalResults}`;
  }

  showNextPage(): boolean {
    return (this.pageNumber * this.pageSize) <= this.totalResults;
  }

  showPreviousPage(): boolean {
    return this.pageNumber > 1;
  }
}
