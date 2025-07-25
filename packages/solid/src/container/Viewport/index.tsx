import type { ParentProps } from "solid-js";
import { useStore } from "../../hooks/useStore";
import type { SolidFlowState } from "../../types";

const selector = (s: SolidFlowState) => () =>
	`translate(${s.transform.get()[0]}px,${s.transform.get()[1]}px) scale(${s.transform.get()[2]})`;

export function Viewport(p: ParentProps) {
	const transform = useStore(selector);

	return (
		<div
			class="solid-flow__viewport xyflow__viewport solid-flow__container"
			style={{ transform: transform() }}
		>
			{p.children}
		</div>
	);
}
