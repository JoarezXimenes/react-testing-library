import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('testa a pagina details', () => {
  const firstPokeName = pokemons[0].name;
  const firstPokeSummary = pokemons[0].summary;
  const firstPokelocs = pokemons[0].foundAt;
  it('testa a pagina details a partir da home', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const pokeDetails = screen.getByText(`${firstPokeName} Details`);
    expect(pokeDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    // sumario
    const summaryTitle = screen.getByText(/Summary/i);
    expect(summaryTitle).toBeInTheDocument();
    const summary = screen.getByText(firstPokeSummary);
    expect(summary).toBeInTheDocument();
    const locOf = screen.getByRole('heading', {
      name: `Game Locations of ${firstPokeName}`,
    });
    expect(locOf).toBeInTheDocument();
    const locQuantity = firstPokelocs.length;
    const renderedLocs = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(renderedLocs.length).toBe(locQuantity);
    firstPokelocs.forEach((e) => {
      const locSrc = e.map;
      const locName = e.location;
      const nameOnPage = screen.getByText(locName);
      const verifySrc = renderedLocs.some((el) => el.src === locSrc);
      expect(verifySrc).toBe(true);
      expect(nameOnPage).toBeInTheDocument();
      const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toBe(false);
    });
  });
  it('testa checkbox', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(checkbox);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(true);
  });
});
