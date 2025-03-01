<script setup>
import { ref, onMounted } from "vue";
import StudentCard from "./StudentCard.vue";
import { getStudents } from "../api/utils";

const students = ref([]);

const fetchStudents = async () => {
  students.value = await getStudents("http://127.0.0.1:8000/api/students");
};

const showEmit = (type) => {
  console.log(type)
}

onMounted(fetchStudents);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3">
    <StudentCard 
      v-for="student in students" 
      :key="student.id" 
      :student="student"
      @deleted="showEmit('delete')"  
      @edited="showEmit('update')"   
    />
  </div>
</template>
