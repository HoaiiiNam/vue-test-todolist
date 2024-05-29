<template lang="">
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">List</th>
          <th scope="col">Date</th>
          <th scope="col">Created At</th>
          <th scope="col">Status</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredData.length === 0">
          Have no list
          {{
            router.currentRoute.value.name
          }}
        </tr>
        <tr v-for="(data, index) in filteredData" :key="index">
          <td>{{ data.title }}</td>
          <td>{{ data.date }}</td>
          <td>{{ data.created_at }}</td>
          <td>
            <select
              class="form-select"
              v-model="data.status"
              :disabled="data.status === 2"
              @change="updateStatus(data.id, data.status)"
            >
              <option v-for="option in statusOptions" :key="option.id" :value="option.id">
                {{ option.name }}
              </option>
            </select>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteItem(data.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ref, onMounted, computed, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
  props: ['statusFilter'],
  setup(props) {
    const statusOptions = [
      { id: 0, name: 'Todo' },
      { id: 1, name: 'Inprogress' },
      { id: 2, name: 'Completed' }
    ]
    const allData = ref([])
    const router = useRouter()
    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3001/todos')
        allData.value = response.data
      } catch (err) {
        console.log(err)
      }
    })
    const filteredData = computed(() => {
      if (props.statusFilter !== undefined) {
        return allData.value.filter((item) => item.status === props.statusFilter)
      }
      return allData.value
    })
    const updateStatus = async (id, newStatus) => {
      await axios.patch(`http://localhost:3001/todos/${id}`, { status: newStatus })
    }

    const deleteItem = async (id) => {
      if (window.confirm('Are you sure you want to delete this item?')) {
        await axios.delete(`http://localhost:3001/todos/${id}`)
        allData.value = allData.value.filter((item) => item.id !== id)
      }
    }
    return { statusOptions, allData, filteredData, updateStatus, deleteItem, router }
  }
}
</script>
<style lang=""></style>
