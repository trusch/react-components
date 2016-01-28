import React from 'react';

import List from 'utility/List';
import Search from 'react-search';
import SearchItemInArray from 'react-search/lib/SearchItemInArray';
import SearchItemInArrayObjects from 'react-search/lib/SearchItemInArrayObjects';

import style from './index.styl';

export default class SearchableList extends Search {
    constructor(props) {
      super(props);
      this.items = this.props.items.map((item, idx) => {
        const r = item;
        r._originalIndex = idx;
        return r;
      });
      this.changeInput = this.changeInput.bind(this);
      this.itemRenderer = this.itemRenderer.bind(this);
      this.state = {
        displayItems: this.items,
      };
    }

    changeInput(e) {
      const searchValue = this.refs.searchInput.value;
      if (searchValue === '') {
        this.setState({ displayItems: this.items });
        return;
      }

      let result;

      if ((this.props.keys !== undefined && this.props.searchKey !== undefined)) {
          /* hash */
        result = SearchItemInArrayObjects(this.items, searchValue, this.props.searchKey);
      } else {
          /* array */
        result = SearchItemInArray(this.items, searchValue);
      }

      this.setState({ displayItems: result });

      if (this.props.onChange !== undefined) {
        this.props.onChange(e, result);
      }
    }

    itemRenderer(idx) {
      return this.props.itemRenderer(this.state.displayItems[idx]._originalIndex);
    }

    render() {
      return (
          <searchablelist>
            <input type="text"
              placeholder={this.props.placeholder}
              ref="searchInput"
              onKeyUp={this.changeInput} />
            <List itemRenderer={this.itemRenderer}
              length={this.state.displayItems.length} />
          </searchablelist>
      );
    }
}
