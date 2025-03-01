<script setup>
import { ref, onMounted } from "vue";
import StudentCard from "./StudentCard.vue";
import { getStudents } from "../api/utils";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const students = ref([]);

const fetchStudents = async () => {
  students.value = await getStudents("http://127.0.0.1:8000/api/students");
};

const handleDelete = () => {
  toast.add({ severity: 'error', summary: 'Eliminación', detail: 'El alumno se ha eliminado correctamente', life: 4000 });
  fetchStudents()
}

const handleUpdate = () => {
  toast.add({ severity: 'warn', summary: 'Actualización', detail: 'El alumno se ha actualizado correctamente', life: 4000 });
  fetchStudents()
}

onMounted(fetchStudents);
</script>

<template>
  <div class="flex flex-wrap flex-1/6 justify-center gap-3">
    <StudentCard v-for="student in students" :key="student.id" :student="student" @deleted="handleDelete"
      @edited="handleUpdate" />
    <Toast position="top-right" />
  </div>
</template>
