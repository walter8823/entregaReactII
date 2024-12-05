import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchCharacterDetails } from "~/RickMorty";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { characterId } = params;
  const data = await fetchCharacterDetails(characterId);
  return json(data);
};

export default function CharacterDetail() {
  const character = useLoaderData();
  
  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <ul>
        <li>Status: {character.status}</li>
        <li>Species: {character.species}</li>
        <li>Gender: {character.gender}</li>
      </ul>
    </div>
  );
}
