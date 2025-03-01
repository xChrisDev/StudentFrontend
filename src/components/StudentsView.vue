<script setup>
import { defineProps, defineEmits } from "vue";
import StudentCard from "./StudentCard.vue";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const props = defineProps({
  students: {
    type: Object,
    default: () => null
  }
})
const emit = defineEmits(['update', 'delete'])
const handleDelete = () => {
  toast.add({ severity: 'error', summary: 'Eliminación', detail: 'El alumno se ha eliminado correctamente', life: 4000 });
  emit('delete')
}

const handleUpdate = () => {
  emit('update')
}
</script>

<template>
  <div class="flex flex-wrap flex-1/6 justify-center gap-3">
    <StudentCard v-for="student in props.students" :key="student.id" :student="student" @deleted="handleDelete"
      @edited="handleUpdate" />
    <Toast position="top-right" />
  </div>
</template>
