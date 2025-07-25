import { isNumeric } from "@xyflow/system";
import cc from "classcat";
import { mergeProps, Show, splitProps } from "solid-js";
import type { BaseEdgeProps } from "../../types";
import { EdgeText } from "./EdgeText";

/**
 * The `<BaseEdge />` component gets used internally for all the edges. It can be
 * used inside a custom edge and handles the invisible helper edge and the edge label
 * for you.
 *
 * @public
 * @example
 * ```jsx
 *import { BaseEdge } from '@circonomit/solid-flow';
 *
 *export function CustomEdge({ sourceX, sourceY, targetX, targetY, ...props }) {
 *  const [edgePath] = getStraightPath({
 *    sourceX,
 *    sourceY,
 *    targetX,
 *    targetY,
 *  });
 *
 *  return <BaseEdge path={edgePath} {...props} />;
 *}
 *```
 *
 * @remarks If you want to use an edge marker with the [`<BaseEdge />`](/api-reference/components/base-edge) component,
 * you can pass the `markerStart` or `markerEnd` props passed to your custom edge
 * through to the [`<BaseEdge />`](/api-reference/components/base-edge) component.
 * You can see all the props passed to a custom edge by looking at the [`EdgeProps`](/api-reference/types/edge-props) type.
 */
export function BaseEdge(_p: BaseEdgeProps) {
	const p = mergeProps(
		{
			interactionWidth: 20,
		},
		_p,
	);

	const [extractedProps, pathProps] = splitProps(p, [
		"path",
		"labelX",
		"labelY",
		"label",
		"labelStyle",
		"labelShowBg",
		"labelBgStyle",
		"labelBgPadding",
		"labelBgBorderRadius",
		"interactionWidth",
		"class",
	]);

	return (
		<>
			<path
				{...pathProps}
				d={extractedProps.path}
				fill="none"
				class={cc(["solid-flow__edge-path", extractedProps.class])}
			/>
			<Show when={extractedProps.interactionWidth}>
				<path
					d={extractedProps.path}
					fill="none"
					stroke-opacity={0}
					stroke-width={extractedProps.interactionWidth}
					class="solid-flow__edge-interaction"
				/>
			</Show>
			<Show
				when={
					extractedProps.label &&
					isNumeric(extractedProps.labelX) &&
					isNumeric(extractedProps.labelY)
				}
			>
				<EdgeText
					x={extractedProps.labelX!}
					y={extractedProps.labelY!}
					label={extractedProps.label}
					labelStyle={extractedProps.labelStyle}
					labelShowBg={extractedProps.labelShowBg}
					labelBgStyle={extractedProps.labelBgStyle}
					labelBgPadding={extractedProps.labelBgPadding}
					labelBgBorderRadius={extractedProps.labelBgBorderRadius}
				/>
			</Show>
		</>
	);
}
