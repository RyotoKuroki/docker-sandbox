"use client";

import {
  compareMatch,
  compareMatchAssersions,
  convertToDate,
  DateFormat,
  fmt,
} from "@/lib/date-utils/date-utils";

const Detail3 = () => {

  return (
    <div className='flex flex-col gap-3 bg-blue-100 p-3'>
      <div>
        【正常ケース】　{`${fmt(convertToDate("2025/07/08", "13:14")!, DateFormat.yyyyMMdd_hy+" "+DateFormat.h12mmssfff)}`}
      </div>
      
      <div>
        <hr className="m-3 color-gray-500"/>
      </div>

      <div>
        【正常ケース】　{`${fmt(convertToDate("2025-07-09")!, DateFormat.yyyyMMdd_hy+" "+DateFormat.h12mmssfff)}`}
      </div>
      
      <div>
        <hr className="m-3 color-gray-500"/>
      </div>

      <div>
        【異常ケース】　{`${fmt(convertToDate("2025-07", "13:14")!, DateFormat.yyyyMMdd_hy+" "+DateFormat.h12mmssfff)}`}
      </div>
      
    </div>
  );
}

export default Detail3;