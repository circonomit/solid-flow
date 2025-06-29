import type { Writable } from "../store/initialState";
import type { Node, SolidFlowState } from "../types";
import { useStore } from "./useStore";

const nodesSelector = (state: SolidFlowState) => state.nodes;

/**
 * Hook for getting the current nodes from the store.
 *
 * @public
 * @returns An array of nodes
 */
export function useNodes<NodeType extends Node = Node>(): Writable<NodeType[]> {
	const nodes = useStore(nodesSelector);

	// TODO: Fix this type assertion
	return nodes as unknown as Writable<NodeType[]>;
}
