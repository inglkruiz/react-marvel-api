import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ButtonToolbar, Button } from 'react-bootstrap';
import './style.css';

class Filters extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  changeFilterByName = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  reset = () => {
    if (this.state.name.trim()) {
      this.setState({ name: '' });
      this.props.onReset();
    }
  }

  submit = (event) => {
    event.preventDefault();
    if (this.state.name.trim()) {
      this.props.onApply();
    }
  }

  render() {
    return (
      <Panel collapsible className="Filters" bsStyle="primary" header="Filters">
        <form onSubmit={this.submit}>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="filterByName">Name</label>
                <input id="filterByName"
                  type="text"
                  value={this.state.name}
                  className="form-control"
                  onChange={this.changeFilterByName} />
                <small className="help-block">
                  Only characters matching the specified full character name (e.g. Spider-Man).
                </small>
              </div>
            </div>
          </div>
          <ButtonToolbar>
            <Button type="reset" onClick={this.reset}>RESET</Button>
            <Button type="submit" bsStyle="primary">APPLY</Button>
          </ButtonToolbar>
        </form>
      </Panel>
    );
  }
}

Filters.propTypes = {
  onApply: PropTypes.func,
  onReset: PropTypes.func,
};

Filters.defaultProps = {
  onApply: () => { },
  onReset: () => { },
};


export default Filters;
