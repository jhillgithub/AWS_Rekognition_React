import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const ENDPOINT_TO_GET_SIGNED_URL = '/api/v1/getsignedurl';

export default class ImageUploader extends React.Component {

    constructor() {
        super();
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
        var file = files[0];

        axios.get(ENDPOINT_TO_GET_SIGNED_URL, {
            filename: file.name,
            filetype: file.type
        }).then(function(result) {
            var signedUrl = result.data.signedUrl;

            var options = {
                headers: {
                    'Content-Type': file.type
                }
            };

            return axios.put(signedUrl, file, options);
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            console.log(err);
        });
    }

    render() {
        return (
            <Dropzone onDrop={this.onDrop} size={150}>
                <div>
                    Drop some files here!
                </div>
            </Dropzone>
        );
    }
}
