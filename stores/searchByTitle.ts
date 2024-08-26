import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const searchByTitle: Ref<string> = ref<string>("");

  const clearSearchByTitle = () => {
    searchByTitle.value = "";
  };

  return {
    searchByTitle,
    clearSearchByTitle,
  };
});
