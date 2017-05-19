import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Character from './components/character';
import Paginator from './components/paginator';
import Filters from './components/filters';

const getMarvelCharactersCall = (offset, name = '') => {
  let url = `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&offset=${offset}`;
  if (name) url += `&name=${name}`;
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else {
            const pages = Math.floor(resObj.data.total / 20);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % 20 > 0 ? pages + 1 : pages,
            };
          }
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        console.error(e);
        return {
          characters: [],
          maxPage: 0,
        };
      }
    });
}

class App extends Component {
  state = {
    characters: [],
    page: 0,
    maxPage: 0,
  };

  componentWillMount() {
    this.search();
  }

  changePage = (page) => {
    if (page !== this.state.page) {
      this.search(page);
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
    this.search(1, this.refs.filters.state.name)
      .then(this.afterFilter);
  }

  search = (page = 1, name = '') => {
    const offset = page ? (page - 1) * 20 : 0;
    return getMarvelCharactersCall(offset, name.trim())
      .then(({ characters, maxPage }) => {
        this.setState({ characters, maxPage, page })
        return { characters, maxPage, page };
      });
  }

  resetFilters = () => this.search().then(this.afterFilter)

  afterFilter = ({ page, maxPage }) => this.refs.paginator.setPages(page, maxPage)

  render() {
    //TODO: Define an error messages container.
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
  }
}

export default App;
