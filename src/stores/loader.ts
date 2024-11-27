// TODO: Global app state => loading
import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loading', {
  // State: Tracks whether the loader is active
  state: () => ({
    isLoading: false, // Initial state of the loader
  }),

  // Actions: Functions to modify the state
  actions: {
    /**
     * Activates the loader.
     */
    startLoading(): void {
      this.isLoading = true;
    },

    /**
     * Deactivates the loader.
     */
    stopLoading(): void {
      this.isLoading = false;
    },
  },
});
