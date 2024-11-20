import React from 'react';
import '../UserDashboard.css'

const CityNews = ({ cityNews }) => {
  return (
    <div className="card-dashboard">
      <h2>City News</h2>
      
      <div className="scroll-container">
      <ul>
        {cityNews?.length > 0 ? (
          cityNews.map((article, index) => (
            <li className='li-tourist news-links' key={index} >
              <a href={article.url} target="_blank" rel="noopener noreferrer" className='news-links'>{article.title}</a>
            </li>
          ))
        ) : (
          <li>No news available</li>
        )}
      </ul>
      </div>
    </div>
  );
};

export default CityNews;
