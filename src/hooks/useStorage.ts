const useStorage = () => {
  const setItem = <T>(key: string, val: T) => {
    localStorage.setItem(key, JSON.stringify(val));
  };
  const getItem = <T>(key: string, defaultVal?: T) => {
    const vl = localStorage.getItem(key);
    if (!vl) {
      return defaultVal;
    }
    try {
      const pvl = JSON.parse(vl);
      return pvl as T;
    } catch (e) {
      return defaultVal;
    }
  };

  const delItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    delItem,
    getItem,
    setItem,
  };
};

export default useStorage;
