
import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

function getID() {
    const id = _.uniqueId("prefix-");
    return id
}

const base_url = "https://s3-us-west-2.amazonaws.com/reactrekognition/";
const ImgGalleray = (props) => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={4.2}>
      {props.images.map((image) => (
        <GridTile
          key={getID()}
          title={image.Key}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img onClick={props.clickHandler} src={ base_url + image.Key} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default ImgGalleray;
