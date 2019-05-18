
import React, {Component} from 'react'
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements'
import { parse } from 'path';

class SearchResult extends Component {
  state = {}
  render() {
    return (
      this.props.result.map(result => 
        <Flex visualDebug justifyItems = "center" margin = "large 0 large 0">
          <FlexItem >
          <Img src = {result.snippet.thumbnails.medium.url} alt = "Image not found." style = {{borderRadius: '15px'}}/>
          </FlexItem>
          <FlexItem width = "15.5%" padding = "medium">
          <Heading>{result.snippet.title}</Heading>
          <p style = {{fontFamily: 'Arial, sans-serif', hover: 'border: red 5px solid'}}>{result.snippet.description.substring(0, 50)}...</p>
          <p>{result.snippet.publishedAt.substring(0,4)}</p>
          <p>{this.shortenViewCount(result.statistics.viewCount)}</p>
          </FlexItem>
        </Flex>
        )
    )
  }

  shortenViewCount = (items) => 
  {
    let firstNum;
    let secondNum;
    // Between 1 mill and 10 mil
    if (items >= 1000000 && items < 10000000)
    {
      firstNum = (items / 1000000).toString().substring(0, 1);
      secondNum = (items % 1000000).toString().substring(0, 1);
      return (firstNum + "." + secondNum + " mil views");
    }
    // Between 10 mil and 100 mil
    else if (items > 10000000 && items < 100000000)
    {
      firstNum = (items / 10000000).toString().substring(0, 2);
      secondNum = (items % 10000000).toString().substring(0, 1);
      return (firstNum + "." + secondNum + " mil views");
    }
    else if (items > 100000000 && items < 1000000000)
    {
      firstNum = (items / 100000000).toString().substring(0, 3);
      secondNum = (items % 100000000).toString().substring(0, 1);
      return (firstNum + "." + secondNum + " mil views");
    }
    else
    {
      return (items);
    }

    
  }

}

export default SearchResult

