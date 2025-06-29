import { type Component, createMemo } from "solid-js";
import type { StepEdgeProps } from "../../types";
import { SmoothStepEdge } from "./SmoothStepEdge";

function createStepEdge(params: {
	isInternal: boolean;
}): Component<StepEdgeProps> {
	return (p: StepEdgeProps) => {
		const pathOptions = createMemo(() => ({
			borderRadius: 0,
			offset: p.pathOptions?.offset,
		}));

		return (
			<SmoothStepEdge
				{...p}
				id={params.isInternal ? undefined : p.id}
				pathOptions={pathOptions()}
			/>
		);
	};
}

const StepEdge = createStepEdge({ isInternal: false });
const StepEdgeInternal = createStepEdge({ isInternal: true });

// TODO: add these back
// StepEdge.displayName = 'StepEdge';
// StepEdgeInternal.displayName = 'StepEdgeInternal';

export { StepEdge, StepEdgeInternal };
