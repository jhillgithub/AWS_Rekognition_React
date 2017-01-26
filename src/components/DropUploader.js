import React from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

export default class DropUploader extends React.Component {

    constructor() {
        super();
    }

    render() {
        const style = {
            height: 200,
            border: 'dashed 2px #999',
            borderRadius: 5,
            position: 'relative',
            cursor: 'pointer'
        };

        const uploaderProps = {
            style,
            maxFileSize: 1024 * 1024 * 50,
            server: 'http://localhost:3000',
            s3Url: 'https://testreactrekognition.s3.amazonaws.com',
            signingUrlQueryParams: {
                uploadType: 'avatar'
            }
        };
        return (
          <DropzoneS3Uploader onFinish={console.log} {...uploaderProps} />

        );
    }
}
