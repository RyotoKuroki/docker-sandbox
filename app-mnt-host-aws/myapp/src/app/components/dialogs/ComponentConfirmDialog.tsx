"use client";

//import styles from "./../page.module.css";
import styles from "./component.module.css";
import React, { useState, useEffect } from "react";

interface Props {
  isOpened: boolean;
  title: string;
  content: React.ReactNode;
  onOK: () => void;
  onCANCEL: () => void;
}

const ComponentConfirmDialog: React.FC<Props> = ({
  isOpened,
  title,
  content,
  onOK,
  onCANCEL,
}) => {

  const dialogStyle = {
    "width": "100%",
    "height": "100%",
    /*"backgroundColor": "lightgray",*/
    "textAlign": "center",
    "position": "fixed",
    "top": "0",
    "left": "0",
  };
  const overlayStyle = {
    "width": "100%",
    "height": "100%",
    "backgroundColor": "black",
    "opacity": "0.55",
    "textAlign": "center",
    "position": "fixed",
    "top": "0",
    "left": "0",
  };
  const contentStyle = {
    "width": "50%",
    "height": "50%",
    "backgroundColor": "snow",
    "color": "black",
    "textAlign": "center",
    "position": "fixed",
    "top": "25%",
    "left": "25%",
  };

  return (
        <div className={`modal ${isOpened ? "modal-open" : ""}`} style={dialogStyle} id="ComponentConfirmDialog">
          <div style={overlayStyle}></div>
          <div style={contentStyle}>
            <div className="modal-content">
              {title}
            </div>
            <div className="modal-content">
              {content}
              <button onClick={onOK}>OK</button>
              <button onClick={onCANCEL}>CANCEL</button>
            </div>
          </div>
        </div>
  );
}
export default ComponentConfirmDialog;