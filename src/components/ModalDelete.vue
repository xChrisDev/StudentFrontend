<script setup>
import { defineProps, defineEmits } from 'vue';
import { Avatar, Button, Dialog } from 'primevue';
import { deleteStudent } from '../api/utils';

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
const emit = defineEmits(["deleted", "update:visible"]);

const handleDelete = async () => {
    await deleteStudent(`http://127.0.0.1:8000/api/students/${props.student.id}`);
    emit("deleted");
    emit("update:visible", false);
};
</script>

<template>
    <Dialog v-model:visible="props.visible" modal header="Eliminar Estudiante" :style="{ width: '25rem' }">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <Avatar icon="pi pi-user" class="mr-1 border-2 border-white" shape="circle" />
                <span class="font-bold whitespace-nowrap">{{ student.name }} {{ student.lastname }}</span>
            </div>
        </template>
        <p>¿Estás seguro de que deseas eliminar a este estudiante?</p>

        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="emit('update:visible', false)" />
            <Button label="Eliminar" outlined severity="danger" @click="handleDelete" />
        </template>
    </Dialog>
</template>
