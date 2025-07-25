import type { PanelPosition, ProOptions } from "@xyflow/system";
import { mergeProps, Show } from "solid-js";
import { Panel } from "../Panel";

type AttributionProps = {
	proOptions?: ProOptions;
	position?: PanelPosition;
};

export function Attribution(_p: AttributionProps) {
	// { proOptions, position = 'bottom-right' }: AttributionProps) {
	const p = mergeProps(
		{
			position: "bottom-right" as PanelPosition,
		},
		_p,
	);

	// if (proOptions?.hideAttribution) {
	//   return null;
	// }

	const shouldHide = () => !!p.proOptions?.hideAttribution;

	return (
		<Show when={!shouldHide()}>
			<Panel
				position={p.position}
				class="solid-flow__attribution"
				data-message="Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev"
			>
				<a
					href="https://reactflow.dev"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="React Flow attribution"
				>
					React Flow
				</a>
			</Panel>
		</Show>
	);
}
