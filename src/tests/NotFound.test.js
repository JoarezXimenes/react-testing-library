import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa a página NotFound', () => {
  it('testa de o texto Page requested not found é exibido', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
  it('testa se a imagem correta é renderizada', () => {
    renderWithRouter(<NotFound />);
    const imgAlt = 'Pikachu crying because the page requested was not found';
    const pikachuImg = screen.getByRole('img', { name: imgAlt });
    expect(pikachuImg).toBeInTheDocument();
    expect(pikachuImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
