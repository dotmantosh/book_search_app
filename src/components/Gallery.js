import React from 'react'


const Gallery = ({ items, error }) => {


  if (error) {
    return (
      <div className='jumbotron'>
        <h1>{error}</h1>
      </div>
    )

  }
  else if (!error && items) {
    return (
      <div>
        {
          items.map((item, index) => {
            let { title, imageLinks, infoLink } = item.volumeInfo;

            return (
              <a key={index} className='book' href={infoLink} target='_blank'>
                <img src={imageLinks !== undefined ? imageLinks.thumbnail : ''} alt='Book_image' className='book__img' />
                <div className='book__text'>
                  {title}
                </div>

              </a>
            )
          })
        }
      </div>
    )
  }

}

export default Gallery;