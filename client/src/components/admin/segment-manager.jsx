import React, { Component } from 'react';

class SegmentManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="pb-5 pl-4 pt-20">
          <h2 className="font-extrabold text-6xl">Segments</h2>
        </div>
        <div>
        <table className="table-auto w-full">
            <thead className="bg-neutral-300">
              <tr>
                <th className="font-semibold px-4 py-2 text-left text-xs">Display Name</th>
                <th className="font-semibold px-4 py-2 text-left text-xs">Strava Id</th>
                <th className="font-semibold px-4 py-2 text-left text-xs">Expected Time</th>
                <th className="font-semibold px-4 py-2 text-left text-xs">Region</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default SegmentManager;
