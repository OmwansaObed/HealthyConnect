export default function rateLimit({ interval, uniqueTokenPerInterval }) {
  const tokens = new Map();

  return {
    check: (limit, token) =>
      new Promise((resolve, reject) => {
        const now = Date.now();
        const entry = tokens.get(token);

        if (!entry) {
          tokens.set(token, { lastReset: now, count: 1 });
          return resolve();
        }

        if (now - entry.lastReset > interval) {
          entry.lastReset = now;
          entry.count = 1;
          return resolve();
        }

        if (entry.count >= limit) {
          return reject(new Error("rate limit exceeded"));
        }

        entry.count++;
        resolve();
      }),
  };
}
