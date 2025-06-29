// system types
export {
	type Align,
	type BezierPathOptions,
	type Box,
	type ColorMode,
	type ColorModeClass,
	type Connection,
	type ConnectionInProgress,
	ConnectionLineType,
	ConnectionMode,
	type ConnectionState,
	type ControlLinePosition,
	type ControlPosition,
	type CoordinateExtent,
	type Dimensions,
	type EdgeAddChange,
	type EdgeChange,
	type EdgeMarker,
	type EdgeMarkerType,
	type EdgeRemoveChange,
	type EdgeReplaceChange,
	type EdgeSelectionChange,
	type FinalConnectionState,
	type FitBoundsOptions,
	type HandleType,
	type KeyCode,
	MarkerType,
	type NoConnection,
	type NodeAddChange,
	type NodeChange,
	type NodeConnection,
	type NodeDimensionChange,
	type NodeOrigin,
	type NodePositionChange,
	type NodeRemoveChange,
	type NodeReplaceChange,
	type NodeSelectionChange,
	type OnConnect,
	type OnConnectEnd,
	type OnConnectStart,
	type OnConnectStartParams,
	type OnError,
	type OnMove,
	type OnMoveEnd,
	type OnMoveStart,
	type OnReconnect,
	type OnResize,
	type OnResizeEnd,
	type OnResizeStart,
	type OnSelectionDrag,
	type PanelPosition,
	PanOnScrollMode,
	Position,
	type ProOptions,
	type Rect,
	ResizeControlVariant,
	type ResizeDragEvent,
	type ResizeParams,
	type ResizeParamsWithDirection,
	SelectionMode,
	type SelectionRect,
	type SetCenterOptions,
	type ShouldResize,
	type SmoothStepPathOptions,
	type SnapGrid,
	type Transform,
	type Viewport,
	type ViewportHelperFunctionOptions,
	type XYPosition,
	type XYZPosition,
} from "@xyflow/system";
export * from "./additional-components";
export {
	EdgeLabelRenderer,
	type EdgeLabelRendererProps,
} from "./components/EdgeLabelRenderer";
export { BaseEdge } from "./components/Edges/BaseEdge";
export { BezierEdge } from "./components/Edges/BezierEdge";
export { EdgeText } from "./components/Edges/EdgeText";
export {
	getSimpleBezierPath,
	SimpleBezierEdge,
} from "./components/Edges/SimpleBezierEdge";
export { SmoothStepEdge } from "./components/Edges/SmoothStepEdge";
export { StepEdge } from "./components/Edges/StepEdge";
export { StraightEdge } from "./components/Edges/StraightEdge";
export { Handle, type HandleProps } from "./components/Handle";
export { Panel, type PanelProps } from "./components/Panel";
export { SolidFlowProvider } from "./components/SolidFlowProvider";
export { ViewportPortal } from "./components/ViewportPortal";
export { default as SolidFlow } from "./container/SolidFlow";
export { useNodeId } from "./contexts/NodeIdContext";
export { useConnection } from "./hooks/useConnection";
export { useEdges } from "./hooks/useEdges";
export { useHandleConnections } from "./hooks/useHandleConnections";
export { useInternalNode } from "./hooks/useInternalNode";
export { useKeyPress } from "./hooks/useKeyPress";
export { useNodeConnections } from "./hooks/useNodeConnections";
export { useNodes } from "./hooks/useNodes";
export { useNodesData } from "./hooks/useNodesData";
export { useEdgesState, useNodesState } from "./hooks/useNodesEdgesState";
export {
	type UseNodesInitializedOptions,
	useNodesInitialized,
} from "./hooks/useNodesInitialized";
export {
	type UseOnSelectionChangeOptions,
	useOnSelectionChange,
} from "./hooks/useOnSelectionChange";
export {
	type UseOnViewportChangeOptions,
	useOnViewportChange,
} from "./hooks/useOnViewportChange";
export { useSolidFlow } from "./hooks/useSolidFlow";
export { useStore, useStoreApi } from "./hooks/useStore";
export { useUpdateNodeInternals } from "./hooks/useUpdateNodeInternals";
export { useViewport } from "./hooks/useViewport";
export * from "./types";
export { applyEdgeChanges, applyNodeChanges } from "./utils/changes";
export { isEdge, isNode } from "./utils/general";

// we need this workaround to prevent a duplicate identifier error
import type { Handle as HandleBound } from "@xyflow/system";
export type Handle = HandleBound;

// system utils
export {
	addEdge,
	type GetBezierPathParams,
	type GetSmoothStepPathParams,
	type GetStraightPathParams,
	getBezierEdgeCenter,
	getBezierPath,
	getConnectedEdges,
	getEdgeCenter,
	getIncomers,
	getNodesBounds,
	getOutgoers,
	getSmoothStepPath,
	getStraightPath,
	getViewportForBounds,
	reconnectEdge,
} from "@xyflow/system";
