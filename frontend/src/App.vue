<script setup>
import {ref, reactive, inject, onMounted, onBeforeUnmount} from 'vue'

const socket = inject('socket')
const name = ref('')
const users = ref([])
const pointer = reactive({x: 0, y: 0})

onMounted(() => {
  const el = document.body

  el.addEventListener('mousemove', (e) => {
    pointer.x = e.clientX
    pointer.y = e.clientY

    socket.emit('update_position', {
      room: 'room1',
      user: {name: name.value, x: pointer.x, y: pointer.y},
    })
  })

  name.value = prompt('Coloque su alias')

  console.log(name.value)
  console.log(socket)

  socket.emit('join_room', {
    room: 'room1',
    user: {name: name.value, x: pointer.x, y: pointer.y},
  })

  socket.on('update_pointers', (data) => {
    // console.log('update_pointers sync!', data)
    const _users = []

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        if (data[key].name !== name.value) {
          _users.push(data[key])
        }
      }
    }

    users.value = _users
  })
})

onBeforeUnmount(() => {
  socket.emit('remove_position', {
    room: 'room1',
    user: { name: name.value, x: pointer.x, y: pointer.y },
  })
  socket.removeAllListeners('update_pointers')
})
</script>

<template>
  <div>
    <div
      v-for="(user, key) in users"
      :key="key"
      :style="`transform: translate3d(${user.x}px, ${user.y}px, 0)`"
      class="pointer"
    >
      {{user.name}}
    </div>
  </div>
</template>

<style>
@import './assets/base.css';

.pointer {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 10px;
  min-height: 10px;
  color: white;
  background-color: red;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  padding: 2px 5px;
}
</style>
