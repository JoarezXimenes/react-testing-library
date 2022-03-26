import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { FavoritePokemons } from '../components';

describe('Testa favoritos', () => {
  it('teste o favorites sem nenhum pokemon favoritado', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemons = screen.getByText(/No favorite pokemon found/i);
    expect(noPokemons).toBeInTheDocument();
  });
  it('testa favorites a partir do app com pokemon favoritado', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /More details/i });
    expect(pokemonLink).toBeInTheDocument();

    userEvent.click(pokemonLink);
    const { pathname } = history.location;
    const pokeRegex = /pokemons/i;
    const resultPokeLink = pokeRegex.test(pathname);
    expect(resultPokeLink).toBe(true);

    const favoriteCheck = screen.getByRole('checkbox');
    expect(favoriteCheck).toBeInTheDocument();

    userEvent.click(favoriteCheck);
    expect(favoriteCheck.checked).toBe(true);

    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favLink);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
