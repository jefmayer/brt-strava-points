import { getSegmentEffort } from '../api/strava';

const compareAttemptResults = (newAttempts, existingAttempts) => (
  newAttempts.filter((item) => {
    const existingAttempt = existingAttempts.find((attempt) => attempt.brt_id === item.brt_id);
    return ((existingAttempt && item.elapsed_time < existingAttempt.elapsed_time) || !existingAttempt);
  })
);

// Only called on authentication/update
const getBestAttemptBySegment = (segments) => {
  const year = new Date().getFullYear();
  const arr = segments.map((segment, index) => {
    return getSegmentEffort(segment.id).then((data) => (
      data
        .filter((attempt) => attempt.start_date.indexOf(`${year}-`) !== -1)
        .at(0)
    ));
  });
  return Promise.all(arr)
    .then((data) => (
      data
        .filter((item) => item !== undefined)
        .map((item) => (
          {
            ...item,
            brt_id: `${item.athlete.id}_${item.segment.id}_${year}`,
          }
        ))
    ));
};

const getStandingsForSegment = (segment) => {
  console.log(segment);
  return [];
};

export {
  compareAttemptResults,
  getBestAttemptBySegment,
  getStandingsForSegment,
};