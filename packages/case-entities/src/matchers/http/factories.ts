import {
  AnyCaseStringMatcher,
  CoreHttpBasicAuthValueMatcher,
} from '../definitions.types';
import { HTTP_BASIC_AUTH_TYPE } from './constants.types';

export const coreBasicAuthValue = (
  username: AnyCaseStringMatcher,
  password: AnyCaseStringMatcher
): CoreHttpBasicAuthValueMatcher => ({
  '_case:matcher:type': HTTP_BASIC_AUTH_TYPE,
  '_case:matcher:username': username,
  '_case:matcher:password': password,
  '_case:matcher:resolvesTo': 'string',
});
