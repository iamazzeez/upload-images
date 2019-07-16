import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from 'react-cropper';

/* global FileReader */

const src = require('../src/img/shopping.JPG');

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: [],
      arr: []
      
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
      console.log(files[0])
    }
    console.log(e.target)
    var reader = new FileReader();

//Read the contents of Image File.
reader.readAsDataURL(files[0]);
reader.onload = function (e) {

//Initiate the JavaScript Image object.
var image = new Image();

//Set the Base64 string return from FileReader as source.
image.src = e.target.result;

//Validate the File Height and Width.
image.onload = function () {
  var height = this.height;
  var width = this.width;
  if (height > 100 || width > 100) {
    alert("Height and Width must not exceed 100px.");
    return false;
  }
  alert("Uploaded image has valid Height and Width.");
  return true;
};
  }

    // const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
      
    };
    // reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  useDefaultImage() {
    this.setState({ src });
  }

  nextDimenstion() {
// var reader = new FileReader();

// //Read the contents of Image File.
// reader.readAsDataURL(fileUpload.files[0]);
// reader.onload = function (e) {

// //Initiate the JavaScript Image object.
// var image = new Image();

// //Set the Base64 string return from FileReader as source.
// image.src = e.target.result;

// //Validate the File Height and Width.
// image.onload = function () {
//   var height = this.height;
//   var width = this.width;
//   if (height > 100 || width > 100) {
//     alert("Height and Width must not exceed 100px.");
//     return false;
//   }
//   alert("Uploaded image has valid Height and Width.");
//   return true;
// };
//   }
}

  render() {
    console.log(typeof this.state.cropResult)
    return (
      <div style={{display: 'flex', flexDirection: 'column', margin: '20px'}}>
        <div style={{ width: '100%' }}>
          <input type="file" onChange={this.onChange} />
          <button onClick={this.useDefaultImage}>Use default img</button>
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