//rfce always to finish with snippet 

import React from 'react'

const MovieCard = ({movie : 
    {title, vote_average, poster_path,release_date,original_language} 
}) => {
  return (

    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `/no-movie.png`}
        alt={title}/>
            <div className="mt4">
              <h3 className='pt-4'>{title}</h3>
            </div>
            <div className="content">
              <div className="rating">
                <img src="/public/figma build/star.svg" alt="star icon" />
                <p className='pl-2'>{vote_average ? vote_average.toFixed(1): 'N/A'}</p>
                <span>•</span>
                <div className='lang'>{original_language} </div>
                <span>•</span>
                <div className='year'>
                  {release_date ? release_date.split('-')[0]: 'N/A'}
                </div>
              </div>
            </div>
    </div>
  )
}

export default MovieCard