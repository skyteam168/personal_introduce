import { resetDbClient } from "@/lib/db";

const RETRYABLE =
  /failed query|connection|timeout|econnreset|econnrefused|terminated|closed|pool|xx000|57p01|53300|max clients/i;

export function isRetryableDbError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = `${error.message} ${(error as Error & { cause?: Error }).cause?.message ?? ""}`;
  return RETRYABLE.test(message);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Retry transient DB errors and reset the connection between attempts. */
export async function withDbRetry<T>(
  fn: () => Promise<T>,
  attempts = 3
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (!isRetryableDbError(error) || i === attempts - 1) break;
      resetDbClient();
      await sleep(250 * (i + 1));
    }
  }

  throw lastError;
}

export function formatDbError(error: unknown): string {
  if (isRetryableDbError(error)) {
    return "数据库连接暂时不稳定，请稍后刷新页面重试。";
  }
  if (error instanceof Error && error.message.length < 120) {
    return error.message;
  }
  return "内容加载失败，请稍后重试。";
}
