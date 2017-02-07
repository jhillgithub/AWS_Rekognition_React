import React, { Component } from 'react'
import BreathingHalftone from 'BreathingHalftone';

class Halftone extends Component {

    constructor(props) {
        super(props)
    }

    displayImage() {
      if (this.props.selected_image) {
        console.log("selected", this.props.selected_image);
        return <img src={'/uploads/' + this.props.selected_image} />
      } else {
        return null;
      }
    }

    render() {
        this.update();
        return (
          <div ref="container" className="selected">
            {this.displayImage()}
          </div>
        )
    }

    update() {
      var img = document.querySelector(".selected img");
      if (!img) return;
      var currentImgSrc = img.src.split(/(\\|\/)/g).pop();
      if (this.props.selected_img === currentImgSrc) return;

      try {
        halftone.destroy();
      } catch(err) {
        // Ignore Error
      }

      var halftone = new BreathingHalftone(img, {
        dotSizeThreshold: 0.1,
        isAdditive: true,
        isRadial: true,
        friction: 0.04,
        hoverDiameter: 0.8,
        hoverForce: 0.007,
        activeDiameter: 0.8,
        activeForce: -0.007
      });
      console.log("redered halftone with props: ", this.props);
      console.log(halftone);
      window.halftone = halftone;
      // This doesn't scale well for small images. Need to make it detect if
      // larger than container skipping this for now.
      // var canvas = document.querySelector('canvas');
      // if (canvas) {
      //   if (canvas.height > 0){
      //     try {
      //       canvas.style.width = '100%';
      //       canvas.style.height = '100%';
      //       canvas.width = offsetWidth;
      //       canvas.height = offsetHeight;
      //     } catch(err) {
      //       // Ignore error
      //     }
      //   }
      // }

    }

    componentWillUnmount() {
       try {
         halftone.destroy();
       } catch(err) {
         // Ignore Error
       }
    }
}

export default Halftone
