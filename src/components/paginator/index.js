import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageButton from './pageButton';
// import './style.css';

function getPages(current) {
  const pages = [];
  if(current > 0) {
    for(let i = 0; i < 5 ; i++) {
      pages.push(current+i);
    }
  }
  return pages;
}

class Paginator extends Component {

  static propTypes = {
    current: PropTypes.number.isRequired,
    onChangePage: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      pages: getPages(props.current),
    };

    this.previous = this.previous.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.pages.indexOf(nextProps.current) === -1) {
      this.setState({ pages: getPages(nextProps.current)});
    }
  }

  previous() {
    const minPage = this.state.pages[0];
    if(minPage > 1) {
      this.setState({
        pages: getPages(minPage-5),
      });
      this.props.onPrevious(minPage);
    }
  }

  render() {
    return (
      <nav className="text-center Paginator" aria-label="Page navigation">
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
                          current={this.props.current}
                          clickHandler={this.props.onChangePage}/>)
          }
          <li>
            <a role="button" aria-label="Next"
               onClick={() => this.props.onNext(this.state.pages[4])}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Paginator;