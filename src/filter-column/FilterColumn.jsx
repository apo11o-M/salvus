import React from 'react';
import FilterType from './filters/FilterType';
import FilterMedia from './filters/FilterMedia';
import FilterNSFW from './filters/FilterNSFW'
import FilterSubs from './filters/FilterSubs'
import Button from 'react-bootstrap/Button'
import "./FilterColumn.css"

class FilterColumn extends React.Component {

  render() {
    // console.log(this.props)
    return (
      <div className="filter-column">
        <h2>Filters</h2> 
        {/* <Button variant="primary" onClick={this.props.initialFetch}>Initial Fetch</Button> */}
        {/* <Button variant="primary" onClick={this.props.fetchPosts}>Fetch Posts</Button> */}
        <Button variant="primary" onClick={this.props.filterPosts}>Apply Filter</Button>
        <br />
        <FilterType handleClick={this.props.handleClickFilters} />
        <FilterMedia handleClick={this.props.handleClickFilters} />
        <FilterNSFW handleClick={this.props.handleClickFilters} />
        <br />
        <div className="sub-filters">
          <FilterSubs subList={Array.from(this.props.subMap.keys())} handleClick={this.props.handleClickSubs}/>
        </div>
      </div>
    );
  }
}

export default FilterColumn;