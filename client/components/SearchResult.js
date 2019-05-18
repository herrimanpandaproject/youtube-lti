
import React, {Component} from 'react'
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements'

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
          
          </FlexItem>
        </Flex>
        )
    )
  }
}

export default SearchResult

