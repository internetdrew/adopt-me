const fetchSearch = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1];

  const apiResponse = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!apiResponse.ok) {
    throw new Error(`search response for ${animal} ${location} ${breed}not ok`);
  }

  return apiResponse.json();
};

export default fetchSearch;
