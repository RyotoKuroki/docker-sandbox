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
} from "date-fns";

console.log(`log load lib/dateUtils.ts`, new Date().toString());

export const editDate = (
  date: Date,
  addOptions: {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    mseconds?: number;
  },
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
};

/**
 * 日付文字列と時刻文字列を結合し、Dateオブジェクトに変換します。
 * 変換できない場合はnullを返します。
 *
 * @param dateString - yyyy/MM/dd形式の日付文字列 (例: '2025/07/06')
 * @param timeString - hh:mm形式の時刻文字列 (例: '15:30')
 * @returns 変換されたDateオブジェクト、または変換できない場合はnull
 */
export function convertToDate(dateString: string, timeString?: string): Date | null {
  try {
    // yyyy-MM-dd
    const regexYMD_hy = /^\d{4}-\d{2}-\d{2}$/;
    const isMatchYMD_hy = regexYMD_hy.test(dateString);
    // yyyy/MM/dd
    const regexYMD_sr = /^\d{4}\/\d{2}\/\d{2}$/;
    const isMatchYMD_sr = regexYMD_sr.test(dateString);

    if (!isMatchYMD_hy && !isMatchYMD_sr) return null;
    let combinedStr = "";
    if (isMatchYMD_hy) combinedStr += dateString;
    if (isMatchYMD_sr) combinedStr += dateString;

    // hh:mm
    const regex_hm = /\d{2}\:\d{2}$/;
    const isMatchHM = regex_hm.test(timeString ?? "");
    if (isMatchHM) combinedStr += ` ${timeString}`;
    else combinedStr += ` 00:00`;

    console.log("CombinedStr = ", combinedStr);
    const parsedDate = new Date(combinedStr);

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
export const fmt = (date: Date, formatType: DateFormat | string) => {
  if (!date) return "";

  return format(date, formatType);
};

/**
 * Dateオブジェクトから元号を含む年月日日時を取得する関数
 *
 * @param date フォーマットするDateオブジェクト
 * @returns 元号を含む年月日日時文字列 (例: "令和6年7月6日 15時30分00秒")
 */
export const getDateEssence = (
  date: Date,
): {
  /** 元号を取得（例：令和） */
  era: string;
  /** 年を取得 */
  year: {
    /** 年を取得（和暦） */
    asEra: number;
    /** 年を取得（西暦） */
    asGregorian: number;
  };
  /** 月を取得 */
  month: {
    /** 機械にとって標準の月（例：1月を『０』で表現） */
    asMachine: number;
    /** 人間にとって標準の月（例：1月を『1』で表現） */
    asHuman: number;
  };
  /** 日を取得 */
  day: number;
  /** 時を取得 */
  hour: number;
  /** 分を取得 */
  minute: number;
  /** 秒を取得 */
  second: number;
  /** ㍉秒を取得 */
  msecond: number;
  /** 曜日を取得 */
  dayOfWeek: {
    /** 日本語表記（ロング） */
    jpl: string;
  };
} | null => {
  if (!date) return null;

  const parts = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    era: "long", // 元号を長い形式で表示 (例: "令和")
    year: "numeric", // 年を数値で表示
    month: "long", // 月を長い形式で表示 (例: "7月")
    day: "numeric", // 日を数値で表示
    hour: "numeric", // 時を数値で表示
    minute: "numeric", // 分を数値で表示
    second: "numeric", // 秒を数値で表示
    hourCycle: "h23", // 24時間表記 (h12は12時間表記)
  }).formatToParts(date);

  //console.log(`toParts : `, JSON.stringify(parts));
  /*
  　→出力：toParts :[
            {"type":"era","value":"令和"},{"type":"year","value":"7"},{"type":"literal","value":"年"},
            {"type":"month","value":"7"},{"type":"literal","value":"月"},
            {"type":"day","value":"27"},{"type":"literal","value":"日 "},
            {"type":"hour","value":"10"},{"type":"literal","value":":"},
            {"type":"minute","value":"24"},{"type":"literal","value":":"},
            {"type":"second","value":"15"}]
  */
  const dayOfWeek = getDayOfWeek(date);

  return {
    era: parts.filter((pt) => pt.type == "era")[0].value,
    year: {
      /** 和暦 */
      asEra: parseInt(parts.filter((pt) => pt.type == "year")[0].value),
      /** 西暦 */
      asGregorian: date.getFullYear(),
    },
    month: {
      /** 機械にとって標準の月（例：1月を『０』で表現） */
      asMachine: date.getMonth(),
      /** 人間にとって標準の月（例：1月を『1』で表現） */
      asHuman: date.getMonth() + 1,
    },
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    msecond: date.getMilliseconds(),
    dayOfWeek: {
      jpl: dayOfWeek,
    },
  };
};

/**
 * Dateオブジェクトから曜日を取得する関数
 *
 * @param date 曜日を取得するDateオブジェクト
 * @param weekdayFormat 曜日の表示形式 ('long', 'short', 'narrow')。デフォルトは 'long'。
 * @returns 曜日文字列 (例: "日曜日", "日", "日")
 */
export function getDayOfWeek(date: Date, weekdayFormat: "long" | "short" | "narrow" = "long"): string {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    weekday: weekdayFormat, // 曜日のみを指定
  });
  return formatter.format(date);
}

/**
 * 指定されたDateオブジェクトから年度を算出します。
 * 年度開始月は0-indexed (1月=0, 4月=3) で指定します。
 *
 * @param date - 年度を算出する対象のDateオブジェクト
 * @param fiscalYearStartMonth - (オプション) 年度開始月 (0-indexed)。デフォルトは3 (4月)。
 * @returns 算出された年度 (例: 2024)
 */
export function getFiscalYear(date: Date, fiscalYearStartMonth: number = 3): number {
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
export const compareMatch = (old: Date, late: Date, assersion: compareMatchAssersions): boolean => {
  const comparedResult = compareAsc(old, late);
  if (comparedResult == 0) {
    console.log(`comparedResult == 0,  compare1=${old}, compare2=${late}`);
    return assersion == compareMatchAssersions.EqualThan || assersion == compareMatchAssersions.LessEqualThan;
  } else if (comparedResult < 0) {
    console.log(`comparedResult < 0,  compare1=${old}, compare2=${late}`);
    return assersion == compareMatchAssersions.LessThan || assersion == compareMatchAssersions.LessEqualThan;
  }

  console.log(`comparedResult > 0,  compare1=${old}, compare2=${late}`);
  return false;
};

// --- 使用例 ---
/*
console.log('--- 元号を含む日時フォーマット ---');

// 現在の日時
const now = new Date();
console.log(`現在日時: ${formatDateTimeWithJapaneseEra(now)}`);

// 特定の日時 (平成の例)
const heiseiDate = new Date(2019, 3, 30, 18, 0, 0); // 2019年4月30日 18:00:00 (平成最後の日)
console.log(`平成の日時: ${formatDateTimeWithJapaneseEra(heiseiDate)}`);

// 特定の日時 (昭和の例)
const showaDate = new Date(1989, 0, 7, 6, 37, 0); // 1989年1月7日 6:37:00 (昭和最後の日)
console.log(`昭和の日時: ${formatDateTimeWithJapaneseEra(showaDate)}`);

// 特定の日時 (大正の例)
const taishoDate = new Date(1926, 11, 25, 1, 25, 0); // 1926年12月25日 1:25:00 (大正最後の日)
console.log(`大正の日時: ${formatDateTimeWithJapaneseEra(taishoDate)}`);

// フォーマットオプションの調整例
export function formatDateTimeWithJapaneseEraShort(date: Date): string {
  const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'short',    // 元号を短い形式で表示 (例: "R")
    year: 'numeric',
    month: '2-digit', // 月を2桁で表示 (例: "07")
    day: '2-digit',   // 日を2桁で表示 (例: "06")
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  return formatter.format(date);
}

console.log(`\n短い形式の例: ${formatDateTimeWithJapaneseEraShort(now)}`);
*/
