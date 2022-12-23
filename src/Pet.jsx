import { Link } from 'react-router-dom';
import { capFirstLetter } from './utilities';

const Pet = ({ animal, name, breed, location, id, images }) => {
  let hero = `http://pets-images.dev-apis.com/pets/none.jpg`;
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className='pet'>
      <div className='image-container'>
        <img src={hero} alt={name} />
      </div>
      <div className='info'>
        <h1>{name}</h1>
        <h2>
          {capFirstLetter(animal)} — {breed} — {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
