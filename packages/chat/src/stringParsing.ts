const codeRegexp = /`{3}(.*)\n((.|\n)+?)`{3}/m;

export function findFirstCode(input: string): {
  success: true;
  language: string;
  code: string;
} {
  const match = input.match(codeRegexp);

  if (!match) {
    return {
      success: true,
      language: 'text',
      code: input
    };
  }

  return {
    success: true,
    language: match[1] ?? '',
    code: match[2]?.trim() ?? ''
  };
}
