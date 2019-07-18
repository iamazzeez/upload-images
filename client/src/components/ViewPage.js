import React, { Component } from 'react'

export default class ViewPage extends Component {
    state = {
        images: []
        }
    
        componentDidMount(){
      this.getAll()
        
        }
    
    
        getAll = () => {
            fetch('http://localhost:8080/images', {
                method: 'GET',
                body: null,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
              .then(
                (response) => {
                  if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                      response.status);
                    return;
                  }
              
                  // Examine the text in the response
                  response.json().then((data) => {
                    if (data.error) {
                      return this.setState({ error: data.message });
                    }
                  
        
                      return this.setState({ images: data })
                  
                
                  })
                }
                )
        }
    render() {
        console.log(this.state.images)
        return (
            <div className="container">
                <h2>Horizontal Images</h2>
                {this.state.images.map(image => (
                    <div className='m-2'>
                   <img src={image.horizontal} alt="cropped image" />
                   </div>
                ))}
               <h2>Vertical Images</h2>
               {this.state.images.map(image => (
                    <div className='m-2'>
                   <img  src={image.vertical} alt="cropped image" />
                
                   </div>
                ))}
               <h2>Horizontal Small Images</h2>
               {this.state.images.map(image => (
                    <div className='m-2'>
                   <img  src={image.hsmall} alt="cropped image" />
        
                   </div>
                ))}
               <h2>Gallery Images</h2>
               {this.state.images.map(image => (
                    <div className='m-2'>
                   <img  src={image.gallery} alt="cropped image" />
                   <br />
                   </div>
                ))}
            </div>
        )
    }
}
