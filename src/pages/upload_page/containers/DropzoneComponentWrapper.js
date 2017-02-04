import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';

// Components
import DropzoneComponent from 'react-dropzone-component';

// Actions
import { change_theme } from '../../../actions/action_themes';
import { update_progress } from '../../../actions/action_rekog';

// Utils
import { detectFace } from '../../utils';


@connect((store) => {
  return {
    processing: store.rekog.processing,
    face: store.rekog.face,
    hue: store.hue
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

    success(file) {
      var _this = this;
      detectFace(file.name, this.props.hue)
      .then(axios.spread(function(rekog_response, hue_response) {
        _this.props.dispatch(update_progress(false));
        _this.props.dispatch(change_theme(hue_response))
        _this.props.dispatch(save_face_data(rekog_response.data.FaceDetails[0]))
        _this.props.dispatch(update_boundingbox(rekog_response.data.FaceDetails[0].BoundingBox));
      }))
      .catch(function(error) {
        _this.props.dispatch(update_progress(false));
      });
    }

    render() {
        console.log("props",this.props);
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see dropzone.js README.md!
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
