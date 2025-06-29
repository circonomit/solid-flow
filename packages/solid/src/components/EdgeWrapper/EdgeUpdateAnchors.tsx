// Reconnectable edges have anchors around their handles to reconnect the edge.
import {
	type Connection,
	type EdgePosition,
	type FinalConnectionState,
	type HandleType,
	XYHandle,
} from "@xyflow/system";
import { Match, Switch } from "solid-js";
import { useStoreApi } from "../../hooks/useStore";
import type { Edge, EdgeWrapperProps } from "../../types/edges";
import { EdgeAnchor } from "../Edges/EdgeAnchor";

type EdgeUpdateAnchorsProps<EdgeType extends Edge = Edge> = {
	edge: EdgeType;
	isReconnectable: boolean | "source" | "target";
	reconnectRadius: EdgeWrapperProps["reconnectRadius"];
	onReconnect: EdgeWrapperProps<EdgeType>["onReconnect"];
	onReconnectStart: EdgeWrapperProps<EdgeType>["onReconnectStart"];
	onReconnectEnd: EdgeWrapperProps<EdgeType>["onReconnectEnd"];
	setUpdateHover: (hover: boolean) => void;
	setReconnecting: (updating: boolean) => void;
} & EdgePosition;

export function EdgeUpdateAnchors<EdgeType extends Edge = Edge>({
	isReconnectable,
	reconnectRadius,
	edge,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	onReconnect,
	onReconnectStart,
	onReconnectEnd,
	setReconnecting,
	setUpdateHover,
}: EdgeUpdateAnchorsProps<EdgeType>) {
	const store = useStoreApi();

	const handleEdgeUpdater = (
		event: MouseEvent,
		oppositeHandle: { nodeId: string; id: string | null; type: HandleType },
	) => {
		// avoid triggering edge updater if mouse btn is not left
		if (event.button !== 0) {
			return;
		}

		const isTarget = oppositeHandle.type === "target";

		setReconnecting(true);
		onReconnectStart?.(event, edge, oppositeHandle.type);

		const _onReconnectEnd = (
			evt: MouseEvent | TouchEvent,
			connectionState: FinalConnectionState,
		) => {
			setReconnecting(false);
			onReconnectEnd?.(evt, edge, oppositeHandle.type, connectionState);
		};

		const onConnectEdge = (connection: Connection) =>
			onReconnect?.(edge, connection);

		XYHandle.onPointerDown(event, {
			autoPanOnConnect: store.autoPanOnConnect.get(),
			connectionMode: store.connectionMode.get(),
			connectionRadius: store.connectionRadius.get(),
			domNode: store.domNode.get(),
			handleId: oppositeHandle.id,
			nodeId: oppositeHandle.nodeId,
			nodeLookup: store.nodeLookup,
			isTarget,
			edgeUpdaterType: oppositeHandle.type,
			lib: store.lib.get(),
			flowId: store.rfId.get(),
			cancelConnection: store.cancelConnection,
			panBy: store.panBy,
			isValidConnection: store.isValidConnection,
			onConnect: onConnectEdge,
			onConnectStart: store.onConnectStart,
			onConnectEnd: store.onConnectEnd,
			onReconnectEnd: _onReconnectEnd,
			updateConnection: store.updateConnection,
			getTransform: () => store.transform.get(),
			getFromHandle: () => store.connection.get().fromHandle,
		});
	};

	const onReconnectSourceMouseDown = (event: MouseEvent): void =>
		handleEdgeUpdater(event, {
			nodeId: edge.target,
			id: edge.targetHandle ?? null,
			type: "target",
		});
	const onReconnectTargetMouseDown = (event: MouseEvent): void =>
		handleEdgeUpdater(event, {
			nodeId: edge.source,
			id: edge.sourceHandle ?? null,
			type: "source",
		});
	const onReconnectMouseEnter = () => setUpdateHover(true);
	const onReconnectMouseOut = () => setUpdateHover(false);

	return (
		<Switch>
			<Match when={isReconnectable === true || isReconnectable === "source"}>
				<EdgeAnchor
					position={sourcePosition}
					centerX={sourceX}
					centerY={sourceY}
					radius={reconnectRadius}
					onMouseDown={onReconnectSourceMouseDown}
					onMouseEnter={onReconnectMouseEnter}
					onMouseOut={onReconnectMouseOut}
					type="source"
				/>
			</Match>

			<Match when={isReconnectable === true || isReconnectable === "target"}>
				<EdgeAnchor
					position={targetPosition}
					centerX={targetX}
					centerY={targetY}
					radius={reconnectRadius}
					onMouseDown={onReconnectTargetMouseDown}
					onMouseEnter={onReconnectMouseEnter}
					onMouseOut={onReconnectMouseOut}
					type="target"
				/>
			</Match>
		</Switch>
	);
}
