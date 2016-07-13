import React, { PropTypes } from 'react';
import { Card } from '../UI';

export default class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this._image = null;
    this.fetchImage = this.fetchImage.bind(this);
  }

  componentDidMount() {
    this._image = new Image();
    if (this.props.image) {
      this.fetchImage(this.props.image);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.fetchImage(nextProps.image);
    }
  }

  componentWillUnmount() {
    this._image.onload = null;
    this._image = null;
  }

  fetchImage(src) {
    this._image.onload = this.props.onImageLoaded;
    this._image.src = src;
  }

  render() {
    const { onClick, image, text } = this.props;
    return (
      <Card onClick={onClick}>
        <img src={image} />
        <h4>{text}</h4>
      </Card>
    );
  }
}

ImageCard.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onImageLoaded: PropTypes.func,
  text: PropTypes.string.isRequired
};

ImageCard.defaultProps = {
  onClick: function() {},
  onImageLoaded: function() {}
};
