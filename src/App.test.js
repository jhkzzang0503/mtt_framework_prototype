import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main application with header and sidebar', () => {
  render(<App />);
  
  // Header 텍스트가 렌더링되는지 확인 (실제 텍스트에 맞게 수정)
  const headerElement = screen.getByText(/MTT Framework Builder/i);
  expect(headerElement).toBeInTheDocument();

  // Sidebar에 기본 모듈이 렌더링되는지 확인 (실제 텍스트에 맞게 수정)
  const buttonModuleElement = screen.getByText(/버튼 모듈/i);
  expect(buttonModuleElement).toBeInTheDocument();

  const cardModuleElement = screen.getByText(/카드 모듈/i);
  expect(cardModuleElement).toBeInTheDocument();
});
