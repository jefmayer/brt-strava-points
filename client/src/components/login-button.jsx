import Link from 'next/link';
import React from 'react';
import { isAuthenticated } from '../utils/strava-oauth-utils';

export default function LoginButton() {
  const loginUrl = isAuthenticated() ? '/standings' : process.env.NEXT_PUBLIC_STRAVA_AUTHORIZATION_URL;
  return (
    <Link
      className="btn btn-primary mr-2"
      href={loginUrl}
    >
      Sign In
    </Link>
  );
}
