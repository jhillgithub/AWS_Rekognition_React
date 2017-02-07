import React from 'react';
import axios from 'axios';

// Components
import DropzoneComponent from 'react-dropzone-component';

// Actions
import { change_theme, counter_emotions } from '../../../actions/action_themes';
import { update_progress, save_face_data } from '../../../actions/action_rekog';
import { select_image } from '../../../actions/index';

// Utils
import { detectFace } from '../../utils';


export default class DropzoneComponentWrapper extends React.Component {
    constructor(props) {
        super(props);


        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png"
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
      this.props.dispatch(update_progress(true))
      this.props.dispatch(select_image(file.name));
      detectFace(file.name, this.props.hue, this.props.counterEmotions)
      .then(axios.spread(function(rekog_response, hue_response) {
        console.log("--------------------------------\n\n");
        console.log("face", rekog_response);
        console.log("--------------------------------\n\n");
        _this.props.dispatch(update_progress(false));
        _this.props.dispatch(change_theme(hue_response))
        _this.props.dispatch(save_face_data(rekog_response.data.FaceDetails[0]))
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
