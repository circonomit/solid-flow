import type { Viewport } from "@xyflow/system";
import type { SolidFlowState } from "../types";
import { useStore } from "./useStore";

const viewportSelector = (state: SolidFlowState) => () => ({
	x: state.transform.get()[0],
	y: state.transform.get()[1],
	zoom: state.transform.get()[2],
});

/**
 * Hook for getting the current viewport from the store.
 *
 * @public
 * @returns The current viewport
 */
export function useViewport(): () => Viewport {
	const viewport = useStore(viewportSelector);

	return viewport;
}
