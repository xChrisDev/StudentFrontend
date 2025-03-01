<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
import { Avatar, Button, Dialog, InputText, FloatLabel } from 'primevue';
import { updateStudent } from '../api/utils.js'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const props = defineProps({
    student: {
        type: Object,
        default: () => null
    },
    visible: {
        type: Boolean,
        default: false
    }
});

const name = ref("")
const lastname = ref("")
const age = ref("")
const career = ref("")

const updateFields = () => {
    if (props.student) {
        name.value = props.student.name
        lastname.value = props.student.lastname
        age.value = props.student.age
        career.value = props.student.career
    }
}

watch(() => props.visible, (newVal) => {
    if (newVal) {
        updateFields();
    }
});

const emit = defineEmits(["edited", "update:visible"]);

const handleUpdate = async () => {
  try {
    const updatedStudent = {
      name: name.value,
      lastname: lastname.value,
      age: age.value,
      career: career.value
    };

    const data = await updateStudent(
      `http://127.0.0.1:8000/api/students/${props.student.id}`, 
      JSON.stringify(updatedStudent)
    );

    if(data.message === 'Error en la validación de datos'){
        toast.add({ severity: 'error', summary: 'Actualizar', detail: 'El alumno NO se pudo actualizar', life: 4000 });
    }else{
        toast.add({ severity: 'warn', summary: 'Actualizado correctamente', detail: 'Alumno actualizado correctamente', life: 4000 });
    }

    emit("edited", updatedStudent);
    emit("update:visible", false);
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
  }
};

</script>

<template>
    <Dialog v-model:visible="props.visible" modal header="Editar Estudiante" :style="{ width: '25rem' }">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <Avatar icon="pi pi-user" class="mr-1 border-2 border-white" shape="circle" />
                <span class="font-bold whitespace-nowrap">{{ name }} {{ lastname }}</span>
            </div>
        </template>

        <FloatLabel class="mb-2" variant="in">
            <label for="name" class="font-semibold w-24">Nombre</label>
            <InputText id="name" class="w-full" autocomplete="off" v-model="name" />
        </FloatLabel>
        <FloatLabel class="mb-2" variant="in">
            <label for="lastname" class="font-semibold w-24">Apellido</label>
            <InputText id="lastname" class="w-full" autocomplete="off" v-model="lastname" />
        </FloatLabel>
        <FloatLabel class="mb-2" variant="in">
            <label for="age" class="font-semibold w-24">Edad</label>
            <InputText id="age" class="w-full" autocomplete="off" v-model="age" />
        </FloatLabel>
        <FloatLabel class="mb-2" variant="in">
            <label for="career" class="font-semibold w-24">Carrera</label>
            <InputText id="career" class="w-full" autocomplete="off" v-model="career" />
        </FloatLabel>

        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="emit('update:visible', false)" />
            <Button label="Guardar" outlined severity="success" @click="handleUpdate" />
        </template>
    </Dialog>
    <Toast position="top-right" group="br" />
</template>
