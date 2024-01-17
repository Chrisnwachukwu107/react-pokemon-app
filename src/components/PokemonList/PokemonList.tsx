import { ReactNode } from 'react';

interface Props
{
  pokemon: string[];
}

export default function PokemonList({
  pokemon,
}: Props): ReactNode
{
  return (
    <div>
      { pokemon.map((p) =>
      {
        return (
          <div
            key={ p }
          >
            { p }
          </div>
        );
      }) }
    </div>
  )
}
