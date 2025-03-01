<script setup>
import StudentsView from '../src/components/StudentsView.vue'
import StudentView from '../src/components/StudentView.vue'
import { SelectButton } from 'primevue';
import { ref } from 'vue';

const value = ref('Mostrar');
const options = ref(['Mostrar', 'Filtrar']);
</script>

<template>
  <div class="flex flex-col items-center p-2">
    <SelectButton severity="warn" v-model="value" :options="options" class="my-6" />
    <div class="flex justify-center w-full" v-if="value === 'Filtrar'">
      <StudentView />
    </div>
    <div class="flex justify-center w-full" v-else>
      <StudentsView />
    </div>
  </div>
</template>
