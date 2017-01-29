import React from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

export default class DialogExampleSimple extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        open: false,
      };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.processing });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    return (
      <div>
        <Dialog
          title="Processing with AWS Rekognition Deep Learning Algorithm..."
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{textAlign: 'center'}}
        >
          <CircularProgress size={80} thickness={5} />
        </Dialog>
      </div>
    );
  }
}
