import { Component } from 'react';
import PropTypes from 'prop-types';

class StandingsNav extends Component {
  componentDidMount() {
    //
  }

  render() {
    const { segments } = this.props;
    return (
      <>
        <h2 className="font-bold text-xl">Leaderboards</h2>
        <ul>
          <li>
            <span className="text-sm">Overall</span>
          </li>
          {
            segments.map(item => (
              <li key={item.id}>
                <span className="text-sm">{item.name}</span>
              </li>
            ))
          }
        </ul>
      </>
    );
  }
}

StandingsNav.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object),
};

export default StandingsNav;
