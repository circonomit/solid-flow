import { Position } from "@xyflow/system";
import { mergeProps } from "solid-js";
import type { BuiltInNode, NodeProps } from "../../types/nodes";
import { Handle } from "../Handle";

export function InputNode(_p: NodeProps<BuiltInNode>) {
	const p = mergeProps({ sourcePosition: Position.Bottom }, _p);

	return (
		<>
			{p.data?.label}
			<Handle
				type="source"
				position={p.sourcePosition}
				isConnectable={p.isConnectable}
			/>
		</>
	);
}
