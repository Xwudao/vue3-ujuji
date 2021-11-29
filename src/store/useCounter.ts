import { defineStore } from 'pinia';

const useCounter = defineStore({
  id: 'counter',
  state: () => ({
    count: 1,
  }),
  actions: {
    add(delta: number) {
      this.count += delta;
    },
  },
});

export default useCounter;
