import { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList/PokemonList';
import './App.css';
import axios, { Canceler } from 'axios';
import Pagination from './components/Pagination/Pagination';

function App()
{
  const [ pokemon, setPokemon ] = useState([]);
  const [ currentPageUrl, setCurrentPageUrl ] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [ nextPageUrl, setNextPageUrl ] = useState("");
  const [ previousPageUrl, setPreviousPageUrl ] = useState("");
  const [ loading, setLoading ] = useState(true);

  useEffect(() =>
  {
    setLoading(true);
    let cancel: Canceler;

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false);

        setPokemon(res.data.results.map((p: {
          name: string,
          url: string,
        }) => p.name))

        setNextPageUrl(res.data.next);
        setPreviousPageUrl(res.data.previous);
      })

      return () => cancel();
  }, [ currentPageUrl ])

  function gotoNextPage()
  {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPreviousPage()
  {
    setCurrentPageUrl(previousPageUrl);
  }

  if (loading) return "Loading..."

  return (
    <>
      <PokemonList
        pokemon={ pokemon }
      />
      <Pagination
        gotoNextPage={ nextPageUrl ? gotoNextPage : null }
        gotoPreviousPage={ previousPageUrl ? gotoPreviousPage : null }
      />
    </>
  );
}

export default App;
