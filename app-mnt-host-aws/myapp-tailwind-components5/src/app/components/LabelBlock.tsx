//import React, { ReactNode } from 'react';
import React, { useState, useRef, useImperativeHandle, forwardRef, ReactNode } from 'react';
import { cn } from "@/lib/utils" // utility関数のパスはプロジェクトに合わせて変更してください

interface ComposableComponentProps {
    children: ReactNode;
    className?: string;
}

/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 *
 * このコンポーネントは、渡された子要素を単一のコンテナ要素でラップし、
 * 共通のスタイルやレイアウトを適用するために使用できます。
 *
 * @param {ReactNode} children - 表示する子要素。任意のReactノード（要素、コンポーネント、テキストなど）を受け入れます。
 * @param {string} [className] - コンテナ要素に適用する追加のCSSクラス名（Tailwind CSS）。
 */
const LabelBlock = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "flex flex-col gap-4", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
LabelBlock.displayName = "LabelBlock";


export {
    LabelBlock,
};
