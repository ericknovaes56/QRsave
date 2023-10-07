import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async (key) => {
    try {
      const qrs = await AsyncStorage.getItem(key);
      return JSON.parse(qrs) || [];
    } catch (error) {
      console.log('erro ao pegar: ', error);
    }
  };

  const additem = async (key, value) => {
    try {
      let qrs = await getItem(key);
    
      qrs.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(qrs));
    } catch (error) {
      console.log('erro ao add: ', error);
    }
  };

  const delet = async (key, item) => {
    try {
      let qrsc = [];
      await AsyncStorage.setItem(key, JSON.stringify(qrsc));
      return qrsc;
    } catch (error) {
      console.log('erro ao deletar: ', error);
    }
  };

  return {
    getItem,
    additem,
    delet
  };
};

export default useStorage;
