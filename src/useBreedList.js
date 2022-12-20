import { useState, useEffect } from 'react';

const localCache = {};

const useBreedList = animal => {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState('unloaded');

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
      return;
    }

    if (localCache[animal]) {
      setBreedList(localCache[animal]);
      return;
    }

    requestBreedList();

    async function requestBreedList() {
      try {
        setBreedList([]);
        setStatus('loading');

        const res = await fetch(
          `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
        );
        const animalData = await res.json();

        localCache[animal] = animalData.breeds || [];
        setBreedList(localCache[animal]);
        setStatus['loaded'];
      } catch (error) {
        console.error(error);
      }
    }
  }, [animal]);

  return [breedList, status];
};

export default useBreedList;
