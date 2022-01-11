import {ApolloClient, InMemoryCache, makeVar} from '@apollo/client'

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem('token')));

export const logUserIn = (token) => {
  localStorage.token = token;
  isLoggedInVar(true);
}
export const logUserOut = (token) => {
  localStorage.removeItem('token');
  window.location.reload();
}
export const darkModeVar = makeVar(Boolean(localStorage.darkMode));
export const enableDarkMode = () => {
  localStorage.darkMode = "enabled";
  darkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.removeItem('darkMode');
  darkModeVar(false);
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})


