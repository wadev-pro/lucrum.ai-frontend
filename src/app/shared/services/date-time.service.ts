import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

export interface IDateRange {
  begin: Date;
  end: Date;
}

export interface IDateRangeSelection {
  start_date: string;
  end_date: string;
}

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}
  startDateFormat = 'YYYY-MM-DD 00:00:00';
  endDateFormat = 'YYYY-MM-DD 23:59:59';

  static getDateRangeFromSelection(
    dateRangeSelection: IDateRangeSelection
  ): IDateRange {
    return {
      begin: moment(dateRangeSelection.start_date).toDate(),
      end: moment(dateRangeSelection.end_date).toDate(),
    };
  }

  getDefaultDateRange(): IDateRange {
    return {
      begin: moment().format(this.startDateFormat),
      end: moment().format(this.endDateFormat),
    };
  }

  getFormattedStartDate(date: Date): string {
    return moment(date).format(this.startDateFormat);
  }

  getFormattedEndDate(date: Date): string {
    return moment(date).format(this.endDateFormat);
  }

  getFormattedDateRangeSelection(dateRange: IDateRange): IDateRangeSelection {
    return {
      start_date: this.getFormattedStartDate(dateRange.begin),
      end_date: this.getFormattedEndDate(dateRange.end),
    };
  }
}
