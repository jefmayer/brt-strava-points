import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/standings-menu.module.scss';

class StandingsMenu extends Component {
  componentDidMount() {
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick(event) {
    console.log(event);
  }

  render() {
    // Break-up leaderboards by region
    const { segments } = this.props;
    const overallLeaderboardLabel = 'Overall Leaderboard';
    if (segments == null) {
      return;
    }
    return (
      <>
        <button
          className={`${styles.btn} bg-neutral-800 block w-full`}
          onClick={this.onMenuClick}
        >
          <span className="active-leaderboard block color-brt-white font-semibold max-w-sm mx-auto py-3 text-2xl text-left text-neutral-200">
            {overallLeaderboardLabel}
          </span>
        </button>
        <ul className="bg-neutral-700">
          <li>
            <span className="block font-semibold max-w-sm mx-auto py-1.5 text-md text-white">
              {overallLeaderboardLabel}
            </span>
          </li>
          {
            segments.map(item => (
              <li key={item.id}>
                <button
                  className="w-full"
                  onClick={this.onMenuClick}
                >
                    <span className="active-leaderboard block color-brt-white font-semibold max-w-sm mx-auto py-1.5 text-left text-md text-neutral-200">
                      {item.name}
                    </span>
                </button>
              </li>
            ))
          }
        </ul>
      </>
    );
  }
}

StandingsMenu.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object),
};

export default StandingsMenu;
