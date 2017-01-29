import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

// UI
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText } from 'material-ui/Card'

// Actions
import { change_theme } from '../../actions/action_themes';
import { update_gallery } from '../../actions/action_gallery';
import { update_progress } from '../../actions/action_rekog';

// Components
import ImgGallery from './components/ImgGallery';
import ProcessingDialog from './components/ProcessingDialog';

@connect((store) => {
  return {
    images: store.gallery.images,
    processing: store.rekog.processing
  };
})
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.chooseTheme = this.chooseTheme.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
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
    this.props.dispatch(update_progress(true))

    var selected_img = event.target.src.split(/(\\|\/)/g).pop();
    axios.post('/rekog', {filename: selected_img})
      .then(function(response) {
        console.log("got face: ", response);
        _this.chooseTheme(response.data.FaceDetails[0].Emotions);
        _this.props.dispatch(update_progress(false));
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

  render() {
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
                <ImgGallery images={this.props.images} clickHandler={this.clickHandler} />
              </CardText>
            </Card>

          </Col>
        </Row>
        <Row>
            <Col md={12}>
                Add Selected Image Here...
            </Col>
        </Row>
      </div>
    );
  }
}
