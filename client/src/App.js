import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from 'react-cropper';

/* global FileReader */

// const src = require('../src/img/shopping.JPG');

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: [],
      dimensions: {},
      message: '',
      crop: false
      
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    // this.useDefaultImage = this.useDefaultImage.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    
    }

    const reader = new FileReader();
    reader.onload = () => {

      this.setState({ src: reader.result });
      
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }  else if(!this.state.crop){
      return;
    }

    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  // useDefaultImage() {
  //   this.setState({ src });
  // }

  onImgLoad({target:img}) {
    console.log( img.offsetHeight)
    if(img.offsetHeight === 1024 && img.offsetWidth === 1024){
    this.setState({dimensions:{height:img.offsetHeight,
                               width:img.offsetWidth}, crop: true, message: ''});
    } else {

      this.setState({message: 'Image is not of recommended size of 1024px*1024px', src: null, })
    }
}
 

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', margin: '20px'}}>
        <div style={{ width: '100%' }}>
          <input type="file" onChange={this.onChange} />
          {/* <button onClick={this.useDefaultImage}>Use default img</button> */}
          <h4>{this.state.message}</h4>
          dimensions width{this.state.dimensions.width}, height{this.state.dimensions.height}
          <img onLoad={this.onImgLoad} src={this.state.src}/>
          <br />
          <br />
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>
        <div>
          {/* <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>Preview</h1>
            <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
          </div> */}
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              {/* <span>Result</span> */}
              <button onClick={this.cropImage} style={{ float: 'center' }}>
                Crop Image
              </button>
            </h1>
            {/* {this.state.cropResult.map(img => ( */}
              <img style={{ width: '50%' }} src={this.state.cropResult} alt="cropped image" />
            {/* ))} */}
            
            <button onClick={this.nextDimenstion} style={{ float: 'center' }}>Next</button>
          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}