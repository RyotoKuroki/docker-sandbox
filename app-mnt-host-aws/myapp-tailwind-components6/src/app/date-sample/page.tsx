"use client";

import { IDateHumanity, monthOpts, toDateHumanity } from '@/lib/date-utils/date-humanity';
import Detail1 from './_components/detail1';
import Detail2 from './_components/detail2';
import Detail3 from './_components/detail3';

export default function DateSample() {

  // 引数無しの場合、new Date() と同等の値を返す
  const currentDate = toDateHumanity();

  // 引数アリの場合、指定の日時の Dateオブジェクトを生成可能
  const customeDate = toDateHumanity({
    year: 2025,
    month: monthOpts.month3,
    day: 31,
    hour24: 23,
    minute: 59,
    second: 59,
    msecond: 999,
  } as IDateHumanity);


  // for compare
  const compareDateOld = toDateHumanity({
    year: 2025,
    month: monthOpts.month5,
    day: 10,
    hour24: 9,
    msecond: 0,
  } as IDateHumanity);
  const compareDateLate = toDateHumanity({
    year: 2025,
    month: monthOpts.month5,
    day: 10,
    hour24: 9,
    msecond: 1,
  } as IDateHumanity);



  return (
    <div className="flex flex-center justify-center">
      <div className='flex flex-row gap-3'>

        <Detail1 date={currentDate} />
        
        <Detail1 date={customeDate} />

        <Detail2 old={compareDateOld} late={compareDateLate} />

        <Detail3 />
      </div>
    </div>
  );
}
