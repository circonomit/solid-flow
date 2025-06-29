// import { shallow } from 'zustand/shallow';

import { Show } from "solid-js";
import { useStore } from "../../hooks/useStore";
import type { SolidFlowState } from "../../types";

const selector = (s: SolidFlowState) => ({
	userSelectionActive: () => s.userSelectionActive.get(),
	userSelectionRect: () => s.userSelectionRect.get(),
});

export function UserSelection() {
	const storeData = useStore(selector);

	return (
		<Show
			when={storeData.userSelectionActive() && storeData.userSelectionRect()}
		>
			<div
				class="solid-flow__selection solid-flow__container"
				style={{
					transform: `translate(${storeData.userSelectionRect()!.x}px, ${storeData.userSelectionRect()!.y}px)`,
					width: `${storeData.userSelectionRect()!.width}px`,
					height: `${storeData.userSelectionRect()!.height}px`,
				}}
			/>
		</Show>
	);
}
