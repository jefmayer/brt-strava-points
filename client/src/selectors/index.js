import { getSegmentEffort } from '../api/strava';

const getAttempts = (segments, users) => {
  const arr = segments.map((segment, index) => {
    if (index ===2 || index === 8) { // For testing
      // Get token
      return getSegmentEffort(segment.id, token)
    }
  });
  return Promise.all(arr);
};

export {
  getAttempts,
};