import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from 'react-cropper';

/* global FileReader */

// const src = require('../src/img/shopping.JPG');

export default class UploadPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult1:null,
      cropResult2: null,
      cropResult3: null,
      cropResult4: null,
      dimensions: {},
      message: '',
      uloadMessage: '',
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

  componentDidMount(){
      
  }

  onUpload = () => {
    if(this.state.cropResult1 === null || this.state.cropResult2 === null || this.state.cropResult3 === null || this.state.cropResult4 === null){
      this.setState({uploadMessage: 'Please crop all the images'})
    }
       else {
      fetch('http://localhost:8080/images', {
      method: 'POST',
      body: JSON.stringify({
        horizontal: this.state.cropResult1,
        vertical: this.state.cropResult2,
        hsmall: this.state.cropResult3,
        gallery: this.state.cropResult4
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201){
        this.setState({uploadMessage: 'Failed'})
        throw new Error('Failed!')
      } 
      res.json().then(resData => {
      console.log(resData);
      this.setState({uploadMessage: ' Upload Success'})
    })
    })
    .catch(err => {
      console.log(err)
      this.setState({uploadMessage: ' Error'+ err})
    }) 
  }
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

      this.setState({ src: reader.result, dimensions: {} });
      
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

      this.setState({message: 'Image is not of recommended size of 1024px*1024px', src: null, crop: false})
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
        <button onClick={this.onUpload} style={{ float: 'center' }}>Upload Images</button>
        <span>{this.state.uploadMessage}</span>
      </div>
    );
  }
}