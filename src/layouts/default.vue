<template lang="">
  <div class="container" style="position: relative; top: 50%; transform: translateY(-50%)">
    <h1 class="text-center mb-4">TODO List</h1>
    <div class="d-flex align-items-center justify-content-center flex-column">
      <form
        class="border rounded-3 p-3 mx-auto d-flex align-items-center flex-column"
        style="width: 60%"
        @submit.prevent="addData"
      >
        <input
          v-model="newData.title"
          type="text"
          placeholder="What would you like to do?"
          class="form-control mb-4 mx-auto"
          required
        />
        <button type="submit" class="btn btn-primary px-5 shadow">Add</button>
      </form>
      <div
        class="d-flex align-items-center flex-column border rounded-3 p-3 mt-5"
        style="width: 60%"
      >
        <div
          class="btn-group"
          role="group"
          active-class="btn btn-primary active"
          exact-active-class="btn btn-primary active"
          style="width: 100%"
        >
          <router-link to="/" class="btn btn-outline-primary text-decoration-none"
            >Todo</router-link
          >
          <router-link to="/inprogress" class="btn btn-outline-primary text-decoration-none"
            >Inprogress</router-link
          >
          <router-link to="/completed" class="btn btn-outline-primary text-decoration-none"
            >Completed</router-link
          >
        </div>
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'
import { reactive } from 'vue'
import axios from 'axios'
export default {
  name: 'DefaultLayout',
  components: { Footer },
  setup() {
    const today = new Date()
    let newData = reactive({
      title: '',
      status: 0,
      created_at:
        today.getHours().toString().padStart(2, '0') +
        ':' +
        today.getMinutes().toString().padStart(2, '0') +
        ':' +
        today.getSeconds().toString().padStart(2, '0'),
      date:
        today.getDate().toString().padStart(2, '0') +
        '/' +
        (today.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        today.getFullYear()
    })
    const addData = async () => {
      await axios.post('http://localhost:3001/todos', newData)
      alert('Add new todo success!')
      window.location.reload()
    }
    return { newData, addData }
  }
}
</script>
<style></style>
