import React, {Component} from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements'


class App extends Component {
  

  apiKey = 'AIzaSyBDV4M3bIZXFCTPq3cyqQoO_EqalwJvHz0';
  combineIds;
  constructor(props) {
    super(props);

    this.state = {
      result:[],
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
        
        {this.state.result.map(result => 
          // implementaion of ./SearchResult componnet, this will basically be contained to one JSX element. Next update.
          <Flex visualDebug justifyItems = "center" margin = "large 0 large 0">
            <FlexItem >
            <Img src = {result.snippet.thumbnails.medium.url} alt = "Image not found." style = {{borderRadius: '15px'}}/>
            </FlexItem>
            <FlexItem width = "15.5%" padding = "medium">
            <Heading>{result.snippet.title}</Heading>
            <p style = {{fontFamily: 'Lato, Arial, sans-serif', hover: 'border: red 5px solid'}}>{result.snippet.description.substring(0, 50)}...</p>
            <p>{result.snippet.publishedAt.substring(0,4)}</p>
            <p>{this.state.stats[0].statistics.viewCount}</p>
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
    //let videoListUrl = {for (i = 0; i < this.state.items.length; i++) (i =>) }
    //let firstPart =  `https://www.googleapis.com/youtube/v3/videos?
    //part=snippet,contentDetails,statistics&id=${self.videoListUrl}
   // &key=${this.apiKey}`;

    let searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${
      this.apiKey
    }&part=snippet&q=${this.state.search}&type=video`;
    axios
      .get(searchUrl)
      .then(function(res) {
        self.setState({result:res.data.items});
      })
      .catch(function(err) {
        console.log(err);
      });

      //self.combineIds = self.combineIds();
        // Seperate axios call to get the statistics of all the videos, probably a workaround. But can't get to work with just the search call.
      axios
      .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=CtyZzMI_R7w&key=${this.apiKey}`)
      .then(function(res) {
        self.setState({stats:res.data.items});
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
  // Intended to get every one of the ID's combined to make easier to put in second Axios call.
  // combineIds()
  // {
  //   let combinedVideoIds = "";
  //   var numberOfResponses = 0; 
  //   while ( numberOfResponses < 5)
  //   {
  //     combinedVideoIds = combinedVideoIds + "%2C" + this.state.result.items[numberOfResponses].id.videoId;
  //     numberOfResponses = numberOfResponses + 1;
  //   }
  //}

}

export default App;
