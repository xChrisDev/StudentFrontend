<script setup>
import StudentsView from '../src/components/StudentsView.vue'
import StudentView from '../src/components/StudentView.vue'
import ModalAdd from './components/ModalAdd.vue';
import { getStudents } from './api/utils';
import { SelectButton, Button } from 'primevue';
import { ref, onMounted } from 'vue';

const value = ref('Mostrar');
const options = ref(['Mostrar', 'Filtrar']);
const showAddModal = ref(false);

const students = ref([]);

const fetchStudents = async () => {
  students.value = await getStudents("http://127.0.0.1:8000/api/students");
};

onMounted(fetchStudents);

</script>

<template>
  <div class="flex flex-col items-center p-2">
    <div class="flex w-full justify-between my-8 px-8">
      <h1 class="font-semibold text-2xl"><i class="pi pi-address-book" style="font-size: 1.35rem"></i> Estudiantes</h1>
      <SelectButton severity="warn" v-model="value" :options="options" />
      <div class="flex">
        <Button outlined severity="success" size="small" label="Nuevo" icon="pi pi-user-plus"
          @click="showAddModal = true" />
      </div>
    </div>

    <div class="flex justify-center w-full" v-if="value === 'Filtrar'">
      <StudentView />
    </div>
    <div class="flex justify-center w-full" v-else>
      <StudentsView :students="students" @update="fetchStudents" @delete="fetchStudents"/>
    </div>

    <ModalAdd v-model:visible="showAddModal" @add="fetchStudents"/>
  </div>
</template>
