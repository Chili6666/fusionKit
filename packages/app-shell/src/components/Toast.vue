<template>
    <transition name="fade">
      <div v-if="visible" class="toast" :class="type">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  interface ToastProps {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    duration: number;
  }
  
  const props = defineProps<ToastProps>();
  
  const visible = ref(false);
  
  const show = () => {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  };
  
  onMounted(show);
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 1000;
  }
  
  .toast.info {
    background-color: #2196f3;
  }
  
  .toast.success {
    background-color: #4caf50;
  }
  
  .toast.warning {
    background-color: #ff9800;
  }
  
  .toast.error {
    background-color: #f44336;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>