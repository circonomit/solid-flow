import type { EdgeTypes } from "../../types";
import {
	BezierEdgeInternal,
	SimpleBezierEdgeInternal,
	SmoothStepEdgeInternal,
	StepEdgeInternal,
	StraightEdgeInternal,
} from "../Edges";

export const builtinEdgeTypes: EdgeTypes = {
	default: BezierEdgeInternal,
	straight: StraightEdgeInternal,
	step: StepEdgeInternal,
	smoothstep: SmoothStepEdgeInternal,
	simplebezier: SimpleBezierEdgeInternal,
};

export const nullPosition = {
	sourceX: null,
	sourceY: null,
	targetX: null,
	targetY: null,
	sourcePosition: null,
	targetPosition: null,
};
