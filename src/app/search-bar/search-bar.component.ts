import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() submitted = new EventEmitter<string>(); // TS generic anotation
  term = '';
  constructor() { }

  // helper functions
  onFormSubmit(event: any) {
    event.preventDefault();
    this.submitted.emit(this.term)  // broadcasting 'submitted' with payload of 'term' as a string;
  }

  ngOnInit(): void {
  }

}
