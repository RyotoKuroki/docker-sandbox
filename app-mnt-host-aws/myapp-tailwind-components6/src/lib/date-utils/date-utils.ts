// dateUtils.ts
import {
  compareAsc,
  format,
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parse,
  isValid,
  addYears,
  addMonths,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  addMilliseconds,
} from 'date-fns';

console.log(`log load lib/dateUtils.ts`, new Date().toString());

export const editDate = (
  date: Date,
  addOptions: {
    years?: number,
    months?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    mseconds?: number,
  }
) => {
  let _date = new Date(date);

  _date = addYears(_date, addOptions.years ?? 0);
  _date = addMonths(_date, addOptions.months ?? 0);
  _date = addDays(_date, addOptions.days ?? 0);
  _date = addHours(_date, addOptions.hours ?? 0);
  _date = addMinutes(_date, addOptions.minutes ?? 0);
  _date = addSeconds(_date, addOptions.seconds ?? 0);
  _date = addMilliseconds(_date, addOptions.mseconds ?? 0);

  return _date;
}

/**
 * 日付文字列と時刻文字列を結合し、Dateオブジェクトに変換します。
 * 変換できない場合はnullを返します。
 *
 * @param dateString - yyyy/MM/dd形式の日付文字列 (例: '2025/07/06')
 * @param timeString - hh:mm形式の時刻文字列 (例: '15:30')
 * @returns 変換されたDateオブジェクト、または変換できない場合はnull
 */
export function convertToDate(
  dateString: string,
  timeString: string
): Date | null {

  try {
    
    // yyyy-MM-dd
    const regexYMD_hy = /^\d{4}-\d{2}-\d{2}$/;
    const isMatchYMD_hy = regexYMD_hy.test(dateString);
    // yyyy/MM/dd
    const regexYMD_sr = /^\d{4}\/\d{2}\/\d{2}$/;
    const isMatchYMD_sr = regexYMD_sr.test(dateString);

    // hh:mm
    const regex_hm = /\d{2}\:\d{2}$/;
    const isMatchHM = regex_hm.test(timeString);

    let combinedStr = "";
    if (isMatchYMD_hy) combinedStr += dateString;
    if (isMatchYMD_sr) combinedStr += dateString;
    if (isMatchHM) combinedStr += `T${timeString}`;

    //const combinedStr = `${dateString} ${timeString}`;
    console.log("CombinedStr = ", combinedStr);

    const parsedDate = parse(combinedStr);

    if (!isValid(parsedDate)) {
      return null;
    }

    return parsedDate;

  } catch {
    return null;    
  }
}

/*
export const orderBy = (
  dates: Date[],
  ascing: boolean
) => {
  return ascing
    ? dates.sort(compareAsc)
    : dates.sort(compareDesc);
}
*/

export enum DateFormat {
  yyyyMMdd_hy = "yyyy-MM-dd",
  yyyyMMdd_sr = "yyyy/MM/dd",
  h24mmssfff = "HH:mm:ss.SSS",
  h24mmss = "HH:mm:ss",
  h24mm = "HH:mm",
  h12mmssfff = "hh:mm:ss.SSS",
  h12mmss = "hh:mm:ss",
  h12mm = "hh:mm",
}
export const fmt = (
  date: Date,
  fmt: DateFormat | string
) => {
  return format(date, fmt);
}

/**
 * 指定されたDateオブジェクトから年度を算出します。
 * 年度開始月は0-indexed (1月=0, 4月=3) で指定します。
 *
 * @param date - 年度を算出する対象のDateオブジェクト
 * @param fiscalYearStartMonth - (オプション) 年度開始月 (0-indexed)。デフォルトは3 (4月)。
 * @returns 算出された年度 (例: 2024)
 */
export function getFiscalYear(
  date: Date,
  fiscalYearStartMonth: number = 3
): number {

  const _dt = new Date(date);
  const currentMonth = _dt.getMonth(); // 0-indexed (0: 1月, 1: 2月, ..., 11: 12月)
  const currentYear = _dt.getFullYear();

  //console.log(`input : ${date}`);
  //console.log(`year : ${currentYear}`);
  //console.log(`month : ${currentMonth}`);
  
  // 現在の月が年度開始月以上であれば、現在の年が年度
  // そうでなければ、現在の年の1年前が年度
  if (currentMonth >= fiscalYearStartMonth) {
    return currentYear;
  } else {
    return currentYear - 1;
  }
}


export enum compareMatchAssersions {
  LessEqualThan = "<=",
  LessThan = "<",
  EqualThan = "=",
}
/**
 * 
 * @param old 
 * @param late 
 * @param assersion 
 * @returns 
 */
export const compareMatch = (
  old: Date,
  late: Date,
  assersion: compareMatchAssersions
): boolean => {

  const comparedResult = compareAsc(old, late);
  if (comparedResult == 0) {
    console.log(`comparedResult == 0,  compare1=${old}, compare2=${late}`);
    return assersion == compareMatchAssersions.EqualThan ||
           assersion == compareMatchAssersions.LessEqualThan;
  } else if (comparedResult < 0) {
    console.log(`comparedResult < 0,  compare1=${old}, compare2=${late}`);
    return assersion == compareMatchAssersions.LessThan ||
           assersion == compareMatchAssersions.LessEqualThan;
  }

  console.log(`comparedResult > 0,  compare1=${old}, compare2=${late}`);
  return false;
}