import { io } from 'socket.io-client'

// let baseUrl = 'http://localhost:3400'
let baseUrl = 'https://expressjs-production-40aa.up.railway.app:3000'

export default io(baseUrl, {
  path: '/',
})

// if (store.state.session?.token) {
//   const room = getInstance()

//   socket.emit('join_room', {
//     room,
//     userId: store.state.session?.user?.id,
//   })

//   socket.on('sync', (msg) => {
//     console.log('socket sync!', msg)

//     if (msg.params.uid && msg.params.reload) {
//       store.dispatch('setSocketModuleUid', msg.uid ?? '')
//     }
//   })
// }
