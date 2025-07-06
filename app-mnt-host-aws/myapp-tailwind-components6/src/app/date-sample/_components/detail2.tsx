"use client";

import {
  compareMatch,
  compareMatchAssersions,
  DateFormat,
  fmt,
} from "@/lib/date-utils/date-utils";

export interface props {
  old: Date,
  late: Date,
}
const Detail2 = (opts: props) => {


  return (
    <div className='flex flex-col gap-3 bg-blue-100 p-3'>
      <div>
        【日付１】　{fmt(opts.old, `${DateFormat.yyyyMMdd_hy} ${DateFormat.h24mmssfff}`)}
      </div>
      <div>
        【日付２】　{fmt(opts.late, `${DateFormat.yyyyMMdd_hy} ${DateFormat.h24mmssfff}`)}
      </div>

      <div>
        <hr className="m-3 color-gray-500"/>
      </div>

      <div>
        【同日の比較（日付１=日付１）】<br />　{`${compareMatch(opts.old, opts.old, compareMatchAssersions.EqualThan)}`}
      </div>
      <div>
        【同日の比較（日付１&lt;=日付１）】<br />　{`${compareMatch(opts.old, opts.old, compareMatchAssersions.LessEqualThan)}`}
      </div>
      <div>
        【同日の比較（日付１&lt;日付１）】<br />　{`${compareMatch(opts.old, opts.old, compareMatchAssersions.LessThan)}`}
      </div>
      
      <div>
        <hr className="m-3 color-gray-500"/>
      </div>

      <div>
        【相違日の比較（日付１&lt;日付２）】<br />　{`${compareMatch(opts.old, opts.late, compareMatchAssersions.LessThan)}`}
      </div>
      <div>
        【相違日の比較（日付２&lt;日付１）】<br />　{`${compareMatch(opts.late, opts.old, compareMatchAssersions.LessThan)}`}
      </div>
      
    </div>
  );
}

export default Detail2;