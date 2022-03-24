import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  it('testa se o link home foi renderizado', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('testa se o link about foi renderizado', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  it('testa se o link Favorite Pokémons foi renderizado', () => {
    renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favLink).toBeInTheDocument();
  });
});

describe('Testa o funcionamento dos links', () => {
  it('testa se o link Home leva para url /', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testa se o link about leva para url /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('testa se o link Favorite Pokémons leva para url /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
