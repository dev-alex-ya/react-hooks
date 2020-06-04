import React from 'react';
import {Link} from 'react-router-dom';

export const Card = () => (
  <div className="card">
    <img src={''} className="card-img-top" alt={''} />
    <div className="card-body">
      <h5>ReactJS</h5>
      <Link to={'/profile/'} className="btn btn-primary">Открыть</Link>
    </div>
  </div>
)
