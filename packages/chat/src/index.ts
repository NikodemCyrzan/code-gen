import { findFirstCode } from './stringParsing.js';

const url = 'https://cyrzanoferta.ovh';

export async function sendPrompt(prompt: string) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      prompt
    })
  });

  const json = await res.json();

  //@ts-ignore
  if (!json.status || json.status === 'failure') {
    return {
      success: false
    } as const;
  }

  //@ts-ignore
  return findFirstCode(json.message.content);
}
