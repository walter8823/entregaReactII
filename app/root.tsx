import type { LinksFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  NavLink
} from "@remix-run/react";

import { fetchCharacters } from "./RickMorty";

/*export const loader = async () => {
  const data = await fetchCharacters(1); // Puedes ajustar el número de página según sea necesario
  return json({ characters: data.results, info: data.info });
};*/

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1; // Predeterminado a la página 1
  const data = await fetchCharacters(Number(page));
  return json({ characters: data.results, info: data.info });
};

import appStylesHref from "./app.css?url"; 

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref }
];

export default function App() {
  const { characters, info } = useLoaderData<typeof loader>();

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Rick and Morty Characters</h1>
          <nav>
            {characters.length ? (
              <ul>
                {characters.map((character) => (
                  <li key={character.id}>
                    <NavLink to={`/characters/${character.id}`}>
                      {character.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No characters found</p>
            )}
          </nav>
          <div>
            {info.prev && (
              <Link to={`/?page=${info.prev.split("=")[1]}`}>Previous</Link>
            )}
            {info.next && (
              <Link to={`/?page=${info.next.split("=")[1]}`}>Next</Link>
            )}
          </div>
        </div>
        <div id="detail">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
