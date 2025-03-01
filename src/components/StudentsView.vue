<script setup>
import { ref, onMounted } from "vue";
import StudentCard from "./StudentCard.vue";
import { getStudents } from "../api/utils";

const students = ref([]);

onMounted(async () => {
  students.value = await getStudents("http://127.0.0.1:8000/api/students");
});

</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>
