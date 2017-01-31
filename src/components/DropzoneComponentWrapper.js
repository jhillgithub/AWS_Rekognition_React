import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';


// Components
import DropzoneComponent from 'react-dropzone-component';

// Actions
import { change_theme } from '../actions/action_themes';
import { update_progress } from '../actions/action_rekog';

import { connect } from "react-redux";


@connect((store) => {
  return {
    images: store.gallery.images,
    processing: store.rekog.processing,
    selected_image: store.selected_image,
    boundingbox: store.boundingbox
  };
})
export default class DropzoneComponentWrapper extends React.Component {
    constructor(props) {
        super(props);


        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif"
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/upload'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');

        // this.success = file => console.log('uploaded', file);
        this.success = this.success.bind(this);

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    chooseTheme(emotions) {
      console.log(emotions);
      var maxConf = _.maxBy(emotions, 'Confidence');
      var maxEmotion = maxConf.Type;
      console.log(maxEmotion);
      this.props.dispatch(change_theme(maxEmotion));
    }


    success(file) {
      var _this = this;
      console.log(file);
      axios.post('/rekog', {filename: file.name})
        .then(function(response) {
          console.log("got face: ", response);
          _this.chooseTheme(response.data.FaceDetails[0].Emotions);
          _this.props.dispatch(update_progress(false));
        })
        .catch(function(error) {
          _this.props.dispatch(update_progress(false));
          console.log("error: ", error);
        });
      // change theme here

    }

    componentDidMount() {
      console.log("props", this.props);
    }

    render() {
        console.log("props",this.props);
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile
        }

        return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
    }
}
