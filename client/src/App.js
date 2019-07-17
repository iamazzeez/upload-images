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
      cropResult1:{},
      cropResult2: {},
      cropResult3: {},
      cropResult4: {},
      dimensions: {},
      message: '',
      crop: false
      
    };
    this.cropImageHorizontal = this.cropImageHorizontal.bind(this);
    this.cropImageVertical = this.cropImageVertical.bind(this);
    this.cropImageHSmall = this.cropImageHSmall.bind(this);
    this.cropImageGallery = this.cropImageGallery.bind(this);
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

  cropImageHorizontal() {
    if (typeof this.cropper1.getCroppedCanvas() === 'undefined') {
      return;
    }  else if(!this.state.crop){
      return;
    }

    this.setState({
      cropResult1: this.cropper1.getCroppedCanvas().toDataURL(),
    });
  }

  cropImageVertical() {
    if (typeof this.cropper2.getCroppedCanvas() === 'undefined') {
      return;
    }  else if(!this.state.crop){
      return;
    }

    this.setState({
      cropResult2: this.cropper2.getCroppedCanvas().toDataURL(),
    });
  }
  cropImageHSmall() {
    if (typeof this.cropper3.getCroppedCanvas() === 'undefined') {
      return;
    }  else if(!this.state.crop){
      return;
    }

    this.setState({
      cropResult3: this.cropper3.getCroppedCanvas().toDataURL(),
    });
  }
  cropImageGallery() {
    if (typeof this.cropper4.getCroppedCanvas() === 'undefined') {
      return;
    }  else if(!this.state.crop){
      return;
    }

    this.setState({cropResult4:this.cropper4.getCroppedCanvas().toDataURL(),
    });
  }
  // useDefaultImage() {
  //   this.setState({ src });
  // }

  onImgLoad({target:img}) {
    // console.log( img.offsetHeight)
    if(img.offsetHeight === 1024 && img.offsetWidth === 1024){
    this.setState({dimensions:{height:img.offsetHeight,
                               width:img.offsetWidth}, crop: true, message: ''});
    } else {

      this.setState({message: 'Image is not of recommended size of 1024px*1024px', src: null, })
    }
}
 

  render() {
    console.log(typeof this.state.cropResult1, this.state.cropResult1 )
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
            style={{ height: 800, width: 800 }}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper1 = cropper; }}
            cropBoxResizable={false}
            cropBoxData={{ width: 755, height: 450 }}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              <button onClick={this.cropImageHorizontal} style={{ float: 'center' }}>
                Crop Image Horizontal
              </button>
            </h1>
        
              <img style={{ width: '50%' }} src={this.state.cropResult1} alt="cropped image" />
            
          </div>
        </div>
        <div>
        <br />
          <Cropper
            style={{ height: 800, width: 800 }}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper2 = cropper; }}
            cropBoxResizable={false}
            cropBoxData={{ width: 365, height: 450 }}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              <button onClick={this.cropImageVertical} style={{ float: 'center' }}>
                Crop Image Vertical
              </button>
            </h1>
        
              <img style={{ width: '50%' }} src={this.state.cropResult2} alt="cropped image" />
            
          </div>
        </div>
        <br style={{ clear: 'both' }} />
        <div>
        <br />
          <Cropper
            style={{ height: 800, width: 800 }}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper3 = cropper; }}
            cropBoxResizable={false}
            cropBoxData={{ width: 365, height: 212 }}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              <button onClick={this.cropImageHSmall} style={{ float: 'center' }}>
                Crop Image horizontal small 
              </button> 
            </h1>
        
              <img style={{ width: '50%' }} src={this.state.cropResult3} alt="cropped image" />
            
          </div>
        </div>
        <div>
        <br />
          <Cropper
            style={{ height: 800, width: 800 }}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper4 = cropper; }}
            cropBoxResizable={false}
            cropBoxData={{ width: 380, height: 380 }}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              <button onClick={this.cropImageGallery} style={{ float: 'center' }}>
                Crop Image Gallery
              </button>
            </h1>
        
              <img style={{ width: '50%' }} src={this.state.cropResult4} alt="cropped image" />
            
          </div>
        </div>
      </div>
    );
  }
}