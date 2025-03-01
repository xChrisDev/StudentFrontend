<script setup>
import StudentsView from '../src/components/StudentsView.vue'
import StudentView from '../src/components/StudentView.vue'
import { SelectButton, Button } from 'primevue';
import { ref } from 'vue';
import ModalAdd from './components/ModalAdd.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const value = ref('Mostrar');
const options = ref(['Mostrar', 'Filtrar']);
const showAddModal = ref(false);

const handleAdd = () => {
  toast.add({ severity: 'success', summary: 'Creación', detail: 'El alumno se ha registrado correctamente', group: 'br', life: 4000 });
}
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
      <StudentsView />
    </div>

    <ModalAdd v-model:visible="showAddModal" @add="handleAdd" />
    <Toast position="top-right" group="br" />
  </div>
</template>
