export function limit<T>(
  originalFunction: (...args: never[]) => Promise<T>,
  maxParallelRuns: number,
) {
  let runningCount = 0;

  return async (...args: never[]) => {
    if (runningCount >= maxParallelRuns) {
      throw new Error('Rate limit exceeded');
    }

    runningCount += 1;

    try {
      const result = await originalFunction(...args);
      runningCount -= 1;
      return result;
    } catch (e) {
      runningCount -= 1;
      throw e;
    }
  };
}
