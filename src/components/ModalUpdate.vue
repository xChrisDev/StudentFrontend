<script setup>
import { defineProps, defineEmits } from 'vue';
import { Avatar, Button, Dialog, InputText, FloatLabel } from 'primevue';

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

const emit = defineEmits(["edited", "update:visible"]);

const handleUpdate = () => {
    emit("edited");
    emit("update:visible", false);
    // const data = {
    //     'name': student.name,
    //     'lastname': student.lastname,
    //     'age': student.age,
    //     'career': student.career,
    // }
    // // console.log(data)
    // updateStudent(`http://127.0.0.1:8000/api/students/${student.id}`, data)
};
</script>

<template>
    <Dialog v-model:visible="props.visible" modal header="Editar Estudiante" :style="{ width: '25rem' }">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <Avatar icon="pi pi-user" class="mr-1 border-2 border-white" shape="circle" />
                <span class="font-bold whitespace-nowrap">{{ student.name }} {{ student.lastname }}</span>
            </div>
        </template>

        <FloatLabel class="mb-2" variant="in">
            <label for="name" class="font-semibold w-24">Nombre</label>
            <InputText id="name" class="w-full" autocomplete="off" v-model="student.name" />
        </FloatLabel>
        <FloatLabel class="mb-2" variant="in">
            <label for="lastname" class="font-semibold w-24">Apellido</label>
            <InputText id="lastname" class="w-full" autocomplete="off" v-model="student.lastname" />
        </FloatLabel>
        <FloatLabel class="mb-2" variant="in">
            <label for="age" class="font-semibold w-24">Edad</label>
            <InputText id="age" class="w-full" autocomplete="off" v-model="student.age" />
        </FloatLabel>
        <FloatLabel class="mb-2" variant="in">
            <label for="career" class="font-semibold w-24">Carrera</label>
            <InputText id="career" class="w-full" autocomplete="off" v-model="student.career" />
        </FloatLabel>

        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="emit('update:visible', false)" />
            <Button label="Guardar" outlined severity="success" @click="handleUpdate" />
        </template>
    </Dialog>
</template>
