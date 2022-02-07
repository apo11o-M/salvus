import React from 'react';
import snoowrap from 'snoowrap';
import config from '../credential'
import FilterType from './filters/FilterType';
import FilterMedia from './filters/FilterMedia';
import FilterNSFW from './filters/FilterNSFW'
import FilterSubs from './filters/FilterSubs'
import Button from 'react-bootstrap/Button'

class FilterColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currRenderPosts: [],
      selectedSubs: [],
      selectedFilters: []
    }
    this.savedPosts = [];
    this.subredditMap = new Map();
    this.handleClickFilters = this.handleClickFilters.bind(this);
    this.handleClickSubs = this.handleClickSubs.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
  }
  
  fetchSavedPost = async () => {
    console.log("Fetching saved post..");
    config.requester.getMe().getSavedContent()
    .then((data) => {
      // this.setState({ 
      //   currRenderPosts: data
      // });
      this.savedPosts = data;
      this.createFilters();
      this.forceUpdate();
      // console.log( Array.from( this.subredditMap.keys() ));
    }).catch((err) => {
      console.log(err);
    })
  }

  createFilters() {
    console.log(this.subredditMap);
    console.log("Finding all subreddits appeared in the saved posts..");
    for (let post of this.savedPosts) {
      const subName = post.subreddit_name_prefixed;
      if (this.subredditMap.get(subName) === undefined) {
        this.subredditMap.set(subName, [post]);
      } else {
        const tempArr = this.subredditMap.get(subName);
        tempArr.push(post);
        this.subredditMap.set(subName, tempArr); 
      }
    }
    this.subredditMap = new Map([...this.subredditMap.entries()].sort((a, b) => {
      return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    }));
    console.log(this.subredditMap);
  }

  filterPosts() {
    console.log(this.state.selectedFilters);
    console.log(this.state.selectedSubs);
    // let curr = [...this.savedPosts];
    console.log(this.savedPosts);

    this.savedPosts.fetchMore({amount: 10})
    .then((extendedListing => {
      console.log(extendedListing);
      this.savedPosts = extendedListing;
    })).catch((err) => {
      console.log(err);
    })


    // this.setState({
    //   currRenderPosts: [...this.savedPosts]
    // })
    // console.log(this.state.currRenderPosts);
    // console.log(curr);
    console.log(this.savedPosts);

  }
  handleClickFilters = (event) => {
    console.log("clicked the " + event.target.value);
    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({ selectedFilters: [...this.state.selectedFilters, event.target.value] });
    } else {
      const index = this.state.selectedFilters.indexOf(event.target.value);
      this.state.selectedFilters.splice(index, 1);
      this.setState({ selectedFilters: this.state.selectedFilters })
    }
  }
  handleClickSubs = (event) => {
    console.log("clicked the " + event.target.value);
    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({ selectedSubs: [...this.state.selectedSubs, event.target.value] });
    } else {
      const index = this.state.selectedSubs.indexOf(event.target.value);
      this.state.selectedSubs.splice(index, 1);
      this.setState({ selectedSubs: this.state.selectedSubs });
    }
  }
  render() {
    return (
      <div className="filter-column">
        <h2>Filters</h2> 
        <Button variant="primary" onClick={this.fetchSavedPost}>Fetch Saved Post</Button>
        <Button variant="primary" onClick={this.filterPosts}>Submit</Button>
        <br />
        <FilterType handleClick={this.handleClickFilters} />
        <FilterMedia handleClick={this.handleClickFilters} />
        <FilterNSFW handleClick={this.handleClickFilters} />
        <br />
        <FilterSubs subs={Array.from( this.subredditMap.keys() )} handleClick={this.handleClickSubs}/>
      </div>
    );
  }
}

export default FilterColumn;