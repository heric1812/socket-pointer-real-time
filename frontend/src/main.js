import { createApp } from 'vue'
import socket from './socket'
import App from './App.vue'

const app = createApp(App)

app.provide('socket', socket)
app.mount('#app')