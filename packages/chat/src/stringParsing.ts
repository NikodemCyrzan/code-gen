const codeRegexp = /`{3}(.*)\n((.|\n)+?)`{3}/m;

export function findFirstCode(input: string) {
  const match = input.match(codeRegexp);

  console.log(match);

  return {
    language: match[1] ?? '',
    code: match[2]?.trim() ?? ''
  };
}
