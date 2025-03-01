<script setup>
import { ref, onMounted, defineEmits, defineProps } from 'vue';
import { Avatar, Button } from 'primevue';
import ModalUpdate from './ModalUpdate.vue';
import ModalDelete from './ModalDelete.vue';

const { student } = defineProps({
    student: {
        type: Object,
        default: () => null
    }
});

const emit = defineEmits(["deleted", "edited"]);
const isLoaded = ref(false);
const showUpdateModal = ref(false); // Estado para controlar la visibilidad del modal de edición
const showDeleteModal = ref(false); // Estado para el modal de eliminación

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true;
    }, 200);
});
</script>

<template>
    <Transition name="fade">
        <div v-if="isLoaded && student.name">
            <div class="bg-[#262626] shadow-lg rounded-lg w-[300px] h-[270px] mb-1 flex flex-col">
                <!-- Encabezado con gradiente -->
                <div class="bg-gradient-to-r from-green-400 to-teal-500 rounded-t-lg">
                    <div class="flex items-end h-28">
                        <div class="flex items-center ps-3 pb-3">
                            <Avatar icon="pi pi-user" class="mr-2 border-4 border-white" size="xlarge" shape="circle" />
                            <h3 class="text-white text-2xl font-bold">{{ student.name }} {{ student.lastname }}</h3>
                        </div>
                    </div>
                </div>

                <div class="flex-grow px-4 py-3">
                    <p class="text-white text-md">
                        Carrera: <span class="font-medium text-teal-500 text-wrap">{{ student.career }}</span>
                    </p>
                    <p class="text-white text-md">
                        Edad: <span class="font-medium text-teal-500">{{ student.age }}</span>
                    </p>
                </div>

                <div class="p-3 flex justify-end gap-2">
                    <Button severity="warn" size="med" label="Editar" icon="pi pi-user-edit" class="p-button-text"
                        @click="showUpdateModal = true" />
                    <Button severity="danger" size="med" label="Eliminar" icon="pi pi-trash" class="p-button-text"
                        @click="showDeleteModal = true" />
                </div>
            </div>
        </div>
    </Transition>

    <ModalUpdate :student="student" v-model:visible="showUpdateModal" @edited="emit('edited')" />
    <ModalDelete :student="student" v-model:visible="showDeleteModal" @deleted="emit('deleted')" />
</template>
