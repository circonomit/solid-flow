import cc from "classcat";
import { splitProps } from "solid-js";
import type { ControlButtonProps } from "./types";

export function ControlButton(p: ControlButtonProps) {
	// { children, className, ...rest }: ControlButtonProps) {
	const [_, rest] = splitProps(p, ["children", "class"]);

	return (
		<button
			type="button"
			class={cc(["solid-flow__controls-button", p.class])}
			{...rest}
		>
			{p.children}
		</button>
	);
}
