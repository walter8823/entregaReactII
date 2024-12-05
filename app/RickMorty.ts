
export const fetchCharacters = async (page: number) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();
    return data;
  };
  

  export const fetchCharacterDetails = async (id: string) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();
    return data;
  };