<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
defineEmits(["close", "confirm"]);
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <h2>Logout Confirmation</h2>
        <p>Are you sure you want to log out?</p>
        <div class="button-group">
          <button @click="$emit('confirm')" class="confirm-btn">
            <span>Yes, Logout</span>
          </button>
          <button @click="$emit('close')" class="cancel-btn">
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #eae9e9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 5px rgba(164, 8, 8, 0.954);

  max-width: 400px;
  width: 90%;
  text-align: center;
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  position: relative;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

button span {
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgb(139, 138, 138);
  opacity: 0.3;
  transition: all 0.2s ease;
}

button:hover::before {
  left: 100%;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.confirm-btn {
  background-color: #e74c3c;
  color: white;
}

.confirm-btn:hover {
  background-color: #e9786c;
}

.cancel-btn {
  background-color: #3498db;
  color: white;
}

.cancel-btn:hover {
  background-color: #76b7e1;
}

.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
