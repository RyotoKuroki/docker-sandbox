"use client";

import styles from "./page.module.css";
import modalStyle from "./modal.module.css";
import ComponentPageTitle from '@/app/components/ComponentPageTitle/ComponentPageTitle';
import ComponentInfoBox from "@/app/components/ComponentInfoBox/ComponentInfoBox";
import { useState } from "react";
import ComponentConfirmDialog from "../components/dialogs/ComponentConfirmDialog";
//import PageModel from "./page.model";

export default function Home() {
  
  const [prefecture, setPrefecture] = useState("FUKUOKA");
  const [city, setCity] = useState("福岡市");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMsg, setConfirmMsg] = useState<React.ReactNode>("");

  const onClickedSaveBtn = () => {
    setConfirmTitle("保存処理");
    setConfirmMsg(<div>保存しますか？</div>);
    setIsModalOpen(true);
  };
  const onClickedCancelBtn = () => {
    setConfirmTitle("終了処理");
    setConfirmMsg(<div>編集中の内容を破棄しますか？</div>);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.p_1em}>

      <header>
        <ComponentPageTitle title="ほげほげ画面" />
      </header>

      <div className={`${styles.horizontal} ${styles.h_50} ${styles.mt_20}`}>
        <div className={`${styles.horizontal} ${styles.cols3}`}>
          <ComponentInfoBox
            title="ID"
            elm={<input className={`${styles.inputElm}`} />}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_100}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
      </div>

      <div className={`${styles.horizontal} ${styles.h_50}`}>
        <div className={`${styles.horizontal} ${styles.cols3}`}>
          <ComponentInfoBox
            title="氏"
            elm={<input className={`${styles.inputElm}`} />}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_100}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
        <div className={`${styles.horizontal} ${styles.cols3}`}>
          <ComponentInfoBox
            title="名"
            elm={<input className={`${styles.inputElm}`} />}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_100}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
      </div>

      <div className={`${styles.horizontal} ${styles.h_50}`}>
        <div className={`${styles.horizontal} ${styles.cols1}`}>
          <ComponentInfoBox
            title="都道府県"
            elm={<select className={`${styles.inputElm}`} 
            defaultValue={prefecture}>
              <option value=""></option>
              <option value="TOKYO">東京</option>
              <option value="FUKUOKA">福岡</option>
              <option value="NAGASAKI">長崎</option>
            </select>}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
        <div className={`${styles.horizontal} ${styles.cols1}`}>
          <ComponentInfoBox
            title="市町村"
            elm={<input className={`${styles.inputElm}`} defaultValue={city} />}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
      </div>
      <div className={`${styles.vertical} ${styles.h_50}`}>
        <div className={`${styles.horizontal} ${styles.cols1}`}>
          <ComponentInfoBox
            title="番地"
            elm={<input className={`${styles.inputElm}`} />}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
      </div>
      <div className={`${styles.vertical} ${styles.h_50}`}>
        <div className={`${styles.horizontal} ${styles.cols1}`}>
          <ComponentInfoBox
            title="建物"
            elm={<input className={`${styles.inputElm}`} />}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
      </div>

      <div className={`${styles.horizontal} ${styles.h_400}`}>
        <div className={`${styles.horizontal} ${styles.cols1}`}>
          <ComponentInfoBox
            title="メモ"
            elm={<textarea className={`${styles.h_full} ${styles.size_fix}`} defaultValue={`なんとか定型には出来る。\r\nレスポンス対応は出来てない。\r\nスタイルは素直に有名なライブラリ（bootstrap, tailwindcss ...）使った方がいい！`}></textarea>}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_200}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
      </div>

      <div className={`${styles.horizontal} ${styles.gap} ${styles.mt_20}`}>

        <div className={`${styles.cols2} ${styles.h_150}`}>
          <div className={`${styles.h_50}`}>
            <ComponentInfoBox
              title="左１"
              elm={<input className={`${styles.inputElm}`} />}
              labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_100}`}
              inputstyle={`${styles.inputArea}`}
            ></ComponentInfoBox>
          </div>
          <div className={`${styles.h_50}`}>
            <ComponentInfoBox
              title="左２"
              elm={<input className={`${styles.inputElm}`} />}
              labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_100}`}
              inputstyle={`${styles.inputArea}`}
            ></ComponentInfoBox>
          </div>
        </div>

        <div className={`${styles.cols2} ${styles.h_150}`}>
          <div className={`${styles.h_50}`}>
            <ComponentInfoBox
              title="右１"
              elm={<input className={`${styles.inputElm}`} />}
              labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_100}`}
              inputstyle={`${styles.inputArea}`}
            ></ComponentInfoBox>
          </div>
          <div className={`${styles.h_50}`}>
            <ComponentInfoBox
              title="右２"
              elm={<input className={`${styles.inputElm}`} />}
              labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_100}`}
              inputstyle={`${styles.inputArea}`}
            ></ComponentInfoBox>
          </div>
          <div className={`${styles.h_50}`}>
            <ComponentInfoBox
              title="右３"
              elm={<input className={`${styles.inputElm}`} />}
              labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_100}`}
              inputstyle={`${styles.inputArea}`}
            ></ComponentInfoBox>
          </div>
        </div>
      </div>

      <div className={`${styles.horizontal} ${styles.h_50} ${styles.mt_20}`}>
        <div className={`${styles.horizontal} ${styles.cols4}`}>
          <ComponentInfoBox
            title="ほにゃらら１"
            elm={<input className={`${styles.inputElm}`} />}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
        <div className={`${styles.horizontal} ${styles.cols4}`}>
          <ComponentInfoBox
            title="ほにゃらら２"
            elm={<select className={`${styles.inputElm}`} >
              <option value=""></option>
              <option value="hoge1">ほげ１</option>
              <option value="hoge2">ほげ２</option>
            </select>}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
        <div className={`${styles.horizontal} ${styles.cols4}`}>
          <ComponentInfoBox
            title="ほにゃらら３"
            elm={<select className={`${styles.inputElm}`} >
              <option value=""></option>
              <option value="hoge1">ほげ１</option>
              <option value="hoge2">ほげ２</option>
            </select>}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
        <div className={`${styles.horizontal} ${styles.cols4}`}>
          <ComponentInfoBox
            title="ほにゃらら４"
            elm={<select className={`${styles.inputElm}`} >
              <option value=""></option>
              <option value="hoge1">ほげ１</option>
              <option value="hoge2">ほげ２</option>
            </select>}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
      </div>

      <div className={`${styles.horizontal} ${styles.h_50}`}>
        <div className={`${styles.horizontal} ${styles.cols3}`}>
          <ComponentInfoBox
            title="ほにゃらら１"
            elm={<input className={`${styles.inputElm}`} />}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
        <div className={`${styles.horizontal} ${styles.cols3}`}>
          <ComponentInfoBox
            title="ほにゃらら２"
            elm={<select className={`${styles.inputElm}`} >
              <option value=""></option>
              <option value="hoge1">ほげ１</option>
              <option value="hoge2">ほげ２</option>
            </select>}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
        <div className={`${styles.horizontal} ${styles.cols3}`}>
          <ComponentInfoBox
            title="ほにゃらら３"
            elm={<select className={`${styles.inputElm}`} >
              <option value=""></option>
              <option value="hoge1">ほげ１</option>
              <option value="hoge2">ほげ２</option>
            </select>}
            labelstyle={`${styles.labelArea} ${styles.labelStyle} ${styles.w_150}`}
            inputstyle={`${styles.inputArea}`}
          ></ComponentInfoBox>
        </div>
      </div>

      <div className={`${styles.horizontal} ${styles.h_50} ${styles.mt_20}`}>
        <div className={`${styles.horizontal} ${styles.cols2}`}>
          <div className={`${styles.buttonArea} ${styles.w_full}`}>
            <button className={`${styles.w_200}`} onClick={onClickedSaveBtn}>Save</button>
          </div>
        </div>
        <div className={`${styles.horizontal} ${styles.cols2}`}>
          <div className={`${styles.buttonArea}`}>
            <button className={`${styles.w_200}`} onClick={onClickedCancelBtn}>Cancel</button>
          </div>
        </div>
      </div>

      {isModalOpen &&
       (<ComponentConfirmDialog
          isOpened={isModalOpen}
          title={confirmTitle}
          content={confirmMsg}
          onOK={() => {
            alert("OK clicked");
            setIsModalOpen(false);
          }}
          onCANCEL={() => {
            alert("CANCEL clicked");
            setIsModalOpen(false);
          }}
          />)
      }


    </div>
  );
}
