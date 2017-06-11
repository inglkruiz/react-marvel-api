import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Form } from 'react-bootstrap';
import './style.css';

class SortByName extends Component {
  state = {
    sort: '',
    perPage: 20,
  };

  changeSort = (event) => {
    this.setState({ sort: event.target.value });
    this.props.onChangeSort(event);
  }

  changePerPage = (event) => {
    this.setState({ perPage: event.target.value });
    this.props.onChangeLimit(event);
  }

  render() {
    return (
      <div className="SortByName">
        <Form inline className="SortByName-form">
          <FormGroup controlId="sortByName">
            <ControlLabel>Sorting by Name</ControlLabel>{' '}
            <FormControl componentClass="select" value={this.state.sort} onChange={this.changeSort}>
              <option value="">Asc.</option>
              <option value="-">Desc</option>
            </FormControl>
          </FormGroup>
          <span className="hidden-xs"> - </span>
          <FormGroup controlId="resultsPerPage">
            <ControlLabel>Results per page</ControlLabel>{' '}
            <FormControl componentClass="select" value={this.state.perPage} onChange={this.changePerPage}>
              <option value={20}>20</option>
              <option value={40}>40</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </FormControl>{' '}
          </FormGroup>
        </Form>
      </div>
    );
  }
}

SortByName.PropTypes = {
  onChangeSort: PropTypes.func,
  onChangeLimit: PropTypes.func,
};

SortByName.defaultProps = {
  onChangeSort: () => console.warn('Component onChangeSort not defined.'),
  onChangeLimit: () => console.warn('Component onChangeLimit not defined.'),
};

export default SortByName;
