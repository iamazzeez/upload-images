import React, { Component } from 'react'

export default class CheckDimensions extends Component {
    constructor(props) {
        super(props);
        this.state = {dimensions: {}};
        this.onImgLoad = this.onImgLoad.bind(this);
    }
    onImgLoad({target:img}) {
        if(img.offsetHeight === 1204 && img.offsetWidth === 1204){
        this.setState({dimensions:{height:img.offsetHeight,
                                   width:img.offsetWidth}});
        } else {alert('Image is not of recommended size of 1024px*1024px')}
    }
    render(){
        const {src} = this.props;
        const {width, height} = this.state.dimensions;
        
      
        return (<div>
                dimensions width{width}, height{height}
                <br/>
                <img onLoad={this.onImgLoad} src={src}/>
                </div>
               );
    }
}
