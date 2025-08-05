import { createContext, useContext, useReducer } from 'react';

const FakeAuthContext = createContext();

const initState = {
  user: null,
  isUserAuthenticated: false,
};

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, isUserAuthenticated: true, user: action.payload };
    case 'logout':
      return { ...state, isUserAuthenticated: false, user: null };
    default:
      throw new Error('Unknown action type');
  }
}

function FakeAuthProvider({ children }) {
  const [{ user, isUserAuthenticated }, dispatch] = useReducer(
    reducer,
    initState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <FakeAuthContext.Provider
      value={(user, isUserAuthenticated, login, logout)}
    >
      {children}
    </FakeAuthContext.Provider>
  );
}

function useFakeAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined)
    throw new Error('FakeAuthContext is used outside its Provider');
  return context;
}

export { FakeAuthProvider, useFakeAuth };
