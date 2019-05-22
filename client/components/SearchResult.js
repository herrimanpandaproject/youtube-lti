
import React, {Component} from 'react';
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements';
import moment from 'moment';
import numeral from 'numeral';
import { IconEyeLine } from '@instructure/ui-icons';
import { IconLikeLine } from '@instructure/ui-icons';

class SearchResult extends Component {
  state = {}
  render() {
    return (
      this.props.result.map(result => 
        <div 
          style= {{
            backgroundColor: '#eaebed', 
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            width: '40%',
            minWidth: '464px',
            margin: '0 auto',
            borderRadius: '10px'
            
          }}
          key={result.etag}
        >
          <Flex justifyItems = "space-between" margin = "large none large none">
            <FlexItem shrink padding = "medium 0 medium medium">  
              <Img src = {result.snippet.thumbnails.medium.url} alt = "Image not found." style = {{
                borderRadius: '10px',
              }}/>
            </FlexItem>
            <FlexItem width = "15.5%" padding = "medium" grow >
              <Heading level="h4">{result.snippet.title.replace(/&#39;/g,"'").replace(/&quot;/g, '"')}</Heading>
              <p>Published by <strong>{result.snippet.channelTitle}</strong></p>
              <p>{moment(result.snippet.publishedAt, moment.ISO_8601).format('MMMM DD, YYYY')} | {numeral(result.statistics.viewCount).format('0.0a')}
              <IconEyeLine color = "primary"/>  {result.statistics.likeCount} <IconLikeLine color = "primary"/>   {result.statistics.dislikeCount} <IconLikeLine rotate = "180" color = "primary"/> </p>  
              <p style = {{
                fontFamily: 'Arial, sans-serif', 
                wordWrap: 'break-word',
                }}
              >
                {result.snippet.description.length > 200
                ? result.snippet.description.substring(0, 198)+"..."
                : result.snippet.description}
              </p>
            
            
            </FlexItem>
          </Flex>
        </div>
      )
    )
  }
}

export default SearchResult

