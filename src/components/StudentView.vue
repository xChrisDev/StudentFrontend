<script setup>
import { InputGroup, InputGroupAddon, InputText, Button } from "primevue";
import { ref, onMounted } from "vue";
import StudentCard from "./StudentCard.vue";
import { getStudents } from "../api/utils";

const user_id = ref(null);
const student = ref(null);
const isLoaded = ref(false);

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true;
    }, 200);
});

const searchStudent = async () => {
    if (user_id.value) {
        student.value = await getStudents(`http://127.0.0.1:8000/api/students/${user_id.value}`);
    }
};
</script>

<template>
    <Transition name="fade">
        <div v-if="isLoaded" class="flex flex-col gap-4 w-[30%]">
            <div class="flex gap-2">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText v-model="user_id" placeholder="ID del estudiante" />
                </InputGroup>
                <Button outlined severity="success" @click="searchStudent">
                    <span class="pi pi-search"></span>
                </Button>
            </div>

            <StudentCard v-if="student != null" :student="student" />
        </div>
    </Transition>
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
