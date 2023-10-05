const transformResponse =
  <T extends {}>(identifier: keyof T) =>
  (response: T[][] | T[] | null | undefined) => {
    if (!response) return {};
    const flattenedResponse = Array.isArray(response[0])
      ? (response as T[][]).reduce((acc, cur) => {
          acc.push(...cur);
          return acc;
        }, [])
      : (response as T[]);
    if (flattenedResponse.length === 0) return {};
    /*       response.flat(); */
    if (flattenedResponse[0][identifier] === undefined)
      throw new Error(`Key ${identifier as string} not present in response`);
    return flattenedResponse.reduce((acc, cur: T) => {
      acc[cur[identifier]] = cur;
      return acc;
    }, {} as Record<string, T>);
  };

export default transformResponse;
