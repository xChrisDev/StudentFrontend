<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { Button, Dialog, InputText, FloatLabel } from 'primevue';
import { addStudent } from '../api/utils';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["add", "update:visible"]);
const student = ref({
    name: '',
    lastname: '',
    age: '',
    career: ''
});

const handleAdd = async () => {
    const data = await addStudent('http://127.0.0.1:8000/api/students', JSON.stringify(student.value))
    if(data.message === 'Error en la recoleccion de datos'){
        toast.add({ severity: 'error', summary: 'Agregar', detail: 'El alumno NO se pudo agregar', life: 4000 });
    }else{
        toast.add({ severity: 'success', summary: 'Agregado correctamente', detail: 'El alumno se ha añadido correctamente', life: 4000 });
    }
    emit("add", student.value);
    emit("update:visible", false);
};
</script>

<template>
    <Dialog v-model:visible="props.visible" modal header="Añadir Estudiante" :style="{ width: '25rem' }">
        <div class="p-4">
            <FloatLabel class="mb-2" variant="in">
                <label for="name">Nombre</label>
                <InputText id="name" class="w-full" v-model="student.name" />
            </FloatLabel>
            <FloatLabel class="mb-2" variant="in">
                <label for="lastname">Apellido</label>
                <InputText id="lastname" class="w-full" v-model="student.lastname" />
            </FloatLabel>
            <FloatLabel class="mb-2" variant="in">
                <label for="age">Edad</label>
                <InputText id="age" class="w-full" v-model="student.age" />
            </FloatLabel>
            <FloatLabel class="mb-2" variant="in">
                <label for="career">Carrera</label>
                <InputText id="career" class="w-full" v-model="student.career" />
            </FloatLabel>
        </div>

        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="emit('update:visible', false)" />
            <Button label="Guardar" outlined severity="success" @click="handleAdd" />
        </template>
    </Dialog>
    <Toast position="top-right" group="br" />
</template>
