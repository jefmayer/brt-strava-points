import { getSegmentEffort } from '../api/strava';

// This is only called on authentication/update
const getBestAttemptBySegment = (segments) => {
  const arr = segments.map((segment, index) => {
    if (index === 8) { // For testing
      // We only need best result
      // If no result is better, than no need to return anything
      // We're only storing the best attempt
      return getSegmentEffort(segment.id)
    }
  });
  return Promise.all(arr);
};

export {
  getBestAttemptBySegment,
};