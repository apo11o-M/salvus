import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './Card'
class MainColumn extends React.Component {

  render() {
    console.log("Main Column: ")
    console.log(this.props.posts.length)
    console.log(this.props.posts);
    return (
      <div className="main-column" id="scrollableDiv">
        {/* <div>Wow, such empty..</div> */}
        <InfiniteScroll
          dataLength={this.props.posts.length}
          next={this.props.fetchPosts}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          // scrollableTarget="scrollableDiv"
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