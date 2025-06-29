import { type ParentProps, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { useStore } from "../../hooks/useStore";
import type { SolidFlowState } from "../../types";

const selector = (state: SolidFlowState) => () =>
	state.domNode.get()?.querySelector(".solid-flow__renderer");

export function NodeToolbarPortal(p: ParentProps) {
	const wrapperRef = useStore(selector);

	return (
		<Show when={wrapperRef()}>
			{(el) => {
				return <Portal mount={el()}>{p.children}</Portal>;
			}}
		</Show>
	);
}
