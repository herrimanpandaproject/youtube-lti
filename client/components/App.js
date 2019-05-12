import React, {Component} from 'react';
import SearchBar from './SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  render() {
    return (
      <div
        className="App"
        style={{
          textAlign: 'center',
          backgroundColor: '#f3f3f3',
        }}
      >
        <SearchBar
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          search={this.search}
        />
      </div>
    );
  }

  search() {
    console.log('works');
    console.log(this.state);
    //api call using this.state.search, 
    //store in state for use in displaying/embedding.
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  handleChange(field) {
    this.setState(field.search);
  }
}

export default App;
