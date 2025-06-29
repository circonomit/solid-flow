import type { Component } from "solid-js";
import styles from "./App.module.css";
import { BasicExample } from "./BasicExample";
import DeleteMeExample from "./DeleteMiddleNode";
import BasicFlow from "./SimpleExample";

const App: Component = () => {
	return (
		<div class={styles.App}>
			<DeleteMeExample />
			{/* <BasicExample /> */}
			{/* <BasicFlow /> */}
		</div>
	);
};

export default App;
