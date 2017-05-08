import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Character = (props) => {
  const { instance } = props,
    image = `${instance.thumbnail.path}.${instance.thumbnail.extension}`,
    description = !instance.description.length ? 'Description not available.' :
      instance.description.length > 150 ?
        instance.description.substring(0, 150).split('').concat('...').join('') :
        instance.description;
  return (
    <div className="Character">
      <div className="text-center Character-name"><span className="h3">{instance.name}</span></div>
      <div className="Character-image" style={{backgroundImage: `url('${image}')`}} />
      <p className="Character-description">
        {`${description} `}
      </p>
      <a role="button" className="btn btn-primary btn-lg Character-link">Read more</a>
    </div>
  );
};

Character.propTypes = {
  instance: PropTypes.object.isRequired,
};

export default Character;