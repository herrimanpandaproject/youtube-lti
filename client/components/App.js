import React, {Component} from 'react';
import SearchBar from './SearchBar';
import EmbedButton from './EmbedButton';
import SearchResult from './SearchResult'
import axios from 'axios';
import styles from './Sheet.css';
import DetailedVideo from './DetailedVideo';

class App extends Component {
  
  apiKey = 'AIzaSyBDV4M3bIZXFCTPq3cyqQoO_EqalwJvHz0';

  constructor(props) {
    super(props);
    this.state = {
      stats:[]
    };

  }
  render() {
    
    return (
      
      <div >
        <SearchBar
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          search={this.search}
        />
        <SearchResult result={this.state.stats}/>
        <p className = {styles.selector}>Bro</p>
        <EmbedButton/>
        
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
        let combinedId = self.combineIds(res.data.items);
        axios
        .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${combinedId}&key=${self.apiKey}`)
        .then(function(res) {
          self.setState({stats:res.data.items});
          console.log(self.state.stats);
        })
        .catch(function(err) {
          console.log(err);
        });
      })
      .catch(function(err) {
        console.log(err);
      });  
  }
  
  handleKey = (e) => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  handleChange = (field) => {
    this.setState(field.search);
  };

  combineIds = (items) =>
  {
    let combinedVideoIds = "";
    var numberOfResponses = 0; 
    while ( numberOfResponses < 5)
    {
      combinedVideoIds = combinedVideoIds + "%2C" + items[numberOfResponses].id.videoId;
      numberOfResponses = numberOfResponses + 1;
    }
    return combinedVideoIds;
  }

  onEmbed = videoProps => {
    this.setState({iframeProps : videoProps});
  };

}

export default App;
