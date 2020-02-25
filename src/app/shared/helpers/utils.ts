import { formatCurrency } from '@angular/common';
import { Filter } from 'app/shared/models/common.model';
import * as moment from 'moment-timezone';

export function getIndexBy(array: Array<{}>, { name, value }): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i][name] === value) {
      return i;
    }
  }
  return -1;
}

export function sortByFilter(filter: Filter, data: Array<any>) {
  if (filter.order_dir === 'asc') {
    return data.sort((a, b) => {
      if (!a[filter.order_by]) {
        return -1;
      }
      if (!b[filter.order_by]) {
        return 1;
      }
      return a[filter.order_by] > b[filter.order_by] ? 1 : -1;
    });
  } else {
    return data.sort((a, b) => {
      if (!a[filter.order_by]) {
        return 1;
      }
      if (!b[filter.order_by]) {
        return -1;
      }
      return a[filter.order_by] < b[filter.order_by] ? 1 : -1;
    });
  }
}

export function filterBySearch(
  searchKey: string,
  filterableFields: Array<string>,
  data: Array<any>
) {
  return data.filter((item: any) => {
    return filterableFields.reduce((memo, filter_item) => {
      let result = false;
      if (typeof item[filter_item] === 'string') {
        result =
          memo ||
          item[filter_item].toLowerCase().indexOf(searchKey.toLowerCase()) !==
            -1;
      } else if (typeof item[filter_item] === 'number') {
        result =
          memo ||
          item[filter_item]
            .toString()
            .toLowerCase()
            .indexOf(searchKey.toLowerCase()) !== -1;
      } else {
        result = memo;
      }
      return result;
    }, false);
  });
}

export function getBoolColor(value: any) {
  if (value === true) {
    return 'primary';
  } else if (value === false) {
    return 'warn';
  }
  return '';
}

export function getBoolLabel(value: any) {
  if (value === true) {
    return 'Yes';
  } else if (value === false) {
    return 'No';
  }
  return 'n/a';
}

export function getCurrentUTCTime() {
  return moment.utc(new Date()).format();
}

export function getReadableFileSizeString(fileSizeInBytes) {
  let i = -1;
  const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

export function getProcessingStatusColor(statusCode: number) {
  switch (statusCode) {
    case 8:
    case 11:
    case 12:
    case 13:
    case 15:
    case 18:
      return 'warn';
  }
  return 'accent';
}

export function getRoleName(role: number) {
  switch (role) {
    case 1:
      return 'Admin';
    case 2:
    default:
      return 'User';
  }
}

export function getReportType($type) {
  switch ($type) {
    case '1':
      return 'Lead';
  }
  return '';
}

export function getReportStatus($status) {
  switch ($status) {
    case 2:
      return '<span class="text-green"><b>Completed</b></span>';
    case 3:
      return '<span class="text-red"><b>Failed</b></span>';
  }
  return '<span class="">In Progress</span>';
}

export function getUniqFileName(file: File) {
  const arr = file.name.split('.');
  const fileName = arr.slice(0, -1).join('.'),
    fileExtension = arr.pop();
  return fileName + `_${new Date().getTime()}.${fileExtension}`;
}
