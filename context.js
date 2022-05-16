import React from 'react';

export const AuthContext = React.createContext({
  isAuthenticated: false,
});

export const ThemeContext = React.createContext({
  theme: 'men',
});
