<template>
  <h1 v-if="page === 0">chocket.io</h1>

  <login-chat-app
      v-if="page === 0"
      :rooms="rooms"
      :room-selected="roomSelected"
      @change-page="changePage($event)"
  />

  <chat-app
      v-if="page === 1"
      :rooms="rooms"
      :username="username"
      :room-selected="roomSelected"
      @switch-room="roomSelected = $event"
  />
</template>

<script>
import ChatApp from './components/ChatApp.vue'
import LoginChatApp from './components/LoginChatApp.vue'

export default {
  name: 'App',
  components: {
    ChatApp,
    LoginChatApp,
  },

  data() {
    return {
      page: 0,
      rooms: [
          'General',
          'Questions'
      ],
      roomSelected: null,
      username: null,
    }
  },

  methods: {
    changePage(event) {
      this.page = event.page
      this.roomSelected = event.room
      this.username = event.username
    },
  }
}
</script>
<style lang="scss" scoped>

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;

    margin-bottom: 40px;
  }
</style>
