import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import { change_theme } from '../actions/action_themes';

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

    success(file) {
      console.log(file);
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
