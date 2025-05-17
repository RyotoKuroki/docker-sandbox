//import React, { ReactNode } from 'react';
import React, { /*useState, useRef, useImperativeHandle,*/ forwardRef, ReactNode } from 'react';
import { cn } from "@/lib/utils" // utility関数のパスはプロジェクトに合わせて変更してください

interface ComposableComponentProps {
    children: ReactNode;
    className?: string;
}

/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 */
const LabelInputBlockArea = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "flex flex-col border rounded-xl overflow-hidden", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
LabelInputBlockArea.displayName = "LabelInputBlockArea";

/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 */
const LabelInputBlock = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "flex flex-row border-b items-center", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
LabelInputBlock.displayName = "LabelInputBlock";

/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 */
const LabelBlock = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "bg-blue-100 border-r w-[200px] h-[55px] p-1 flex items-center", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
LabelBlock.displayName = "LabelBlock";

/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 */
const InputBlock = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "flex-1 h-[55px] p-1 flex items-center", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
InputBlock.displayName = "InputBlock";




/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 */
const LabelInputBlockAreaNoBG = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "flex flex-col rounded-xl overflow-hidden", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
LabelInputBlockAreaNoBG.displayName = "LabelInputBlockAreaNoBG";

/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 */
const LabelInputBlockNoBG = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "flex flex-row space-y-2 flex items-center", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
LabelInputBlockNoBG.displayName = "LabelInputBlockNoBG";

/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 */
const LabelBlockNoBG = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "w-[200px] h-[55px] p-1 flex justify-end items-center", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
LabelBlockNoBG.displayName = "LabelBlockNoBG";

/**
 * 汎用コンポーネント：子要素をラップしてスタイルを適用
 */
const InputBlockNoBG = forwardRef<HTMLDivElement, ComposableComponentProps>(({
    children,
    className,
}) => {

    return (
        <div className={cn(
            "flex-1 h-[55px] p-1 flex items-center", // デフォルトのスタイル：縦並び、要素間に間隔
            className // 追加のクラス名を適用
        )}>
            {children}
        </div>
    );
});
InputBlockNoBG.displayName = "InputBlockNoBG";

export {
    LabelInputBlockArea,
    LabelInputBlock,
    LabelBlock,
    InputBlock,

    LabelInputBlockAreaNoBG,
    LabelInputBlockNoBG,
    LabelBlockNoBG,
    InputBlockNoBG,
};
