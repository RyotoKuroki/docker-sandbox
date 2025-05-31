import React from 'react';

export type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  onCancel: () => void;
  onOk: () => void;
};

const MyModal = (
  props: ModalProps
) => {
  return props.open ? (
    <>
      <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-48 p-5 flex flex-col items-start rounded-xl absolute z-2000">
        <div>
          {props.children}
        </div>
{/*
        <h1 className="text-xl font-bold mb-5">Title</h1>
        <p className="text-lg mb-5">Dialog Message.</p>
*/}
        <div className="flex mt-auto w-full">
          <button
            className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
            onClick={() => props.onOk()}
          >
            OK
          </button>
        </div>
      </div>
      <div
        className="fixed top-[0px] left-[0px] bg-black opacity-[50%] w-full h-full z-1000"
        onClick={() => props.onCancel()}
      ></div>
    </>
  ) : (
    <></>
  );
};

export default MyModal;
