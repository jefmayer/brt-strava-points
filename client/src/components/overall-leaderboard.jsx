import { Component } from 'react';
import PropTypes from 'prop-types';

class OverallLeaderboard extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left text-xs">Rank</th>
            <th className="text-left text-xs">Name</th>
            <th className="text-left text-xs">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

OverallLeaderboard.propTypes = { };

export default OverallLeaderboard;
