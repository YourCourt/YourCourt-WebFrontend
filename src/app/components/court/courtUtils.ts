import { Router } from '@angular/router';

let courtTypesArray: Array<{ display: string; value: string; }> = [{ display: 'Rápida', value: 'HARD' }, { display: 'Tierra batida', value: 'CLAY' }]
export const courtTypes: Map<string, string> = new Map(courtTypesArray.map(i => [i.display, i.value]));

function getKeyByValue(map: Map<string, string>, searchValue: any): string {
  let valueResult: string = '';

  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      valueResult = key;
    }
  }
  return valueResult;
}

export function getCourtType(inputType: string) {
  return getKeyByValue(courtTypes, inputType)
}

export class BookingHour {
  start: string;
  end: string;
}

export const hours: Array<BookingHour> = [
  { start: '08:30', end: '10:00' },
  { start: '10:00', end: '11:00' },
  { start: '11:00', end: '12:00' },
  { start: '12:00', end: '13:00' },
  { start: '13:00', end: '14:00' },
  { start: '14:00', end: '15:00' },
  { start: '17:00', end: '18:00' },
  { start: '18:00', end: '19:00' },
  { start: '19:00', end: '20:00' },
  { start: '20:00', end: '21:00' },
  { start: '21:00', end: '22:00' },
];

function checkAvailability(
  bookingsByDate: BookingHour[],
  tupleHour: BookingHour
) {
  if (
    bookingsByDate.some(
      (booking) =>
        booking.start === tupleHour.start && booking.end === tupleHour.end
    )
  ) {
    return false;
  } else {
    return true;
  }
}

export function getAvailability(
  bookingsByDate: Array<BookingHour>,
  today: boolean
) {
  let possibleHours = hours;
  var availability: any = {};

  for (var tupleHour of possibleHours) {
    if (today) {
      let todayHours = new Date().getHours();
      let todayMinutes = new Date().getMinutes();
      let tupleHourSplit = tupleHour.start.split(':');
      let tupleHourHours = Number(tupleHourSplit[0]);
      let tupleHourMinutes = Number(tupleHourSplit[1]);

      switch (todayHours >= tupleHourHours) {
        case true: {
          if (
            (todayHours == tupleHourHours &&
              todayMinutes >= tupleHourMinutes) ||
            todayHours > tupleHourHours
          ) {
            availability[tupleHour.start] = false;
          } else {
            availability[tupleHour.start] = checkAvailability(
              bookingsByDate,
              tupleHour
            );
          }
          break;
        }
        case false: {
          availability[tupleHour.start] = checkAvailability(
            bookingsByDate,
            tupleHour
          );
          break;
        }
      }
    }

    if (!today) {
      availability[tupleHour.start] = checkAvailability(
        bookingsByDate,
        tupleHour
      );
    }
  }
  return availability;
}
