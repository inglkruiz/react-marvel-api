import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Form } from 'react-bootstrap';
import './style.css';

class SortByName extends Component {
  state = {
    option: ''
  };

  change = (event) => {
    this.setState({ option: event.target.value });
    this.props.onChangeOption(event);
  }

  render() {
    return (
      <div className="SortByName">
        <Form inline className="text-right">
          <FormGroup controlId="sortByName">
            <ControlLabel>Sorting by Name</ControlLabel>{' '}
            <FormControl componentClass="select" value={this.state.option} onChange={this.change}>
              <option value="">Asc.</option>
              <option value="-">Desc</option>
            </FormControl>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

SortByName.PropTypes = {
  onChangeOption: PropTypes.func,
};

export default SortByName;
