
import React, {Component} from 'react';
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements';
import moment from 'moment';
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
              <p>{moment(result.snippet.publishedAt, moment.ISO_8601).format('MMMM DD, YYYY')} - {this.shortenViewCount(result.statistics.viewCount)}
              <IconEyeLine color = "primary"/> {result.statistics.likeCount} <IconLikeLine color = "primary"/> {result.statistics.dislikeCount} <IconLikeLine rotate = "180" color = "primary"/> </p>
              
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
  shortenViewCount = (items) => 
  {
    const MILLION = 1000000;
    const TEN_MILLION = 10000000;
    const HUNDRED_MILLION = 100000000;
    const BILLION = 1000000000;
    const HUNDRED_THOUSAND = 100000;

    let firstNum;
    let secondNum;
    // Between 1 mill and 10 mil
    if (items > MILLION && items < TEN_MILLION)
    {
      firstNum = items.toString().substring(0, 1);
      secondNum = items.toString().substring(1, 2);
      return (firstNum + "." + secondNum + "Mil");
    }
    // Between 10 mil and 100 mil
    else if (items > TEN_MILLION && items < HUNDRED_MILLION)
    {
      firstNum = items.toString().substring(0, 2);
      secondNum = items.toString().substring(2,3);
      return (firstNum + "." + secondNum + "Mil");
    }
    // Between 100 mil and 1 billion
    else if (items > HUNDRED_MILLION && items < BILLION)
    {
      firstNum = items.toString().substring(0, 3);
      secondNum = items.toString().substring(3, 4);
      return (firstNum + "." + secondNum + "Mil");
    }
    // Between 1 Billion and 100 Billlion
    else if (items > BILLION && items < 10000000000)
    {
      firstNum = items.toString().substring(0, 1);
      secondNum = items.toString().substring(2, 3);
      return (firstNum + "." + secondNum + "Mil");
    }
    // Between 100k and 1 million
    else if (items > HUNDRED_THOUSAND && items < MILLION)
    {
      firstNum = items.toString().substring(0, 3);
      secondNum = items.toString().substring(3, 4);
      return (firstNum + "." + secondNum + "K");
    }
    // Between 10k and 100k
    else if (items > 10000 && items < 100000)
    {
      firstNum = items.toString().substring(0, 2);
      secondNum = items.toString().substring(2, 3);
      return (firstNum + "." + secondNum + "K");
    }
    else
    {
      return (items);
    }

    
  }

  
}

export default SearchResult

