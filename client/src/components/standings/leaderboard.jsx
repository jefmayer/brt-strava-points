import React, { Component } from 'react';

class Leaderboard extends Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <div>
        <div className="flex min-h-14">
          <div>My Ranking</div>
        </div>
        <table className="table-auto w-full">
          <thead className="bg-neutral-300">
            <tr>
              <th className="font-medium px-4 py-2 text-left text-xs">Rank</th>
              <th className="font-medium px-4 py-2 text-left text-xs">Name</th>
              <th className="font-medium px-4 py-2 text-left text-xs">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium px-4 py-3 text-left text-sm">...</td>
              <td className="font-medium px-4 py-3 text-left text-sm">...</td>
              <td className="font-medium px-4 py-3 text-left text-sm">...</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;
