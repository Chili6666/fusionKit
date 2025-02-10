<template>
  <div class="log-container" ref="logContainer">
    <div v-for="(message, index) in logMessages" :key="index" class="log-message">
      <span :class="message.type">{{ message.type.toUpperCase() }}: </span
      >{{ message.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";

interface LogMessage {
  type: "log" | "error" | "info" | "warn";
  text: string;
}

const logMessages = ref<LogMessage[]>([]);
const logContainer = ref<HTMLElement | null>(null);

const addLogMessage = (
  type: "log" | "error" | "info" | "warn",
  text: string
) => {
  logMessages.value.push({ type, text });
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  });
};

const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;

const overrideConsoleMethods = () => {
  console.log = (...args: any[]) => {
    addLogMessage("log", args.join(" "));
    originalConsoleLog.apply(console, args);
  };

  console.error = (...args: any[]) => {
    addLogMessage("error", args.join(" "));
    originalConsoleError.apply(console, args);
  };

  console.info = (...args: any[]) => {
    addLogMessage("info", args.join(" "));
    originalConsoleInfo.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    addLogMessage("warn", args.join(" "));
    originalConsoleWarn.apply(console, args);
  };
};

const restoreConsoleMethods = () => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.info = originalConsoleInfo;
  console.warn = originalConsoleWarn;
};

onMounted(() => {
  overrideConsoleMethods();
});

onUnmounted(() => {
  restoreConsoleMethods();
});
</script>

<style scoped>
.log-container {
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
  font-family: monospace;
  height: 200px;
}

.log-message {
  display: flex;
  align-items: flex-start;
}

.log-message span {
  min-width: 80px; /* Adjust the width as needed */
  text-align: left;
}

.log {
  color: black;
}
.error {
  color: red;
}
.info {
  color: blue;
}
.warn {
  color: orange;
}
</style>
