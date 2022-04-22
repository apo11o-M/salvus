import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './Card'
class MainColumn extends React.Component {

  render() {
    return (
      <div className="main-column" id="scrollableDiv">
        <InfiniteScroll
          dataLength={this.props.posts.length}
          next={this.props.fetchPosts}
          hasMore={true}
          scrollThreshold={0.9}
          endMessage={<h4>You have reached the end.</h4>}
          // loader={<h4>Loading...</h4>}
        >
          {this.props.posts.map((i, index) => (
            <Card 
              key={index} 
              post={i}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default MainColumn;