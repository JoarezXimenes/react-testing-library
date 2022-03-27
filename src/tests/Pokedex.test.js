import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('testa o componente Pokedex', () => {
  it('testa se existe o h2 Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });
  it('testa se é exibido o próximo pkemon quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((el) => {
      const pokeName = screen.getByText(el.name);
      expect(pokeName).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const unicImg = screen.getAllByRole('img');
    expect(unicImg).toHaveLength(1);

    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: /all/i });
    const qtnType = 7;
    expect(btnFilter).toHaveLength(qtnType);
    expect(allBtn).toBeInTheDocument();

    pokemons.forEach(({ type }) => {
      const btn = screen.getByRole('button', { name: type });
      userEvent.click(btn);
      const typeName = screen.getAllByText(type);
      expect(btn).toBeInTheDocument();
      expect(typeName).toHaveLength(2);
      expect(allBtn).toBeInTheDocument();
    });
    userEvent.click(allBtn);
    pokemons.forEach(({ name }) => {
      const currentName = screen.getByText(name);
      expect(currentName).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });
  });
});
