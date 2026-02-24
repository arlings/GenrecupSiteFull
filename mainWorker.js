let cachedLeaderboard = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds

async function getLeaderboard() {
  const now = Date.now();
  if (cachedLeaderboard && now - lastFetchTime < CACHE_DURATION) {
    return cachedLeaderboard; // serve cached data
  }

  try {
    const sheetId = '1r4MsJ_qj9cSrpFq09CKScBnh4ZEDg-MVsF1t7GpwCdc';
    const sheetName = 'Sheet1';
    const url = 'https://opensheet.elk.sh/' + sheetId + '/' + sheetName;

    const res = await fetch(url);
    const data = await res.json();

    // Sort by Total score descending
    data.sort((a, b) => Number(b["Total score (35)"] || 0) - Number(a["Total score (35)"] || 0));

    cachedLeaderboard = data;
    lastFetchTime = now;
    return data;
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    return [];
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    let pageContent = '<h1>we are the future of music.</h1>';

    if (path === '/about') {
      pageContent = `
        <h1>About Us</h1>
        <nav style="margin-bottom:20px;">
          <a href="#story" style="margin-right:16px;">Our Story</a>
          <a href="#music" style="margin-right:16px;">Our Music</a>
          <a href="#hall-of-fame">Hall of Fame</a>
        </nav>

        <section id="story">
          <h2>Our Story</h2>
          <p>This is the story of Genrecup.org...</p>
        </section>

        <section id="music">
          <h2>Our Music</h2>
          <p>Here is a collection of music from our competitions...</p>
        </section>

        <section id="hall-of-fame">
          <h2>Hall of Fame</h2>
          <p>Celebrating the best performances and winners throughout Genrecup history!</p>
        </section>
      `;
    } else if (path === '/archive') {
      pageContent = `
        <h1>Genrecup Archive</h1>
        <nav style="margin-bottom:20px;">
          <a href="#season1" style="margin-right:16px;">Season 1</a>
          <a href="#season2">Season 2</a>
        </nav>

        <section id="season1">
          <h2>Season 1</h2>
          <p>
            Did you know: In season 1 of Genrecup, the competition was originally called Loficup?! 
            It was quite a time for the competition, discovering its first rulebook and participants.
          </p>

          <div class="archive-grid">
            
            <div class="archive-card">
              <div class="archive-image" style="background-image:url('https://i.imgur.com/HuKVF4L.png'); background-color:#d6f0ff;"></div>
              <p><strong>Total streams</strong> </p>
            </div>

            <div class="archive-card">
              <div class="archive-image" style="background-image:url('https://i.imgur.com/mxM6ohL.png'); background-color:#ffd6e8;"></div>
              <p><strong>Total Competitors</strong></p>
            </div>

            <a href="https://www.bandlab.com/track/d4dc9c16-a244-ef11-86c3-000d3a42581b?revId=d3dc9c16-a244-ef11-86c3-000d3a42581b"
              target="_blank"
              rel="noopener noreferrer"
              class="archive-card link-card">

              <div class="archive-image"
                  style="background-image:url('https://i.imgur.com/ahO1N6P.jpeg'); background-color:#e8ffd6;">
              </div>

              <p><strong>Top Song: yorokobi by @qzeahsucks</strong></p>

            </a>

          </div>
          <img src="https://i.ibb.co/DgtvTVVn/1st-1.png" alt="Genrecup podium" style="padding: 20px;" class="center-image">
        </section>

        <section id="season2">
          <h2>Season 2</h2>
          <p>
            Season 2 of Genrecup! After winning Season 1, Grootunknown became co-host 
            alongside az. The competition expanded and raised the stakes.
          </p>

          <div class="archive-grid">
            
            <div class="archive-card">
              <div class="archive-image" style="background-image:url('IMAGE_URL_HERE'); background-color:#ffe9c6;"></div>
              <p><strong>Winner:</strong> TBD</p>
            </div>

            <div class="archive-card">
              <div class="archive-image" style="background-image:url('IMAGE_URL_HERE'); background-color:#d6e4ff;"></div>
              <p><strong>Total Competitors:</strong> 18 Artists</p>
            </div>

            <div class="archive-card">
              <div class="archive-image" style="background-image:url('IMAGE_URL_HERE'); background-color:#ffd6d6;"></div>
              <p><strong>Most Streamed Track:</strong> TBD</p>
            </div>

          </div>
        </section>
      `;
    } else if (path === '/current') {
      const data = await getLeaderboard();
      let listHtml = '';

      if (data.length === 0) {
        listHtml = '<li>Unable to load leaderboard at this time.</li>';
      } else {
        const nameColumn = "Name"; 

        data.forEach((row, index) => {
          const name = row[nameColumn] || 'Unknown';
          const score = Number(row["Total score (35)"] || 0);
        
          // Remove @ for the URL, keep it for display
          const cleanName = name.startsWith('@') ? name.slice(1) : name;
        
          listHtml += `
            <li>
              ${index + 1}. 
              <a href="https://bandlab.com/${cleanName}" target="_blank" rel="noopener noreferrer">
                ${name}
              </a>
              — ${score} / 35 pts
            </li>
          `;
        });
      }
      pageContent = `
      <h1>Current Competition</h1>
      <p><strong>Genrecup Season 3 is underway, joins are officially closed.  
      Genrecup Season 4 will begin around June 30th 2026.</strong></p>

      <p>
        <a href="https://bandlab.com/bands/genrecup" target="_blank" rel="noopener noreferrer">
          Listen on BandLab →
        </a>
      </p>

      <p>
        <a href="https://docs.google.com/spreadsheets/d/1r4MsJ_qj9cSrpFq09CKScBnh4ZEDg-MVsF1t7GpwCdc/edit?gid=0#gid=0"
          target="_blank" 
          rel="noopener noreferrer">
          View scoring details →
        </a>
      </p>

      <section id="leaderboard">
        <h2>Live Leaderboard Round 1</h2>
        <ul id="leaderboard-list" style="list-style:none; padding:0;">
          ${listHtml}
        </ul>
      </section>
    `;

    } else if (path === '/contact') {
      pageContent = `<h1>Contact Us</h1><p>Contact information goes here...</p>`;
    } else if (path === '/admin') {
      pageContent = `<h1>Admin Board</h1><p>Admin-only information...</p>`;
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica:ital@1&display=swap" rel="stylesheet">
  <style>
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      min-height: 100vh;
      background: linear-gradient(135deg, #fadcff, #e5f3ff);
      font-family: 'IM Fell DW Pica', serif;
      font-style: italic;
      color: #3b7a54;
    }
    h1, h2, .logo-text { font-family: 'IM Fell DW Pica', serif; font-style: italic; color: #3b7a54; }
    p, section p, section a, nav a, li { font-family: "Times New Roman", Times, serif; font-style: normal; color: #5f9b78; }
    .navbar { position: fixed; top: 0; left: 0; width: 100%; height: 64px; display: flex; align-items: center; padding: 0 32px; box-sizing: border-box; z-index: 1000; }
    .navbar::before { content: ''; position: absolute; inset: 0; background: url('https://i.ibb.co/gM6QZR8f/Untitled-design-19.png') no-repeat center/cover; opacity: 0.75; z-index: 0; }
    .navbar * { position: relative; z-index: 1; }
    .logo-text { font-size: 24px; text-decoration: none; }
    .nav-links { display: flex; margin-left: auto; gap: 24px; align-items: center; }
    .nav-links a { font-family: 'IM Fell DW Pica', serif; font-style: italic; color: #3b7a54; text-decoration: none; font-size: 14px; }
    .nav-links a:hover { text-decoration: underline; }
    .dropdown { position: relative; }
    .dropdown-content { display: none; position: absolute; top: 100%; left: 0; background: rgba(193, 255, 198, 0.8); backdrop-filter: blur(5px); min-width: 150px; padding: 8px 0; border-radius: 4px; }
    .dropdown-content a { display: block; padding: 8px 16px; font-family: 'IM Fell DW Pica', serif; font-style: italic; color: #3b7a54; }
    .dropdown:hover .dropdown-content { display: block; }
    .archive-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-top: 30px; }
    .archive-card { background: #ffffffaa; border-radius: 12px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: transform 0.2s ease;}
    .archive-card:hover {transform: translateY(-5px);}
    .archive-image { width: 100%; height: 150px; background-color: #c8f7c5;border-radius: 8px; background-size: cover; background-position: center; margin-bottom: 12px;}
    .archive-card p {margin: 0;}
    .center-image { display: block; margin-left: auto; margin-right: auto; width: 90%;}
    .content { padding-top: 100px; text-align: center; display: flex; flex-direction: column; align-items: center; }
    section { width: 90%; max-width: 800px; margin-bottom: 60px; }
    #leaderboard-list { list-style: none; padding: 0; margin: 0; } /* removes bullets */
  </style>
</head>
<body>
  <header class="navbar">
    <a href="/" class="logo-text">genrecup.org</a>
    <nav class="nav-links">
      <a href="/">Home</a>
      <div class="dropdown">
        <a href="/archive">Genrecup Archive ▼</a>
        <div class="dropdown-content">
          <a href="/archive#season1">Season 1</a>
          <a href="/archive#season2">Season 2</a>
        </div>
      </div>
      <div class="dropdown">
        <a href="/about">About Us ▼</a>
        <div class="dropdown-content">
          <a href="/about#story">Our Story</a>
          <a href="/about#music">Our Music</a>
          <a href="/about#hall-of-fame">Hall of Fame</a>
        </div>
      </div>
      <a href="/current">Current Competition</a>
      <a href="/contact">Contact Us</a>
      <a href="/admin">Admin Board</a>
    </nav>
  </header>

  <main class="content">
    ${pageContent}
  </main>
</body>
</html>
`;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
