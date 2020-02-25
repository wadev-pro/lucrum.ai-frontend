import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DASHBOARD_DATES } from 'app/core/constants';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-lucram-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentSelection: String = '';
  today = moment().format();
  calendarDateRange = {
    begin: this.today,
    end: this.today,
  };

  @Input() dateRange: {
    begin: string | Date;
    end: string | Date;
  };
  @Output() onChange = new EventEmitter();

  public dates = DASHBOARD_DATES;
  public selectedDate: any;

  constructor() {}

  ngOnInit() {
    const defaultSelection = this.dates[0];

    if (!this.dateRange) {
      this.selectedDate = defaultSelection.name;
      this.calendarDateRange = {
        begin: this.getMomentDate(defaultSelection.value.start_date),
        end: this.getMomentDate(defaultSelection.value.end_date),
      };
      return;
    }
    this.currentSelection = 'custom';
    this.calendarDateRange = { ...this.dateRange };
  }

  onCustomDateRangeChange() {
    const { begin, end } = this.calendarDateRange;
    const selectedRange = {
      start_date: moment(begin).format('YYYY-MM-DD 00:00:00'),
      end_date: moment(end).format('YYYY-MM-DD 23:59:59'),
    };
    this.currentSelection = 'custom';
    this.onChange.emit(selectedRange);
  }

  onPredefinedDateRangeChange() {
    this.currentSelection = '';
    const selection = this.dates.filter(
      item => item.name === this.selectedDate
    )[0];
    const selectedRange = {
      start_date: selection.value.start_date,
      end_date: selection.value.end_date,
    };
    this.calendarDateRange = {
      begin: this.getMomentDate(selectedRange.start_date),
      end: this.getMomentDate(selectedRange.end_date),
    };
    this.onChange.emit(selectedRange);
  }

  getMomentDate(date: string): Date {
    return moment(date).toDate();
  }
}
