import { useState, useEffect } from 'react';
import Pet from './Pet';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const breeds = ['labrador'];

  const requestPets = async () => {
    try {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
      );
      if (!res.ok) throw new Error('Error getting response from the API call.');

      const data = await res.json();

      setPets(data.pets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestPets();
  });

  return (
    <div className='search-params'>
      <form>
        <label htmlFor='location'>
          Location
          <input
            onChange={e => setLocation(e.target.value)}
            id='location'
            value={location}
            placeholder='Location'
          />
        </label>
        <label htmlFor='animal'>
          Animal
          <select
            id='animal'
            value={animal}
            onChange={e => {
              setAnimal(e.target.value);
              setBreed('');
            }}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor='breeds'>
          Breeds
          <select
            id='breeds'
            disabled={breeds.length === 0}
            value={breed}
            onChange={e => setBreed(e.target.value)}
          >
            <option />
            {breeds.map(breed => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map(pet => (
        <Pet
          key={pet.id}
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
        />
      ))}
    </div>
  );
};

export default SearchParams;
