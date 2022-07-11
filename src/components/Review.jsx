import React from 'react';
import PropTypes from 'prop-types';

class Review extends React.Component {
  render() {
    const { info } = this.props;
    return (
      <div>
        <p>{ info.email }</p>
        <p>{ info.rate }</p>
        <p>{ info.message }</p>
      </div>
    );
  }
}

Review.propTypes = {
  info: PropTypes.shape({
    email: PropTypes.string,
    rate: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default Review;
