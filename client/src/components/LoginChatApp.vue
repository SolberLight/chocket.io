<template>
  <div class="chocket">
    <div class="login">
      <div>
        <label for="username">Username</label>
        <br>
        <input
            v-model="username"
            id="username"
            type="text"
            placeholder="John Do"
        >
      </div>
      <br>
      <div>
        <label for="rooms">Room</label>
        <br>
        <select
            v-model="roomSelected"
            id="rooms"
            name="rooms"
        >
          <option :value="null">--Select a room--</option>
          <option
              v-for="(element, index) in rooms"
              :key="`rooms-${index}`"
              :value="element"
          >
            {{ element }}
          </option>
        </select>
      </div>
      <div class="button-container">
        <button @click="join">
          Join
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginChatApp',

  data() {
    return {
      roomSelected: null,
      username: null,
    }
  },

  props: {
    rooms: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    join() {
      if (!this.username || !this.rooms.includes(this.roomSelected)) {
        return
      }

      this.$emit('change-page', {
        page: 1,
        room: this.roomSelected,
        username: this.username,
      })
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
    width: 400px;
    position: relative;
    backdrop-filter: blur(15px);
    border: 2px solid #ffffff40;
    padding: 1rem 0;
    display: flex;
    height: 300px;

    @media screen and (max-width: 768px) {
      width: 95vw;
    }

    .login {
      width: 100%;
      height: 100%;
      position: relative;
      margin: 1rem 2rem;

      .button-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }

      input, select, button {
        backdrop-filter: blur(15px);
        border: 2px solid #ffffff40;
        box-shadow: 0 18px 200px -60px black;
        background-color: rgba(0, 0, 0, .1);
        width: 100%;
        padding: 8px 10px;
        border-radius: 15px;
        margin-top: 5px;
        transition: all 125ms ease-in;

        &:hover {
          background-color: rgba(0, 0, 0, .2);
        }
      }

      button {
        width: 130px;
        font-size: 21px;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      select option {
        backdrop-filter: blur(15px);
        color: black;
      }
    }
  }

</style>
