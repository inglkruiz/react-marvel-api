import React, {Component} from 'react';
import './App.css';
import Header from './components/header';
import {Panel, ButtonToolbar, Button} from 'react-bootstrap';
import Character from './components/character';
import Paginator from './components/paginator';

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
    filters: {
      name: ''
    },
    characters: [],
    page: 0,
    maxPage: 0,
  };

  componentWillMount() {
    getMarvelCharactersCall(0).then(({characters, maxPage}) => {
      this.setState({characters, page: 1, maxPage});
    });
  }

  changePage = (page) => {
    if (page !== this.state.page) {
      const offset = (page - 1) * 20;
      getMarvelCharactersCall(offset, this.state.filters.name).then(({characters, maxPage}) => {
        this.setState({characters, page, maxPage});
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

  changeFilterByName = (event) => {
    this.setState({
      filters: {
        name: event.target.value.trim()
      }
    });
  }

  applyFilters = () => {
    const {page} = this.state,
      offset = (page - 1) * 20;
    getMarvelCharactersCall(offset, this.state.filters.name).then(({characters, maxPage}) => {
      this.setState({characters, maxPage});
      this.refs.paginator.setPages(page, maxPage);
    });
  }

  submitFilters = (event) => {
    event.preventDefault();
    this.applyFilters();
  }

  resetFilters = () => {
    const {page} = this.state,
      offset = (page - 1) * 20;
    getMarvelCharactersCall(offset).then(({characters, maxPage}) => {
      this.setState({characters, maxPage, filters: {name: ''}});
      this.refs.paginator.setPages(page, maxPage);
    });
  }

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
        <Panel collapsible className="Filters" bsStyle="primary" header="Filters">
          <form onSubmit={this.submitFilters}>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="filterByName">Name</label>
                  <input id="filterByName"
                         type="text"
                         value={this.state.filters.name}
                         className="form-control"
                         onChange={this.changeFilterByName}/>
                  <small className="help-block">
                    Only characters matching the specified full character name (e.g. Spider-Man).
                  </small>
                </div>
              </div>
            </div>
            <ButtonToolbar>
              <Button onClick={this.resetFilters}>RESET</Button>
              <Button bsStyle="primary" onClick={this.applyFilters}>APPLY</Button>
            </ButtonToolbar>
          </form>
        </Panel>
        <div className="App-characters">
          {
            this.state.characters
            // .filter(c => /^(.(?!image_not_available$))+$/.test(c.thumbnail.path))
              .map(c => <Character key={c.id} instance={c}/>)
          }
        </div>
        <Paginator ref="paginator"
                   page={this.state.page}
                   maxPage={this.state.maxPage}
                   onChangePage={this.changePage}
                   onNext={this.nextPages}
                   onPrevious={this.previousPages}/>
      </div>
    );
  }
}

export default App;
