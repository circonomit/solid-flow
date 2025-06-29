import type { KeyCode } from "@xyflow/system";
import { createEffect, untrack } from "solid-js";
import type { Edge, Node } from "../types";
import { type UseKeyPressOptions, useKeyPress } from "./useKeyPress";
import { useSolidFlow } from "./useSolidFlow";
import { useStoreApi } from "./useStore";

const selected = (item: Node | Edge) => item.selected;

const deleteKeyOptions: UseKeyPressOptions = {
	actInsideInputWithModifier: false,
};

/**
 * Hook for handling global key events.
 *
 * @internal
 */
export function useGlobalKeyHandler(config: {
	deleteKeyCode: () => KeyCode | null;
	multiSelectionKeyCode: () => KeyCode | null;
}): void {
	const store = useStoreApi();
	const { deleteElements } = useSolidFlow();

	const deleteKeyPressed = useKeyPress(
		() => config.deleteKeyCode(),
		() => deleteKeyOptions,
	);
	const multiSelectionKeyPressed = useKeyPress(config.multiSelectionKeyCode);

	createEffect(() => {
		if (deleteKeyPressed()) {
			untrack(() => {
				// console.log('deleteKeyPressed');
				const { edges, nodes } = store;
				deleteElements({
					nodes: nodes.get().filter(selected),
					edges: edges.get().filter(selected),
				});
				store.nodesSelectionActive.set(false);
			});
		}
	});

	createEffect(() => {
		store.multiSelectionActive.set(multiSelectionKeyPressed());
	});
}
