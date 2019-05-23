import React, {Component} from 'react';
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements';
import moment from 'moment';
import numeral from 'numeral';
import styles from './Sheet.js';
import { IconEyeLine } from '@instructure/ui-icons';
import { IconLikeLine } from '@instructure/ui-icons';
import { Pagination } from '@instructure/ui-pagination';
import EmbedButton from './EmbedButton';

class SearchResult extends Component {
  state = {}
  styles = new styles();

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  render() {
    this.content && this.setState({ width: this.measureElement(this.content).width });
    let column = this.state.width < 500;
    let min = (this.props.page) * this.props.resultsPerPage;
    let max = (this.props.resultsPerPage*(this.props.page+1))-1;
    max = max >= this.props.length ? this.props.length-1 : max;
    
    return (
      this.props.result.map((result, index) => {
        return index >= min && index <= max ? 
          <div 
            style = {this.styles.resultCard}
            key = {result.etag}
          >
            <Flex justifyItems = "space-between" margin = "large none large none" direction='column'>
              <FlexItem padding = "medium" align="center">
                <Img src = {result.snippet.thumbnails.medium.url} alt = "Image not found." style = {{
                  borderRadius: '10px',
                }}/>
              </FlexItem>
              <FlexItem padding="none medium none medium">
                <Heading level="h4">{result.snippet.title.replace(/&#39;/g,"'").replace(/&quot;/g, '"')}</Heading>
                <p>{moment(result.snippet.publishedAt, moment.ISO_8601).format('MMMM DD, YYYY')}</p>
                <p>
                  {numeral(result.statistics.viewCount).format('0.0a')} <IconEyeLine color = "primary"/> {'- '}
                  {numeral(result.statistics.likeCount).format('0.0a')} <IconLikeLine color = "primary"/> {'- '}
                  {numeral(result.statistics.dislikeCount).format('0.0a')} <IconLikeLine rotate = "180" color = "primary"/> 
                </p>  
                <p style = {styles.overflowPrevention}>
                  {result.snippet.description.length > 213
                  ? result.snippet.description.substring(0, 211)+"..."
                  : result.snippet.description}
                </p>
              </FlexItem>
              <FlexItem padding="none none medium none" align="center">
                <EmbedButton onEmbed={this.props.onEmbed} videoId={result.id} title={result.snippet.title}/>
              </FlexItem>
            </Flex>
          </div> : ''
      })
    )
  }
}

export default SearchResult