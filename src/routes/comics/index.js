import React, { Component } from 'react';
import Promise from 'promise';
import './style.css';
import Comic from '../../components/comic';
import { getMarvelComics } from '../../lib/apiCalls';

class Comics extends Component {
  state = {
    loading: false,
    comics: [],
  };

  componentWillMount() {
    this.search();
  }

  search = () => {
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      getMarvelComics()
        .then(({ comics }) => {
          this.setState({
            comics,
          });
          resolve()
        })
        .catch(error => reject(error));
    }).done(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div className="Comics">
        {!this.state.loading &&
        <div className="Comics-list">{
          this.state.comics
          // .filter(c => /^(.(?!image_not_available$))+$/.test(c.thumbnail.path))
            .map(c => <Comic key={c.id} instance={c}/>)
        }</div>}
      </div>
    );
  }
}

export default Comics;