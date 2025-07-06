/**
 * 人間にとって扱いやすい月定義
 */
export enum monthOpts {
  month1 = 0,
  month2 = 1,
  month3 = 2,
  month4 = 3,
  month5 = 4,
  month6 = 5,
  month7 = 6,
  month8 = 7,
  month9 = 8,
  month10 = 9,
  month11 = 10,
  month12 = 11,
}

/**
 * 人間にとって扱いやすい日付定義
 */
export interface IDateHumanity {
  year: number,
  month: monthOpts,
  day: number,
  hour24: number | undefined,
  minute: number | undefined,
  second: number | undefined,
  msecond: number | undefined,
}

/**
 * 
 * @param opts 
 * @returns 
 */
export const toDateHumanity = (opts?: IDateHumanity) => {
  if (!opts) return new Date();

  return new Date(
    opts.year,
    opts.month,
    opts.day,
    opts.hour24 ?? 0,
    opts.minute ?? 0,
    opts.second ?? 0,
    opts.msecond ?? 0);
}

export const fromDateHumanity = (
  date: Date | null | undefined
): IDateHumanity | null => {
  if (!date) return null;

  //const monthOpt = monthOpts[date.getMonth()];

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // 人間にとって都合の良い値に変換
    //month: monthOpt,
    day: date.getDate(),
    hour24: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    msecond: date.getMilliseconds()} as IDateHumanity;
}
