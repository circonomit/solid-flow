import { createEffect } from "solid-js";
import type { Edge, Node, OnInit } from "../types";
import { useRef } from "../utils/hooks";
import { useSolidFlow } from "./useSolidFlow";

/**
 * Hook for calling onInit handler.
 *
 * @internal
 */
export function useOnInitHandler<
	NodeType extends Node = Node,
	EdgeType extends Edge = Edge,
>(onInit: () => OnInit<NodeType, EdgeType> | undefined) {
	const rfInstance = useSolidFlow<NodeType, EdgeType>();
	const isInitialized = useRef<boolean>(false);

	createEffect(() => {
		const onInitFunc = onInit();
		if (
			!isInitialized.current &&
			rfInstance.viewportInitialized() &&
			onInitFunc
		) {
			setTimeout(() => onInitFunc(rfInstance), 1);
			isInitialized.current = true;
		}
	});
}
