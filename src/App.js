import React, { Component } from 'react';
import { getMarvelCharacters } from './lib/apiCalls';
import './App.css';
import Header from './components/header';
import Character from './components/character';
import Paginator from './components/paginator';
import Filters from './components/filters';
import { FormGroup, ControlLabel, FormControl, Form } from 'react-bootstrap';

class App extends Component {
  state = {
    filters: {
      name: {
        value: '',
        exactMatch: false,
      }
    },
    sortName: '',
    characters: [],
    page: 0,
    maxPage: 0,
  };

  componentWillMount() {
    this.search({ sortName: this.state.sortName });
  }

  changePage = (page) => {
    if (page !== this.state.page) {
      this.search({
        page,
      });
    }
  }

  nextPages = (maxPage) => {
    this.changePage(maxPage + 1);
  }

  previousPages = (minPage) => {
    if (minPage > 1) {
      this.changePage(minPage - 1)
    }
  }

  applyFilters = () => {
    this.search({
      name: this.refs.filters.state.name.trim(),
      exactMatch: this.refs.filters.state.exactMatch,
    }).then(this.afterFilter);
  }

  search = (options = {}) => {
    const {
      page,
      name,
      exactMatch,
      sortName
    } = Object.assign({
      page: 1,
      name: this.state.filters.name.value,
      exactMatch: this.state.filters.name.exactMatch,
      sortName: this.state.sortName,
    }, options);
    const offset = page ? (page - 1) * 20 : 0;
    return getMarvelCharacters(offset, name, exactMatch, sortName)
      .then(({ characters, maxPage }) => {
        this.setState({
          characters,
          maxPage,
          page: characters.length ? page : 0,
          filters: { name: { value: name, exactMatch } },
          sortName,
        });
        return { characters, maxPage, page };
      });
  }

  resetFilters = () => this.search({ name: '', exactMatch: false }).then(this.afterFilter)

  afterFilter = ({ page, maxPage }) => this.refs.paginator.setPages(page, maxPage)

  sortByName = (event) => {
    this.search({ page: this.state.page, sortName: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <nav className="navbar App-navbar">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#"><span className="h4">Characters</span></a></li>
            {/*<li><a href="#"><span className="h4">Comics</span></a></li>*/}
          </ul>
        </nav>
        <Filters ref="filters" onApply={this.applyFilters} onReset={this.resetFilters} />


        <div className="Sort">
          <Form inline className="text-right">
            <FormGroup controlId="sortByName">
              <ControlLabel>Sorting by Name</ControlLabel>{' '}
              <FormControl componentClass="select" value={this.state.sortName} onChange={this.sortByName}>
                <option value="">Asc.</option>
                <option value="-">Desc</option>
              </FormControl>
            </FormGroup>
          </Form>
        </div>
        <div className="App-characters">
          {
            this.state.characters
            // .filter(c => /^(.(?!image_not_available$))+$/.test(c.thumbnail.path))
              .map(c => <Character key={c.id} instance={c} />)
          }
        </div>
        <Paginator ref="paginator"
                   page={this.state.page}
                   maxPage={this.state.maxPage}
                   onChangePage={this.changePage}
                   onNext={this.nextPages}
                   onPrevious={this.previousPages} />
      </div>
    );
    //TODO: Define an error messages container.
  }
}

export default App;
