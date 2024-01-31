import { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { isBrowser } from '../utils/browser-utils';

class RedirectComponent extends Component {
  componentDidMount() {
    const { route } = this.props;
    if (isBrowser()) {
      Router.push(route);
    }
  }

  render() {
    return null;
  }
}

RedirectComponent.propTypes = {
  route: PropTypes.string.isRequired,
};

export default RedirectComponent;
