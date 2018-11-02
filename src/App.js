import React, { Component } from 'react';
import Drinks from './component/drinks';
import Ingredient from './component/ingredient';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Manage Ingredient</h1>
      <Ingredient />
      <h1>Manage Drinks</h1>
      <Drinks />


      </div>
    );
  }
}

export default App;
