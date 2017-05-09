import React, { Component } from 'react';
import './App.css';
import Character from './components/character';
import Paginator from './components/paginator';
import Header from './components/header';

const getMarvelCharactersCall = (offset) =>
  fetch(`https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&offset=${offset}`)
    .then(res => res.json())
    .then((resObj) => {
      if (resObj.code === 200) {
        return resObj.data.results;
      } else {
        return [];
      }
    });

class App extends Component {
  state = {
    characters: [],
    page: 0,
  };

  componentWillMount() {
    getMarvelCharactersCall(0).then((characters) => {
      this.setState({ characters, page: 1 });
    });
  }

  changePage = (page) => {
    if(page !== this.state.page) {
      const offset = (page-1)*20;
      getMarvelCharactersCall(offset).then((characters) => {
        this.setState({ characters, page });
      });
    }
  }

  nextPages = (maxPage) => {
    this.changePage(maxPage+1);
  }

  previousPages = (minPage) => {
    if(minPage > 1) {
      this.changePage(minPage-1)
    }
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
        <div className="App-body">
          {
            this.state.characters
              // .filter(c => /^(.(?!image_not_available$))+$/.test(c.thumbnail.path))
              .map(c => <Character key={c.id} instance={c} />)
          }
          <Paginator current={this.state.page}
                     onChangePage={this.changePage}
                     onNext={this.nextPages}
                     onPrevious={this.previousPages} />
        </div>
      </div>
    );
  }
}

export default App;
