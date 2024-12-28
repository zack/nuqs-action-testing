'use client';

import React from 'react';
import { useQueryState, parseAsInteger } from 'nuqs'

import { getNTimesTwo } from './action';

function parser(input: string): number {
  console.log({ input });
  if (input in ['1', '2', '3', '4', '5']) {
    return parseInt(input);
  } else {
    return 0;
  }
}

export default function Home() {
  const [n, setN] = useQueryState('n', {
    parse: parser,
    defaultValue: 0,
    clearOnDefault: true,
  });
  const [derived, setDerived] = React.useState<number|null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setN(parseInt(e.target.value));
  };

  React.useEffect(() => {
    let ignore = false;

    if (n !== null && n !== undefined) {
      setIsLoading(true);
      getNTimesTwo(n).then((newValue: number) => {
        if (!ignore) {
          setIsLoading(false);
          setDerived(newValue);
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [n]);


  return (
    <div>
      <main>
        <div>
          Input:
          <select value={n} onChange={handleChange}>
            <option value={0}> 0 </option>
            <option value={1}> 1 </option>
            <option value={2}> 2 </option>
            <option value={3}> 3 </option>
            <option value={4}> 4 </option>
            <option value={5}> 5 </option>
          </select>
        </div>
        <div>
          Derived value: {isLoading ? 'Loading...' : derived}
        </div>
      </main>
    </div>
  );
}
