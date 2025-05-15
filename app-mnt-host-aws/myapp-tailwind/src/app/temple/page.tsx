import Image from "next/image";

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
        <div className="flex-col space-y-4">

          {/*  section */}
          <div className="bg-yellow-300">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>

          {/*  section */}
          <div className="bg-yellow-300">
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
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
