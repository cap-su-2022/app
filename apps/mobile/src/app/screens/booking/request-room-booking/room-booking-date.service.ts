import dayjs from "dayjs";

interface DateRange {start: string; end: string}

export const isDateRangeOverlapWithAnother = (range1: DateRange, range2: DateRange) => {
  console.log(range1)
  console.log(range2)
    return dayjs(range1.start).toDate().getTime() <= dayjs(range2.end).toDate().getTime()
  && dayjs(range1.end).toDate().getTime() >= dayjs(range2.start).toDate().getTime();
}

export const isCheckInDateTimeIsBeforeCurrentDateTime = (checkInDateTime: number, currentDateTime: number) => {
  console.log(checkInDateTime);
  console.log(currentDateTime)
  return checkInDateTime <= currentDateTime;
}
