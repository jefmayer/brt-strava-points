import React from 'react';
import RedirectComponent from './redirect';
import { isAuthenticated } from '../utils/strava-oauth-utils';

export default function VerifyAuthentication() {
  const redirectCondition = !isAuthenticated();
  return (
    <div>
      { redirectCondition
        && (
          <RedirectComponent
            route="/"
          />
        )}
    </div>
  );
}
