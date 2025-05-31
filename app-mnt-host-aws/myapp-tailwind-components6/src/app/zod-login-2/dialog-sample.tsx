"use client";

import { useMemo, useState } from "react";

interface Props {
  isOpen: boolean;
  onApplied: () => void;
  onCanceled: () => void;
}

const MyModal: React.FC<Props> = ({
  isOpen,
  onApplied,
  onCanceled,
}) => {
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} id="my-modal">
      <div className="modal-box border-accent border-2 p-[0]">
        <div className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
          Title
        </div>
        <div className="pt-[2em] text-center">
          <div>huhuhu？</div>
        </div>
        <div className="flex flex-col gap-[1rem] p-[1rem] p-[2rem]">
          <div className="flex justify-around">
            <button
              className="btn btn-secondary w-[100px]"
              onClick={onCanceled}
            >
              いいえ
            </button>
            <button className="btn btn-primary w-[100px]" onClick={onApplied}>
              はい
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default MyModal;
