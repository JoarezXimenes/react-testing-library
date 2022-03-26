import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa o componente About', () => {
  it('testa de o site contem informações sobre a pokedex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });
  it('testa de existem 2 paragrafos com texto sobre a pokedex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  it('testa se a imagem correta está sendo renderizada', () => {
    renderWithRouter(<About />);
    const pokedexImage = screen.getByRole('img', { name: /Pokédex/i });
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
