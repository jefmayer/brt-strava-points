import { useRouter } from 'next/router';
import React from 'react';

export default function RedirectComponent() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/scoreboard');
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
