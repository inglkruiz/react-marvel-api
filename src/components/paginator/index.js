import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageButton from './pageButton';
import './style.css';

const onlyNumbers = (event) => {
  const key = event.charCode || event.keyCode || 0;
  if (!(
    key === 8 ||
    key === 9 ||
    key === 13 ||
    key === 46 ||
    (key >= 35 && key <= 40) ||
    (key >= 48 && key <= 57) ||
    (key >= 96 && key <= 105)
  )) {
    event.preventDefault();
  }
};

class Paginator extends Component {
  state = {
    pages: [],
  };

  componentWillMount() {
    this.setPages(this.props.page, this.props.maxPage);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.pages.indexOf(nextProps.page) === -1) {
      this.setPages(nextProps.page, nextProps.maxPage);
    }
  }

  setPages = (page, maxPage) => {
    const pages = [];
    if (page > 0) {
      for (let i = 0; i < 5; i++) {
        const p = page + i;
        if (p <= maxPage) {
          pages.push(p);
        }
      }
    }
    this.setState({ pages });
  }

  previous = () => {
    const minPage = this.state.pages[0];
    if (minPage > 1) {
      this.setPages(minPage - 5, this.props.maxPage);
      this.props.onPrevious(minPage);
    }
  }

  handleChange = (event) => {
    if (event.key === 'Enter') {
      const page = +event.target.value;
      try {
        if (isNaN(page) || page === 0 || page > this.props.maxPage) {
          throw new Error('Invalid number page.');
        }
        else {
          this.props.onChangePage(page);
          this.input.value = '';
        }
      } catch (e) {
        console.error(e);
        this.input.value = '';
      }
    }
  }

  render() {
    return (
      <div className="Paginator">
        <div className="form-group-lg text-center center-block Paginator-go2Page">
          <label htmlFor="go2Page">Go to Page</label>
          <input id="go2Page"
            ref={input => this.input = input}
            type="text"
            maxLength={2}
            className="form-control text-center"
            onKeyDown={onlyNumbers}
            onKeyUp={this.handleChange} />
          <small className="help-block">
            Page {this.props.page} out of {this.props.maxPage}.
          </small>
        </div>
        <nav className="text-center" aria-label="Page navigation">
          <ul className="pagination pagination-lg">
            <li>
              <a role="button" aria-label="Previous"
                onClick={this.previous}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {
              this.state.pages.map((i) =>
                <PageButton key={`page-${i}`}
                  page={i}
                  current={this.props.page}
                  clickHandler={this.props.onChangePage} />)
            }
            <li>
              <a role="button" aria-label="Next"
                onClick={() => this.props.onNext(this.state.pages[4])}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
};

export default Paginator;