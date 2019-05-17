import React, {Component} from 'react';
import SearchBar from './SearchBar';
import EmbedButton from './EmbedButton';
import SearchResult from './SearchResult'
import axios from 'axios';

class App extends Component {
  
  apiKey = 'AIzaSyBDV4M3bIZXFCTPq3cyqQoO_EqalwJvHz0';

  constructor(props) {
    super(props);
    this.state = {
      result:[]
    };

  }
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <SearchBar
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          search={this.search}
        />
        <SearchResult result={this.state.result}/>
      </div>
    );
  }

    // passes the Axios request to the Youtube API to get the response, which is the JSON file. From there we set result to be equal to
    // the json file, to avoid issues with the interpolation of {this.state.search} in searchUrl. 
  search = () => {
    let self = this;
    let searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${
      this.apiKey
    }&part=snippet&q=${this.state.search}&type=video`;
    axios
      .get(searchUrl)
      .then(function(res) {
        self.setState({result:res.data.items});
        console.log(self.state);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  
  handleKey = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  handleChange = field => {
    this.setState(field.search);
  };

  onEmbed = videoProps => {
    this.setState(videoProps);
  };
}

export default App;
