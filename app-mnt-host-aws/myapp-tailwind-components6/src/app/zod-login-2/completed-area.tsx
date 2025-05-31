import React from 'react';
import { cn } from '@/lib/utils';

// WrapperProps から ref は削除し、React.forwardRef のジェネリクスで指定
interface CompletedAreaProps {
  title: string;
  className?: string;
}

// React.forwardRef を使用
// 最初のジェネリクス引数: 転送される ref の型 (このコンポーネントのルート要素の型)
// 2番目のジェネリクス引数: props の型 (children, title, className)
const CompletedArea = React.forwardRef<HTMLDivElement, CompletedAreaProps>(
  ({ title, className }, ref) => { // ref は2番目の引数として受け取る
    return (
      <>
        <h1 className={cn("text-xl font-bold mb-5", className)}>{title}</h1>
        <p className="text-lg mb-5">Dialog Message.</p>
      </>
    );
  }
);

CompletedArea.displayName = 'CompletedArea'; // デバッグ時の表示名を指定 (任意だが推奨)

export default CompletedArea;