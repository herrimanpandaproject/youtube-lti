import React, {Component} from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';

class App extends Component {
  apiKey = 'AIzaSyBDV4M3bIZXFCTPq3cyqQoO_EqalwJvHz0';
  constructor(props) {
    super(props);
    // res from the search() function, upon search request is stored inside state. 
    // The JSON object using &part=snippet plus whatever else, is stored inside. 
    this.state = {};
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <SearchBar
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          search={this.search}
        />
      </div>
    );
  }

  search() {
    let self = this;
    let searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${
      this.apiKey
    }&part=snippet&q=${this.state.search}&type=video`;
    axios
      .get(searchUrl)
      .then(function(res) {
        self.setState(res);
        console.log(self.state)
      })
      .catch(function(err) {
        console.log(err);
      });
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
