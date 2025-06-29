import { Position } from "@xyflow/system";
import { mergeProps } from "solid-js";
import type { BuiltInNode, NodeProps } from "../../types/nodes";
import { Handle } from "../Handle";

export function OutputNode(_p: NodeProps<BuiltInNode>) {
	const p = mergeProps({ targetPosition: Position.Top }, _p);

	return (
		<>
			<Handle
				type="target"
				position={p.targetPosition}
				isConnectable={p.isConnectable}
			/>
			{p.data?.label}
		</>
	);
}
