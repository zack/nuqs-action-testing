'use server';

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
};

export async function getNTimesTwo(n: number) {
  await sleep(1500);
  return n * 2;
}
