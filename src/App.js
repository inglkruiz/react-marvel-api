import React, { Component } from 'react';
import Promise from 'promise';
import { getMarvelCharacters } from './lib/apiCalls';
import './App.css';
import Header from './components/header';
import Character from './components/character';
import Paginator from './components/paginator';
import Filters from './components/filters';
import SortByName from './components/sortByName';
import Loading from './components/loading';

class App extends Component {
  state = {
    loading: false,
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
    limitPerPage: 20,
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
      name: this.filters.state.name.trim(),
      exactMatch: this.filters.state.exactMatch,
    }).then(this.afterFilter);
  }

  search = (options = {}) => {
    this.setState({ loading: true });
    const {
      page,
      name,
      exactMatch,
      sortName,
      limit,
    } = Object.assign({
      page: 1,
      name: this.state.filters.name.value,
      exactMatch: this.state.filters.name.exactMatch,
      sortName: this.state.sortName,
      limit: this.state.limitPerPage,
    }, options);
    const offset = page ? (page - 1) * limit : 0;

    const p = new Promise((resolve, reject) => {
      getMarvelCharacters({ offset, name, exactMatch, sortName, limit })
        .then(({ characters, maxPage }) => {
          this.setState({
            characters,
            maxPage,
            page: characters.length ? page : 0,
            filters: { name: { value: name, exactMatch } },
            sortName,
            limitPerPage: limit,
          });
          resolve({ characters, maxPage, page });
        })
        .catch((error) => reject(error));
    });
    p.done(() => this.setState({ loading: false }));

    return p;
  }

  resetFilters = () => this.search({ name: '', exactMatch: false }).then(this.afterFilter)

  afterFilter = ({ page, maxPage }) => this.paginator.setPages(page, maxPage)

  sortByName = (event) => this.search({ page: this.state.page, sortName: event.target.value })

  changeLimitPerPage = (event) => this.search({ page: this.state.page, limit: event.target.value })

  render() {
    return (
      <div className="App">
        <Header />
        <nav className="navbar App-navbar">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/"><span className="h4">Characters</span></a></li>
            {/*<li><a href="#"><span className="h4">Comics</span></a></li>*/}
          </ul>
        </nav>
        <Filters ref={filters => this.filters = filters} onApply={this.applyFilters} onReset={this.resetFilters} />
        <SortByName onChangeSort={this.sortByName} onChangeLimit={this.changeLimitPerPage} />
        {!this.state.loading &&
          <div className="App-characters">{
            this.state.characters
            // .filter(c => /^(.(?!image_not_available$))+$/.test(c.thumbnail.path))
              .map(c => <Character key={c.id} instance={c}/>)
        }</div>}
        {this.state.loading && <Loading />}
        <Paginator ref={paginator => this.paginator = paginator}
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
