// import { writable } from 'svelte/store';
import {
	Background,
	BackgroundVariant,
	Controls,
	type Edge,
	MiniMap,
	type Node,
	SolidFlow,
	SolidFlowProvider,
} from "@circonomit/solid-flow";
import "@circonomit/solid-flow/dist/styles/style.css";
import "@circonomit/solid-flow/dist/styles/base.css";

import { createSignal } from "solid-js";

// import TextNode from './TextNode.svelte';
// import UppercaseNode from './UppercaseNode.svelte';
// import ResultNode from './ResultNode.svelte';

export const BasicExample = () => {
	// const nodeTypes: NodeTypes = {
	// 	text: TextNode,
	// 	uppercase: UppercaseNode,
	// 	result: ResultNode
	// };

	const [nodes] = createSignal<Node[]>([
		{
			id: "1",
			// type: 'text',
			data: {
				text: "hello",
				label: "hello",
			},
			position: { x: -100, y: -50 },
		},
		{
			id: "1a",
			// type: 'uppercase',
			data: {
				text: "",
			},
			position: { x: 100, y: 0 },
		},
		{
			id: "2",
			// type: 'text',
			data: {
				text: "world",
			},
			position: { x: 0, y: 100 },
		},

		{
			id: "3",
			// type: 'result',
			data: {},
			position: { x: 300, y: 50 },
		},
	] satisfies Node[]);

	const [edges] = createSignal<Edge[]>([
		{
			id: "e1-1a",
			source: "1",
			target: "1a",
		},
		{
			id: "e1a-3",
			source: "1a",
			target: "3",
		},
		{
			id: "e2-3",
			source: "2",
			target: "3",
		},
	]);
	return (
		<SolidFlowProvider>
			<div
				style={{
					height: "90vh",
					width: "90vw",
				}}
			>
				<SolidFlow nodes={nodes()} edges={edges()} fitView panOnDrag>
					<Controls />
					<Background variant={BackgroundVariant.Dots} />
					<MiniMap />
				</SolidFlow>
			</div>
		</SolidFlowProvider>
	);
	// </script>
};
