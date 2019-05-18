import React, {Component} from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements'
import styles from './app.css';

class App extends Component {
  
  apiKey = 'AIzaSyBDV4M3bIZXFCTPq3cyqQoO_EqalwJvHz0';
  
  constructor(props) {
    super(props);

    this.state = {
      stats:[]
    };

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
        
        {this.state.stats.map(result => 
          // implementaion of ./SearchResult componnet, this will basically be contained to one JSX element. Next update.
          <Flex visualDebug justifyItems = "center" margin = "large 0 large 0">
            <FlexItem > 
            <Img src = {result.snippet.thumbnails.medium.url} alt = "Image not found." style = {{borderRadius: '15px'}}/>
            </FlexItem>
            <FlexItem shrink size = "200px" padding = "medium">
            <Heading>{result.snippet.title}</Heading>
            <p style = {{fontFamily: 'Lato, Arial, sans-serif', hover: 'border: red 5px solid'}}>{result.snippet.description.substring(0, 50)}...</p>
            <p>{result.snippet.publishedAt.substring(0,4)}</p>
            <p>{result.statistics.viewCount}</p>
            </FlexItem>
          </Flex>
          )}
      </div>
    );
  }

  search() {
    // passes the Axios request to the Youtube API to get the response, which is the JSON file. From there we set result to be equal to
    // the json file, to avoid issues with the interpolation of {this.state.search} in searchUrl. 
    let self = this;
  

    let searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${
      this.apiKey
    }&part=snippet&q=${this.state.search}&type=video`;
    
    axios
      .get(searchUrl)
      .then(function(res) {
       
        let combinedId = self.combineIds(res.data.items);
      //
        axios
        .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${combinedId}&key=${self.apiKey}`)
        .then(function(res) {
          self.setState({stats:res.data.items});
          console.log(self.state.stats);
        })
        .catch(function(err) {
          console.log(err);
        });
      //
      })
      .catch(function(err) {
        console.log(err);
      });

      
  }
  
  handleKey = (e) => {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  handleChange = (field) => {
    this.setState(field.search);
  }

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

  

}

export default App;
