<script setup>
import { ref, onMounted } from 'vue';
import { Avatar, Button, Dialog, InputText, FloatLabel } from 'primevue';
import { updateStudent, deleteStudent } from '../api/utils';

const { student } = defineProps({
    student: {
        type: Object,
        default: () => null
    }
});

const isLoaded = ref(false);
const visible = ref(false);

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true;
    }, 200);
});

const handleDelete = async (id) => {
    try {
        await deleteStudent(`http://127.0.0.1:8000/api/students/${id}`);
        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Estudiante eliminado correctamente',
            life: 3000
        });
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el estudiante',
            life: 3000
        });
    }
};
const handleUpdate = (student) => {
    // const data = {
    //     'name': student.name,
    //     'lastname': student.lastname,
    //     'age': student.age,
    //     'career': student.career,
    // }
    // // console.log(data)
    // updateStudent(`http://127.0.0.1:8000/api/students/${student.id}`, data)
}

</script>

<template>
    <Transition name="fade">
        <div v-if="isLoaded && student.name">
            <div class="bg-[#262626] shadow-lg rounded-lg min-w-[300px] mb-1">
                <div class="bg-gradient-to-r from-green-400 to-teal-500 rounded-t-lg">
                    <div class="flex items-end h-28">
                        <div class="flex items-center ps-3 pb-3">
                            <Avatar icon="pi pi-user" class="mr-2 border-4 border-white" size="xlarge" shape="circle" />
                            <h3 class="text-white text-2xl font-bold">{{ student.name }} {{ student.lastname }}</h3>
                        </div>
                    </div>
                </div>

                <div class="px-4 py-3">
                    <p class="text-white text-md">Carrera: <span class="font-medium text-teal-500">{{ student.career
                            }}</span></p>
                    <p class="text-white text-md">Edad: <span class="font-medium text-teal-500">{{ student.age }}</span>
                    </p>

                    <div class="mt-4 flex justify-end gap-2">
                        <Button severity="warn" size="med" label="Editar" icon="pi pi-user-edit" class="p-button-text"
                            @click="visible = true" />
                        <Button severity="danger" size="med" label="Eliminar" icon="pi pi-trash" class="p-button-text"
                            @click="handleDelete(student.id)" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <Transition name="fade">
        <div v-if="isLoaded && !student.name" class="flex justify-center items-center">
            <h2 class="text-2xl font-semibold bg-[#262626] rounded-lg p-2">{{ student.message }}</h2>
        </div>
    </Transition>

    <div class="card flex justify-center">
        <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
            <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                    <Avatar icon="pi pi-user" class="mr-1 border-2 border-white" shape="circle" />
                    <span class="font-bold whitespace-nowrap">{{ student.name }} {{ student.lastname }}</span>
                </div>
            </template>
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Actualizar informacion de alumno</span>
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
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Save" outlined severity="success" @click="visible = false" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
