import { useState, useEffect } from 'react';

const localCache = {};

export const useBreedList = animal => {
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
      setBreedList([]);
      setStatus('loading');

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const animalData = await res.json();

      localCache[animal] = animalData.breeds || [];
      setBreedList(localCache[animal]);
      setStatus['loaded'];
    }
  }, [animal]);

  return [breedList, status];
};
