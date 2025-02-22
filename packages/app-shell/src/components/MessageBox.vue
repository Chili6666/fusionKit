<template>
    <div v-if="props.visible" class="backdrop">
      <div class="message-box">
        <h2>{{ props.header }}</h2>
        <p>{{ props.text }}</p>
        <button @click="close">Close</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  
  interface MessageBoxProps {
    header: string;
    text: string;
    visible: boolean;
  }
  
  const props = defineProps<MessageBoxProps>();
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .message-box {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .message-box h2 {
    margin-top: 0;
  }
  
  .message-box button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background: #2196f3;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .message-box button:hover {
    background: #1976d2;
  }
  </style>