"use client";

import React from "react";
//import styles from "./../page.module.css";
import styles from "./component.module.css";

interface Props {
  title: string;
//elm: React.ReactNode;
  elm: React.ReactElement;
  labelstyle: string;
  inputstyle: string;
}

const ComponentInfoBox: React.FC<Props> = ({
  title,
//elm,
  elm,
  labelstyle,
  inputstyle,
}) => {
  return (
    <div className={`${styles.horizontal} ${styles.cols1}`}>
      <div className={labelstyle}>
        { title }
      </div>
      <div className={inputstyle}>
        { elm }
      </div>
    </div>
  );
}
export default ComponentInfoBox;