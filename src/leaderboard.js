let cachedLeaderboards = {};
let lastFetchTimes = {};
const CACHE_DURATION = 30 * 1000;

export async function getLeaderboard(sheetName) {
  const now = Date.now();

  if (
    cachedLeaderboards[sheetName] &&
    now - (lastFetchTimes[sheetName] || 0) < CACHE_DURATION
  ) {
    return cachedLeaderboards[sheetName];
  }

  try {
    const sheetId = "1r4MsJ_qj9cSrpFq09CKScBnh4ZEDg-MVsF1t7GpwCdc";
    const url = "https://opensheet.elk.sh/" + sheetId + "/" + sheetName;
    const res = await fetch(url);
    const data = await res.json();

    data.sort((a, b) =>
      Number(b["Total score (35)"] || 0) -
      Number(a["Total score (35)"] || 0)
    );

    cachedLeaderboards[sheetName] = data;
    lastFetchTimes[sheetName] = now;

    return data;
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    return [];
  }
}
