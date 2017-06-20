import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Comic = ({ instance }) => {
  const description = !instance.variantDescription.length ? 'Description not available' :
    instance.variantDescription.length > 150 ?
      instance.variantDescription.substring(0, 150).split('').concat('...').join('') :
      instance.variantDescription,
    creators = instance.creators.items.length ? instance.creators.items.map(c => c.name ).join(', ') :
      'Not registered';
  return (
    <div className="Comic">
      <img className="Comic-image" alt={instance.title} src={`${instance.thumbnail.path}.${instance.thumbnail.extension}`}/>
      <div className="Comic-body">
        <h4>{instance.title}</h4>
        <p>{description}.</p>
        <p><b>Format:</b> {instance.format}.</p>
        <p><b>Series:</b> {instance.series.name}.</p>
        <p><b>Creators:</b> {creators}.</p>
      </div>
    </div>
  );
};

Comic.propTypes = {
  instance: PropTypes.object.isRequired,
};

export default Comic;