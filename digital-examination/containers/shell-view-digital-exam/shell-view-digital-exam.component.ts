import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitialState } from '../../models/digital-examination.model';
import { getselectedRowData } from '../../state/selectors/digital-examination-selector';
import { Observable } from 'rxjs';
import { pageHeading } from '../../../state/actions/paper-distribution.actions';

@Component({
  selector: 'app-shell-view-digital-exam',
  templateUrl: './shell-view-digital-exam.component.html',
  styleUrls: ['./shell-view-digital-exam.component.scss']
})
export class ShellViewDigitalExamComponent implements OnInit {
  selectedRowData$: Observable<any>;
  constructor(private store: Store<InitialState>) { }

  ngOnInit() {
    this.store.dispatch(pageHeading({value: 'View uploaded digital examination materials'}));
    this.selectedRowData$ = this.store.select(getselectedRowData);
  }
}
