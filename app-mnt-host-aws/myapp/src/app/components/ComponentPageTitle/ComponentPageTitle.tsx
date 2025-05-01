"use client";

import styles from "./../page.module.css";
import React, { useState, useEffect } from "react";

interface Props {
  title: string;
}

const titleStyle = {
  "top": 0,
  "textAlign": "center",
};

const ComponentPageTitle: React.FC<Props> = ({
  title
}) => {
  return (
    <header>
      <h1 style={ titleStyle }>
        {title}
      </h1>
    </header>
  );
}
export default ComponentPageTitle;