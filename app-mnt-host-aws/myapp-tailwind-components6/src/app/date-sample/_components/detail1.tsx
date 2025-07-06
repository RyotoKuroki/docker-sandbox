"use client";

import {
  DateFormat,
  fmt,
  editDate,
  getFiscalYear,
} from "@/lib/date-utils/date-utils";
import {
  IDateHumanity,
  monthOpts,
  toDateHumanity,
  fromDateHumanity } from '@/lib/date-utils/date-humanity';

export interface props {
  date: Date
}
const Detail1 = (opts: props) => {

  return (
    <div className='flex flex-col gap-3 bg-blue-100 p-3'>
      <div>
        【現在（デフォルト）】<br />　{opts.date.toString()}
      </div>
      
      <div>
        <hr className="m-3 color-gray-500"/>
      </div>

      <div>
        【年度（境界確認）】　{getFiscalYear(opts.date)}
      </div>
      <div>
        【/形式】　{fmt(opts.date, DateFormat.yyyyMMdd_sr)}
      </div>
      <div>
        【-形式】　{fmt(opts.date, DateFormat.yyyyMMdd_hy)}
      </div>
      <div>
        【日時（24形式）】　{fmt(opts.date, `${DateFormat.yyyyMMdd_hy} ${DateFormat.h24mm}`)}
      </div>
      <div>
        【日時（12形式）】　{fmt(opts.date, `${DateFormat.yyyyMMdd_hy} ${DateFormat.h12mm}`)}
      </div>
      <div>
        【時刻】　{fmt(opts.date, `${DateFormat.h24mmssfff}`)}
                    {"、　"}{fmt(opts.date, `${DateFormat.h24mmss}`)}
                    {"、　"}{fmt(opts.date, `${DateFormat.h24mm}`)}
      </div>
      <div>
        【人間観点の値】　<br />
        {"　年= "}{fromDateHumanity(opts.date)?.year}<br />
        {"　月= "}{fromDateHumanity(opts.date)?.month}<br />
        {"　日= "}{fromDateHumanity(opts.date)?.day}<br />
        {"　時= "}{fromDateHumanity(opts.date)?.hour24}<br />
        {"　分= "}{fromDateHumanity(opts.date)?.minute}<br />
        {"　秒= "}{fromDateHumanity(opts.date)?.second}<br />
        {"　㍉秒= "}{fromDateHumanity(opts.date)?.msecond}<br />
      </div>
      
      <div>
        <hr className="m-3 color-gray-500"/>
      </div>

      <div>
        【+1ミリ秒】　
        {fmt(
            editDate(opts.date, {mseconds: 1}),
            `${DateFormat.yyyyMMdd_hy} ${DateFormat.h24mmssfff}`)
        }
      </div>
      <div>
        【+1ミリ秒の年度】　
        {
          getFiscalYear(
            editDate(opts.date, {mseconds: 1}))
        }
      </div>
    </div>
  );
}

export default Detail1;