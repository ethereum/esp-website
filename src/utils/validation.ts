import validator from 'validator';

export const isURL = (value: string) => validator.isURL(value);

export const containURL = (value: string) => value.split(' ').some(isURL);
