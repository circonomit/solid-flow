// import { memo, ReactNode } from 'react';
// import { shallow } from 'zustand/shallow';

import { For, type ParentProps } from "solid-js";
import { EdgeWrapper } from "../../components/EdgeWrapper";
import { useStore } from "../../hooks/useStore";
import { useVisibleEdgeIds } from "../../hooks/useVisibleEdgeIds";
import type { Edge, Node, SolidFlowState } from "../../types";
import type { GraphViewProps } from "../GraphView";
import MarkerDefinitions from "./MarkerDefinitions";

type EdgeRendererProps<NodeType extends Node, EdgeType extends Edge> = Pick<
	GraphViewProps<NodeType, EdgeType>,
	| "onEdgeClick"
	| "onEdgeDoubleClick"
	| "defaultMarkerColor"
	| "onlyRenderVisibleElements"
	| "onReconnect"
	| "onEdgeContextMenu"
	| "onEdgeMouseEnter"
	| "onEdgeMouseMove"
	| "onEdgeMouseLeave"
	| "onReconnectStart"
	| "onReconnectEnd"
	| "reconnectRadius"
	| "noPanClassName"
	| "rfId"
	| "disableKeyboardA11y"
	| "edgeTypes"
>;

const selector = (s: SolidFlowState) => ({
	edgesFocusable: () => s.edgesFocusable.get(),
	edgesReconnectable: () => s.edgesReconnectable.get(),
	elementsSelectable: () => s.elementsSelectable.get(),
	connectionMode: () => s.connectionMode.get(),
	onError: () => s.onError.get(),
});

function EdgeRendererComponent<
	NodeType extends Node = Node,
	EdgeType extends Edge = Edge,
>(p: ParentProps<EdgeRendererProps<NodeType, EdgeType>>) {
	const storeData = useStore(selector);
	const edgeIds = useVisibleEdgeIds(() => p.onlyRenderVisibleElements);

	return (
		<div class="solid-flow__edges">
			<MarkerDefinitions defaultColor={p.defaultMarkerColor} rfId={p.rfId} />

			<For each={edgeIds()}>
				{(id) => {
					return (
						<EdgeWrapper<EdgeType>
							id={id}
							edgesFocusable={storeData.edgesFocusable()}
							edgesReconnectable={storeData.edgesReconnectable()}
							elementsSelectable={storeData.elementsSelectable()}
							noPanClassName={p.noPanClassName}
							onReconnect={p.onReconnect}
							onContextMenu={p.onEdgeContextMenu}
							onMouseEnter={p.onEdgeMouseEnter}
							onMouseMove={p.onEdgeMouseMove}
							onMouseLeave={p.onEdgeMouseLeave}
							onClick={p.onEdgeClick}
							reconnectRadius={p.reconnectRadius}
							onDoubleClick={p.onEdgeDoubleClick}
							onReconnectStart={p.onReconnectStart}
							onReconnectEnd={p.onReconnectEnd}
							rfId={p.rfId}
							onError={storeData.onError()}
							edgeTypes={p.edgeTypes}
							disableKeyboardA11y={p.disableKeyboardA11y}
						/>
					);
				}}
			</For>
		</div>
	);
}

EdgeRendererComponent.displayName = "EdgeRenderer";

export const EdgeRenderer = EdgeRendererComponent;
