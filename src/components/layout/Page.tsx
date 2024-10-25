import type { PropsWithChildren } from "react";
import type { Component } from "../../utils/types";
import { mergeClass } from "../../utils/css";

export default function Page({
	children,
	className,
}: Component<PropsWithChildren>) {
	return (
		<div
			className={mergeClass(
				"px-lg mx-auto w-full max-w-[1280px] h-full",
				className,
			)}
		>
			{children}
		</div>
	);
}
