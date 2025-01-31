import validator from 'validator';

export const isURL = (value: string) => validator.isURL(value, {
  protocols: ['https'],
  require_protocol: true
});

export const containURL = (value: string) => value.split(' ').some(isURL);
