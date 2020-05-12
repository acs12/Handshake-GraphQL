import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Main from './component/Main';
import { BrowserRouter } from 'react-router-dom';
import backendURL from './config';

// apollo client setup
const client = new ApolloClient({
  uri: `${backendURL}/graphql`
});
//App Component
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/*Use Browser Router to route to different pages*/}
        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;