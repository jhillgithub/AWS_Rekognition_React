import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';

// UI
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card'

// Actions
import { change_theme } from '../../actions/action_themes';
import { update_gallery } from '../../actions/action_gallery';
import { update_progress, save_face_data } from '../../actions/action_rekog';
import { select_image, update_boundingbox } from '../../actions/index';

// Components
import ImgGallery from './components/ImgGallery';
import ProcessingDialog from '../components/ProcessingDialog';
import DataViz from '../components/DataViz';

// Utils
import { detectFace } from '../utils';


@connect((store) => {
  return {
    images: store.gallery.images,
    processing: store.rekog.processing,
    face: store.rekog.face,
    selected_image: store.selected_image,
    boundingbox: store.boundingbox,
    hue: store.hue
  };
})
export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      base_url: "https://s3-us-west-2.amazonaws.com/reactrekognition/"
    }
  }

  clickHandler(event) {
    var _this = this;
    console.log(event.target.src);
    var selected_img = event.target.src.split(/(\\|\/)/g).pop();
    this.props.dispatch(update_progress(true))
    this.props.dispatch(select_image(selected_img));

    detectFace(selected_img, this.props.hue)
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

  componentDidMount() {
    var _this = this;
    axios.get('/getimages')
    .then(function(response) {
      console.log('got images: ', response);
      _this.props.dispatch(update_gallery(response.data.Contents))
    })
    .catch(function(error) {
      console.log("error: ", error);
    })
  }

  render() {
    const boundingBox = {
      left: (this.props.boundingbox.Left*100) + "%",
      top: (this.props.boundingbox.Top*100) + "%",
      height: (this.props.boundingbox.Height*100) + "%",
      width: (this.props.boundingbox.Width*100) + "%",
      position: "absolute",
      zIndex: 1,
      backgroundColor: "tranparent",
      border: "4px solid green"
    };

    var boundingBoxStyle = this.props.selected_image ? boundingBox : {display: "hidden"};

    return (
      <div>
        <Row>
          <Col md={12} style={{marginBottom: "60px"}}>
            <ProcessingDialog processing={this.props.processing} />
            <Card style={{textAlign: "center"}}>
              <CardTitle
                title="Emotion Detection using Amazon's Deep Learning Facial Recognition Algorithm"
                subtitle="Select an image for processing..."
              />
              <CardText>
                <ImgGallery
                  base_url={this.state.base_url}
                  images={this.props.images}
                  clickHandler={this.clickHandler} />
              </CardText>
            </Card>
          </Col>
        </Row>
        <DataViz {...this.props} />
      </div>
    );
  }
}
