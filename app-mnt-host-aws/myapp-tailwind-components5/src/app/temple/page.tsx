"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  LabelInputBlockArea,
  LabelInputBlock,
  LabelBlock,
  InputBlock,

  LabelInputBlockAreaNoBG,
  LabelInputBlockNoBG,
  LabelBlockNoBG,
  InputBlockNoBG,
} from "@/app/components/LabelInputBlock";

export default function Home() {

  return (
    <div className="flex flex-center justify-center">

      {/*  spacer */}
      <div className="flex-col space-y-4 w-[95%] my-4">

        {/*  title */}
        <div className="flex flex-row-3">
          <h1>xxxxxxxxxxxxxxx</h1>
          <div>？</div>
        </div>

        {/*  body（別ファイル） */}
        <div className="flex-col space-y-7">

          {/*  section */}
          <div>
            <h3>単票形式サンプル１</h3>
            <LabelInputBlockArea>
              <LabelInputBlock>
                <LabelBlock className="">
                  ラベルるるるるr
                </LabelBlock>
                <InputBlock className="flex flex-row space-x-3">
                  <div>
                    <label>
                      <input type="radio" />aaaaaaa
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" />bbbbbbbbbbb
                    </label>
                  </div>
                </InputBlock>
              </LabelInputBlock>
              <LabelInputBlock>
                <LabelBlock className="h-[8em]">
                  ラベルるるるるr
                </LabelBlock>
                <InputBlock>
                  <div className="flex flex-col flex-start justify-start items-center space-y-3">
                    <label className="">
                      <input type="radio" />aaaaaaa
                    </label>
                    <label>
                      <input type="radio" />bbbbbbbbbbb
                    </label>
                  </div>
                </InputBlock>
              </LabelInputBlock>

              <LabelInputBlock>
                <LabelBlock className="w-[300px]">
                  ラベルるるるるrdsfawergewedfw
                </LabelBlock>
                <InputBlock className="">
                  <input className="w-full h-full border" />
                </InputBlock>
              </LabelInputBlock>
              <LabelInputBlock>
                <LabelBlock className="w-[300px] h-[10em] items-start">
                  ラベルるるるるrdsfawergewedfw
                </LabelBlock>
                <InputBlock className="h-[10em]">
                  <textarea className="w-full h-full resize-none border" ></textarea>
                </InputBlock>
              </LabelInputBlock>
            </LabelInputBlockArea>
          </div>

          {/*  section */}
          <div>
            <h3>単票形式サンプル２</h3>
            <LabelInputBlockArea className="flex flex-row">
              <div className="w-[60%]">
                <LabelInputBlock>
                  <LabelBlock className="">
                    ラベルるるるるr
                  </LabelBlock>
                  <InputBlock className="border-r">
                    <input className="w-full h-full border" />
                  </InputBlock>
                </LabelInputBlock>
                <LabelInputBlock>
                  <LabelBlock className="w-[300px]">
                    ラベルるるるるrdsfawergewedfw
                  </LabelBlock>
                  <InputBlock className="border-r">
                    <input className="w-full h-full border" />
                  </InputBlock>
                </LabelInputBlock>
                <LabelInputBlock>
                  <LabelBlock className="w-[300px] items-end">
                    ラベルるるるるrdsfawergewedfw
                  </LabelBlock>
                  <InputBlock className="border-r">
                    <input className="w-full h-full border" />
                  </InputBlock>
                </LabelInputBlock>
              </div>
              <div className="flex-1">
                <LabelInputBlock>
                  <LabelBlock className="">
                    ラベルるるるるr
                  </LabelBlock>
                  <InputBlock className="">
                    <input className="w-full h-full border" />
                  </InputBlock>
                </LabelInputBlock>
                <LabelInputBlock>
                  <LabelBlock className="w-[300px]">
                    ラベルるるるるrdsfawergewedfw
                  </LabelBlock>
                  <InputBlock className="">
                    <input className="w-full h-full border" />
                  </InputBlock>
                </LabelInputBlock>
                <LabelInputBlock>
                  <LabelBlock className="w-[300px] items-end">
                    ラベルるるるるrdsfawergewedfw
                  </LabelBlock>
                  <InputBlock className="">
                    <input className="w-full h-full border" />
                  </InputBlock>
                </LabelInputBlock>
              </div>
            </LabelInputBlockArea>
          </div>

          {/*  section */}
          <div>
            <h3>単票形式サンプル３</h3>
            <LabelInputBlockAreaNoBG>
              <LabelInputBlockNoBG>
                <LabelBlockNoBG className="">
                  ラベルるるるるr
                </LabelBlockNoBG>
                <InputBlockNoBG className="">
                  <input className="border w-[400px] h-full" />
                </InputBlockNoBG>
              </LabelInputBlockNoBG>
              <LabelInputBlockNoBG>
                <LabelBlockNoBG className="">
                  * ラベルるるるるr
                </LabelBlockNoBG>
                <InputBlockNoBG className="">
                  <input value={123} className="border w-[400px] h-full"/>
                </InputBlockNoBG>
              </LabelInputBlockNoBG>
            </LabelInputBlockAreaNoBG>
          </div>

          {/*  section */}
          <div className="bg-yellow-300">
            cccccccccccccccccccccccccccccccccc
          </div>

        </div>

      </div>

    </div>
  );
}
