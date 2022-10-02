<template>
  <div class="chocket">
    <div class="room-list">
      <ul>
        <li
            v-for="(element, index) in rooms"
            :key="`rooms-${index}`"
            class="no-select"
            :class="{ active: element === roomSelected }"
        >
          {{ element }}
        </li>
      </ul>
    </div>
    <div class="chat">
      <div class="chat-wrapper">
        <div
            id="message-container"
            class="chat-wrapper-inner"
        >
          <div
              v-for="(element, index) in messages"
              :key="`message-${index}`"
              class="message"
              :class="{ mine: element.username === username }"
          >
            <div class="message-wrapper">
              <b>{{ element.username }}</b>
              {{ element.sendAt.toLocaleString() }}
              <div
                  class="message-content"
                  :class="{ mine: element.username === username }"
              >
                {{ element.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="type-message-wrapper">
        <input
            v-model="inputMessage"
            type="text"
            placeholder="Say hello !"
            @keydown.enter="sendMessage"
        >
        <button @click="sendMessage">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ChatService from '../chatService'
import io from 'socket.io-client'

export default {
  name: 'ChatApp',

  data() {
    return {
      messages: [],
      error: null,
      inputMessage: null,
      socket: io(location.origin)
    }
  },

  props: {
    roomSelected: {
      type: String,
      default: null,
    },
    rooms: {
      type: Array,
      default: () => [],
    },
    username: {
      type: String,
      default: null,
    },
  },

  mounted() {
    ChatService.getMessages().then((data) => {
      if (data.status === 200) {
        this.messages = data.messages

        this.$nextTick(() => {
          this.scrollToBottom('message-container')
        })
      } else {
        this.error = data.message
      }
    })

    this.socket.on('MESSAGE', data => {
      this.messages.push(data)
      this.scrollToBottom('message-container')
    })
  },

  methods: {
    sendMessage() {
      const message = {
        username: this.username,
        message: this.inputMessage,
        sendAt: new Date()
      }

      this.socket.emit('SEND_MESSAGE', message)
      ChatService.sendMessage(this.username, this.inputMessage)
      this.scrollToBottom('message-container')
      this.inputMessage = null
    },
    scrollToBottom(id) {
      const element = document.getElementById(id);
      element.scrollTop = element.scrollHeight;
    },
  },
}
</script>
<style lang="scss" scoped>

  $cerulean-blue: #0053DAff;
  $celtic-blue: #006BEAff;
  $blue-jeans: #00AAF4ff;
  $celtic-blue-2: #006DE5ff;
  $sapphire: #0054C8ff;

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 2px;
    backdrop-filter: blur(30px);
    box-shadow: 0 10px 150px 10px white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(#427fce, #1960d3);
    transition: all 125ms ease-in;

    &:hover {
      background: linear-gradient($cerulean-blue, $sapphire);
    }
  }

  .chocket {
    box-shadow: 0 18px 200px -60px black;
    border-radius: 50px;
    width: 90vw;
    position: relative;
    backdrop-filter: blur(15px);
    border: 2px solid #ffffff40;
    padding: 1rem 0;
    display: flex;
    height: 90vh;

    @media screen and (max-width: 768px) {
      width: 95vw;
    }

    .room-list {
      position: relative;
      height: 100%;
      width: 200px;

      ul {
        li {
          padding: .8rem;
          border-radius: 20px;
          margin: 1rem;
          transition: all 125ms ease-in;

          &:hover:not(.active) {
            background: linear-gradient($celtic-blue, $sapphire);
            cursor: pointer;
          }

          &.active {
            background: linear-gradient($cerulean-blue, $sapphire);
          }
        }
      }

      &:before {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        height: 100%;
        background-color: white;
        border-radius: 2px;
        backdrop-filter: blur(30px);
        box-shadow: 0 10px 150px 10px white;
      }
    }

    .chat {
      position: relative;
      height: 100%;
      padding: 3rem;
      width: 100%;
      display: flex;
      flex-direction: column;

      @media screen and (max-width: 768px){
        padding: 1rem;
      }

      .type-message-wrapper {
        position: absolute;
        background-color: rgba(255, 255, 255, .1);
        left: 0;
        right: 0;
        bottom: -15px;
        margin: 1rem;
        border-radius: 50px;
        backdrop-filter: blur(40px);
        height: 50px;
        overflow: hidden;

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 5px;

        input {
          width: 100%;
          height: 100%;
        }

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          border-radius: 20px;
          transition: all 125ms ease-in;

          &:hover {
            background-color: rgba(255, 255, 255, .2);
            backdrop-filter: blur(40px);
            padding: 10px;
            border-radius: 20px;
            cursor: pointer;
          }
        }
      }

      .chat-wrapper {
        position: absolute;
        // background-color: red;
        background-color: rgba(255, 255, 255, .1);
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        margin: 1rem;
        border-radius: 50px;
        backdrop-filter: blur(40px);
        overflow: hidden;

        .chat-wrapper-inner {
          overflow-y: auto;
          overflow-x: hidden;
          width: 100%;
          height: 100%;
          padding: 0 2rem;
          margin-right: 5px;

          .message {
            font-size: 12px;
            justify-content: flex-start;
            margin: 10px 0;

            b {
              font-size: 21px;
              margin-right: 5px;
            }

            &.mine {
              display: flex;
              justify-content: flex-end;
            }

            .message-content {
              position: relative;
              background: linear-gradient(#025eff, #1c70ee);
              backdrop-filter: blur(40px);
              padding: 10px;
              border-radius: 0 20px 20px 10px;
              width: 250px;
              font-size: 18px;

              @media screen and (max-width: 768px){
                width: auto;
              }

              &.mine {
                border-radius: 20px 0 10px 20px;
              }

              &:before {
                content: '';
                position: absolute;
                background-color: #0c63ff;
                right: -49px;
                top: -.3px;
                width: 100px;
                height: 150px;
                clip-path: polygon(50% 0%, 80% 0, 50% 11%);
              }

              &:not(.mine):before {
                content: '';
                position: absolute;
                background-color: #0960fd;
                left: -99px;
                top: -.3px;
                width: 200px;
                height: 150px;
                clip-path: polygon(50% 0%, 38% 0, 50% 11%);
              }
            }
          }
        }
      }
    }
  }

</style>
