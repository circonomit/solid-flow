import type { Viewport } from "@xyflow/system";
import { createEffect } from "solid-js";
import type { SolidFlowState } from "../types";
import { useStore, useStoreApi } from "./useStore";

const selector = (state: SolidFlowState) => () =>
	state.panZoom.get()?.syncViewport;

/**
 * Hook for syncing the viewport with the panzoom instance.
 *
 * @internal
 * @param viewport
 */
export function useViewportSync(getViewport?: () => Viewport | undefined) {
	const syncViewport = useStore(selector);
	const store = useStoreApi();

	createEffect(() => {
		const viewport = getViewport?.();
		if (viewport) {
			syncViewport()?.(viewport);
			store.transform.set([viewport.x, viewport.y, viewport.zoom]);
			// store.setState({ transform: [viewport.x, viewport.y, viewport.zoom] });
		}
	});

	return null;
}
