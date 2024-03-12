import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AllSegmentsMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      segments,
    } = this.props;
    console.log(segments);
    return (
      <>
      </>
    );
  }
}

AllSegmentsMap.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object),
};

const AllSegmentsMap = (state) => {
  const {
    appData,
  } = state;
  const {
    segments,
  } = appData;
  return {
    segments,
  };
};

export default connect(mapStateToProps)(AllSegmentsMap);
