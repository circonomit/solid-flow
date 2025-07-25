// import { useCallback } from 'react';
import {
	calculateNodePosition,
	snapPosition,
	type XYPosition,
} from "@xyflow/system";
import type { Node } from "../types";
import { useStoreApi } from "./useStore";

const selectedAndDraggable = (nodesDraggable: boolean) => (n: Node) =>
	n.selected &&
	(n.draggable || (nodesDraggable && typeof n.draggable === "undefined"));

/**
 * Hook for updating node positions by passing a direction and factor
 *
 * @internal
 * @returns function for updating node positions
 */
export function useMoveSelectedNodes() {
	const store = useStoreApi();

	const moveSelectedNodes = (params: {
		direction: XYPosition;
		factor: number;
	}) => {
		const {
			nodeExtent,
			snapToGrid,
			snapGrid,
			nodesDraggable,
			onError,
			updateNodePositions,
			nodeLookup,
			nodeOrigin,
		} = store;
		const nodeUpdates = new Map();
		const isSelected = selectedAndDraggable(nodesDraggable.get());

		// by default a node moves 5px on each key press
		// if snap grid is enabled, we use that for the velocity
		const xVelo = snapToGrid ? snapGrid.get()[0] : 5;
		const yVelo = snapToGrid ? snapGrid.get()[1] : 5;

		const xDiff = params.direction.x * xVelo * params.factor;
		const yDiff = params.direction.y * yVelo * params.factor;

		for (const [, node] of nodeLookup) {
			if (!isSelected(node)) {
				continue;
			}

			let nextPosition = {
				x: node.internals.positionAbsolute.x + xDiff,
				y: node.internals.positionAbsolute.y + yDiff,
			};

			if (snapToGrid) {
				nextPosition = snapPosition(nextPosition, snapGrid.get());
			}

			const { position, positionAbsolute } = calculateNodePosition({
				nodeId: node.id,
				nextPosition,
				nodeLookup,
				nodeExtent: nodeExtent.get(),
				nodeOrigin: nodeOrigin.get(),
				onError: onError.get(),
			});

			node.position = position;
			node.internals.positionAbsolute = positionAbsolute;

			nodeUpdates.set(node.id, node);
		}

		updateNodePositions(nodeUpdates);
	};

	return moveSelectedNodes;
}
