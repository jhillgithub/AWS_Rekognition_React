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
