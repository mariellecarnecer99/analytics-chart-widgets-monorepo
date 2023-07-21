<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<h1>Frontend</h1>
</template>

<script>
import SocketioService from "./services/socketio.service.js";

export default {
	name: "App",
	components: {},
	created() {
		SocketioService.setupSocketConnection();
	},
	beforeUnmount() {
		SocketioService.disconnect();
	},
};
</script>
