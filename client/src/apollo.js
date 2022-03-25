import {ApolloClient, createHttpLink, InMemoryCache, makeVar} from '@apollo/client'
import {setContext} from "@apollo/client/link/context";

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

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      token
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


