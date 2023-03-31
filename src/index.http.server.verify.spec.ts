import { HttpRequestConfig } from '.';
import api from './__tests__/client/http/connector';
import { UserNotFoundConsumerError } from './__tests__/client/http/connector/errors';
import { ApiError } from './__tests__/client/http/connector/internals/apiErrors';
import { verifyContract } from './boundaries/jest/jest';

verifyContract(
  {
    providerName: 'http request provider',
    contractDir: './temp-contracts',
    printResults: false,
  },
  (verifier) => {
    verifier.verifyContract({
      triggers: {
        'an http "GET" request to "/health" without a body': {
          trigger: (config: HttpRequestConfig) => api(config.baseUrl).health(),
          verifiers: {
            'a (200) response with body an object shaped like {status: "up"}': (
              health
            ) => {
              expect(health).toEqual('up');
            },
            'a (200) response with body an object shaped like {status: <any string>}':
              (health) => expect(typeof health).toBe('string'),
          },
          errorVerifiers: {
            'a (httpStatus 4XX | 5XX) response without a body': (e) => {
              expect(e).toBeInstanceOf(ApiError);
            },
            'a (503) response with body an object shaped like {status: "down"}':
              (e) => {
                expect(e).toBeInstanceOf(ApiError);
              },
          },
        },
        'an http "GET" request to "/health" with the following headers an object shaped like {accept: "application/json"} without a body':
          {
            trigger: (config: HttpRequestConfig) =>
              api(config.baseUrl).health(),
            verifiers: {
              'a (200) response with body an object shaped like {status: "up"}':
                (health) => {
                  expect(health).toEqual('up');
                },
            },
            errorVerifiers: {},
          },
        'an http "GET" request to "/users"?id={{userId}} without a body': {
          trigger: (config: HttpRequestConfig) =>
            api(config.baseUrl).getUserByQuery(
              (config.variables['userId'] as string) || '123'
            ),
          verifiers: {
            'a (200) response with body an object shaped like {userId: {{userId}}}':
              (user, config) => {
                expect(user).toEqual({
                  userId: config.variables['userId'],
                });
              },
          },
          errorVerifiers: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
        'an http "GET" request to "/users/123" without a body': {
          trigger: (config: HttpRequestConfig) =>
            api(config.baseUrl).getUserByPath('123'),
          verifiers: {},
          errorVerifiers: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
        'an http "GET" request to "/users/{{userId}}" without a body': {
          trigger: (config: HttpRequestConfig) =>
            api(config.baseUrl).getUserByPath(
              config.variables['userId'] as string
            ),
          verifiers: {
            'a (200) response with body an object shaped like {userId: {{userId}}}':
              (user, config) => {
                expect(user).toEqual({
                  userId: config.variables['userId'],
                });
              },
          },
          errorVerifiers: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
      },
    });
  }
);