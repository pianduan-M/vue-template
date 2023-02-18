export const useRequest = (callback) => {
  const loading = ref(false);

  const request = (...args) => {
    loading.value = true;
    callback(...args);
  };
};
