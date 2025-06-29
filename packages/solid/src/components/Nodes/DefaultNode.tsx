import { Position } from "@xyflow/system";
import { mergeProps } from "solid-js";
import type { BuiltInNode, NodeProps } from "../../types/nodes";
import { Handle } from "../Handle";

export function DefaultNode(_p: NodeProps<BuiltInNode>) {
	const p = mergeProps(
		{
			targetPosition: Position.Top,
			sourcePosition: Position.Bottom,
		},
		_p,
	);

	return (
		<>
			<Handle
				type="target"
				position={p.targetPosition}
				isConnectable={p.isConnectable}
			/>
			{p.data?.label}
			<Handle
				type="source"
				position={p.sourcePosition}
				isConnectable={p.isConnectable}
			/>
		</>
	);
}
