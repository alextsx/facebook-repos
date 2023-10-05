//if we have a key:value pair we want to search by key for the value
// else we want to search by description or full_name (whether they contain the param or not)
export const mapParamToSelectQueryParams = (param: string) => {
  if (param.includes(':')) {
    const [key, value] = param.split(':');
    return {
      [key]: {
        contains: value,
      },
    };
  }
  return {
    OR: [
      {
        description: {
          contains: param,
        },
      },
      {
        full_name: {
          contains: param,
        },
      },
    ],
  };
};
