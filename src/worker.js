import { getLeaderboard } from "./leaderboard.js";
import { isAdminAuthenticated } from "./auth.js";

export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname;

    let pageContent = "";

    if (path === "/") {
      pageContent = "<h1>we are the future of music.</h1>";
    }

    else if (path === "/current") {
      const data = await getLeaderboard("Sheet1");
      // build leaderboard HTML
    }

    else if (path === "/admin") {
      const loggedIn = isAdminAuthenticated(request, env);
      // admin logic
    }

    const html = `
      <html>
      ...
      ${pageContent}
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    });
  }
};
