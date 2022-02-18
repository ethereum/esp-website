export const addTimestamp = (email: string) => {
  const splittedEmail = email.split('@');

  return `${splittedEmail[0]}+${Date.now()}@${splittedEmail[1]}`;
};
