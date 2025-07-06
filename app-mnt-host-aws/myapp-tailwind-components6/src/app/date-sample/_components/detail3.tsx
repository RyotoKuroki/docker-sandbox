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
        【正常ケース】　{`${convertToDate("2025/07/08", "13:14")}`}
      </div>
      
      <div>
        <hr className="m-3 color-gray-500"/>
      </div>

      <div>
        【正常ケース】　{`${convertToDate("2025-07-08", "13:14")}`}
      </div>
      
    </div>
  );
}

export default Detail3;