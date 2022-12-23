const fetchSearch = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!apiRes.ok) {
    throw new Error(
      `search response for ${breed} ${animal}s in ${location} not ok`
    );
  }

  return apiRes.json();
};

export default fetchSearch;
