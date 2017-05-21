import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ButtonToolbar, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import './style.css';

class Filters extends Component {
  state = {
    name: '',
    exactMatch: false,
  };

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

  changeExactMatchFlag = (event) => {
    this.setState({ exactMatch: event.target.checked })
  }

  render() {
    return (
      <Panel collapsible className="Filters" bsStyle="primary" header="Filters">
        <form onSubmit={this.submit}>
          <div className="row">
            <div className="col-md-4">
              <FormGroup controlId="filterByName">
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text"
                             value={this.state.name}
                             onChange={this.changeFilterByName}/>
                {!this.state.exactMatch && <HelpBlock>Matching with names that begin with the specified string (e.g. Sp).</HelpBlock>}
              </FormGroup>
              <Checkbox checked={this.state.exactMatch}
                        onChange={this.changeExactMatchFlag}>
                Match the specified full name (e.g. Spider-Man).
              </Checkbox>
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
