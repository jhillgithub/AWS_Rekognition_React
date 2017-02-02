import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

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
import ProcessingDialog from './components/ProcessingDialog';
import EmotionsRadarChart from './components/EmotionsRadarChart';
import EmotionsPolarChart from './components/EmotionsPolarChart';


@connect((store) => {
  return {
    images: store.gallery.images,
    processing: store.rekog.processing,
    face: store.rekog.face,
    selected_image: store.selected_image,
    boundingbox: store.boundingbox
  };
})
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.chooseTheme = this.chooseTheme.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      base_url: "https://s3-us-west-2.amazonaws.com/reactrekognition/"

    }
  }

  chooseTheme(emotions) {
    console.log(emotions);
    var maxConf = _.maxBy(emotions, 'Confidence');
    var maxEmotion = maxConf.Type;
    console.log(maxEmotion);
    this.props.dispatch(change_theme(maxEmotion));
  }

  clickHandler(event) {
    var _this = this;
    console.log(event.target.src);
    var selected_img = event.target.src.split(/(\\|\/)/g).pop();
    this.props.dispatch(update_progress(true))
    this.props.dispatch(select_image(selected_img));

    axios.post('/rekog', {filename: selected_img})
      .then(function(response) {
        console.log("got face: ", response);
        _this.chooseTheme(response.data.FaceDetails[0].Emotions);
        _this.props.dispatch(update_progress(false));
        _this.props.dispatch(update_boundingbox(response.data.FaceDetails[0].BoundingBox));
        _this.props.dispatch(save_face_data(response.data.FaceDetails[0]))
      })
      .catch(function(error) {
        _this.props.dispatch(update_progress(false));
        console.log("error: ", error);
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

  componentWillReceiveProps(nextProps) {
    console.log("Next Props: ",nextProps.face);
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
                title="Choose an image to get started"
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
        <Row>
            <Col md={12}>
              <Card style={{textAlign: "center"}}>
                <CardMedia>

                </CardMedia>
                <CardText>
                  <div>
                    <img src={this.props.selected_image ? this.state.base_url + this.props.selected_image: ""}>
                      <div style={boundingBoxStyle}></div>
                    </img>
                  </div>
                  <EmotionsRadarChart {...this.props} />
                  <EmotionsPolarChart {...this.props} />
                </CardText>
              </Card>
            </Col>
        </Row>
      </div>
    );
  }
}
