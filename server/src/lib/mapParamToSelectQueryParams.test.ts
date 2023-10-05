import { mapParamToSelectQueryParams } from './mapParamToSelectQueryParams';

describe('mapParamToSelectQueryParams', () => {
  it('should return an object with the key being the param and the value being the param', () => {
    expect(mapParamToSelectQueryParams('test')).toEqual({
      OR: [
        {
          description: {
            contains: 'test',
          },
        },
        {
          full_name: {
            contains: 'test',
          },
        },
      ],
    });
  });
  it("should return a valid where clause if the param is 'language:javascript'", () => {
    expect(mapParamToSelectQueryParams('language:javascript')).toEqual({
      language: {
        contains: 'javascript',
      },
    });
  });
});
