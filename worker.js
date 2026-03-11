let cachedLeaderboards = {};
let lastFetchTimes = {};
const CACHE_DURATION = 30 * 1000; // 30 seconds

function isAdminAuthenticated(request, env) {
  const cookies = parseCookies(request.headers.get('Cookie'));
  return cookies.admin_session === env.ADMIN_SESSION_TOKEN;
}

  try {
    const sheetId = '1r4MsJ_qj9cSrpFq09CKScBnh4ZEDg-MVsF1t7GpwCdc';
    const url = 'https://opensheet.elk.sh/' + sheetId + '/' + sheetName;
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
    console.error('Error fetching leaderboard:', err);
    return [];
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    const path = url.pathname;

    if (path === '/admin/login' && request.method === 'POST') {
      const formData = await request.formData();
      const username = formData.get('username');
      const password = formData.get('password');

      if (
        username === env.ADMIN_USERNAME &&
        password === env.ADMIN_PASSWORD
      ) {
        return new Response(null, {
          status: 302,
          headers: {
            'Location': '/admin',
            'Set-Cookie': `admin_session=${env.ADMIN_SESSION_TOKEN}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
          }
        });
      }

      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/admin?error=1'
        }
        });
      }

    if (path === '/admin/logout' && request.method === 'POST') {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/admin',
          'Set-Cookie': 'admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
        }
      });
    }

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
          <p>Genrecup started in June of 2024 as a makeshift music competition on Bandlab. It broke boundaries that were defined through song wars and other popular events otherwise hosted on Discord among other platforms. It took the place of the competition that values risk rather than conformity, and creativity through competition. Not only is it a competition, but it is an amalgamation of Bandlab groups and bands, come together for the beautiful game.</p>
        </section>

        <section id="music">
          <h2>Our Music</h2>
          <p>Our music in Genrecup is great and all, (accessible <a href = "ḧttps://bandlab.com/band/genrecup" target="_blank" rel="noopener noreferrer">here</a>) but the music of independent artists is thriving and present, on Bandlab, YouTube, Soundcloud, and more platforms.</p>
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
            Did you know that in season 1 of Genrecup, the competition was originally called Loficup?! 
            It was quite a time for the competition, discovering its first rulebook and participants.
          </p>

          <div class="archive-grid">
            
            <div class="archive-card" style="background-color:#d6f0ff;">
              <div class="archive-text">
                <p style="color: #8bb7faff;">15,000</p>
              </div>
              <div class="archive-subtitle">
                <p style="color: #8bb7faff;">total streams attained in Season 1</p>
              </div>
            </div>

            <div class="archive-card" style="background-color:#ffd6e8;">
              <div class="archive-text" >
                <p style="color: #fa8bfaff;">32</p>
              </div>
              <div class="archive-subtitle">
                <p style="color: #fa8bfaff;">total competitors who created songs</p>
              </div>
            </div>

            <div class="archive-card" style="background-color:#e8ffd6;">
              <div class="archive-image"
                  style="background-image:url('https://i.imgur.com/ahO1N6P.jpeg');">
              </div>
              <div class="archive-subtitle-small">
                <a href="https://www.bandlab.com/track/d4dc9c16-a244-ef11-86c3-000d3a42581b?revId=d3dc9c16-a244-ef11-86c3-000d3a42581b">Top Song: yorokobi by @qzeahsucks</a>
              </div>
            </div>

          </div>
          <img src="https://i.ibb.co/Hf7PkJzp/1st-3.png" alt="Genrecup podium Season 1" style="padding-top: 10%;" class="center-image">
        </section>

        <section id="season2">
          <h2>Season 2</h2>
          <p>
            Season 2 of Genrecup! After winning Season 1, Grootunknown became co-host 
            alongside az. Additionally, the competition expanded, being able to host duos rather than solo participation in this round
          </p>

          <div class="archive-grid">

            <div class="archive-card" style="background-color:#d6f0ff;">
              <div class="archive-text">
                <p style="color: #8bb7faff;">20,000</p>
              </div>
              <div class="archive-subtitle">
                <p style="color: #8bb7faff;">total streams attained in Season 2</p>
              </div>
            </div>

            <div class="archive-card" style="background-color:#ffd6e8;">
              <div class="archive-text" >
                <p style="color: #fa8bfaff;">64</p>
              </div>
              <div class="archive-subtitle">
                <p style="color: #fa8bfaff;">total competitors who created songs</p>
              </div>
            </div>

            <div class="archive-card" style="background-color:#e8ffd6;">
              <div class="archive-image"
                  style="background-image:url('https://i.ibb.co/jv52Lbbk/Screenshot-2026-02-25-09-29-52.png');">
              </div>
              <div class="archive-subtitle-small">
                <a href="https://www.bandlab.com/post/1b89a81522f145d9b2a5ad7f2eb781fd_2cfeaee092e0ef1188f66045bd3473c0">Top Song: take me with you by @fllse and @vortex_music_man</a>
              </div>
            </div>
          </div>
          <img src="https://i.ibb.co/DPNZ7CYm/1st-5.png" alt="Genrecup podium Season 2" style="padding-top: 10%;" class="center-image">
        </section>
      `;
    } else if (path === '/current') {
      const data = await getLeaderboard("Sheet1");
      let listHtml1 = '';
      
      const data2 = await getLeaderboard("Sheet2");
      let listHtml2 = '';

      if (data.length === 0) {
        listHtml1 = '<li>Unable to load leaderboard at this time.</li>';
      } else {
        const nameColumn = "Name"; 

        data.forEach((row, index) => {
          const name = row[nameColumn] || 'Unknown';
          const score = Number(row["Total score (35)"] || 0);
        
          // Remove @ for the URL, keep it for display
          const cleanName = name.startsWith('@') ? name.slice(1) : name;
        
          listHtml1 += `
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

      if (data2.length === 0) {
        listHtml2 = '<li>Unable to load leaderboard at this time.</li>';
      } else {
        const nameColumn = "Name"; 

        data2.forEach((row, index) => {
          const name = row[nameColumn] || 'Unknown';
          const score = Number(row["Total score (35)"] || 0);
        
          // Remove @ for the URL, keep it for display
          const cleanName = name.startsWith('@') ? name.slice(1) : name;
        
          listHtml2 += `
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
      <h1>Current Competition (Season 3)</h1>
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
          ${listHtml1}
        </ul>
        <h2>Live Leaderboard Round 2</h2>
        <ul id="leaderboard-list2" style="list-style:none; padding:0;">
          ${listHtml2}
        </ul>
      </section>
    `;

    } else if (path === '/contact') {
      pageContent = `<h1>Contact Us</h1><p>Email arlindzalli2@gmail.com for any queries related to genrecup.org or competition. Reach out to us on our socials and join the community! Click on the logos to learn more...</p>
      <div class="logo-grid">
        <a href="https://bandlab.com/band/genrecup">
          <img src="https://i.ibb.co/zHF4wgPD/Untitled-design-25.png" width="70" height="70" alt="Bandlab Link">
        </a>
        <a href="https://discord.gg/wAe3gskutb">
          <img src="https://i.ibb.co/MDQLW9Bt/Untitled-design-24.png" width="70" height="70" alt="Discord Link">
        </a>
      </div>`;
    
    } else if (path === '/admin') {
      const loggedIn = isAdminAuthenticated(request, env);
      const showError = url.searchParams.get('error') === '1';
      if (!loggedIn) {
        pageContent = `
        <h1>Admin Login</h1>
        <form method="POST" action="/admin/login" style="display:flex; flex-direction:column; gap:12px; max-width:320px; margin:0 auto;">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            required
            autocomplete="username"
            style="padding:10px; border-radius:8px; border:1px solid #b7d7c3; font-size:16px;"
          >
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            autocomplete="current-password"
            style="padding:10px; border-radius:8px; border:1px solid #b7d7c3; font-size:16px;"
          >
          <button
            type="submit"
            style="padding:10px; border:none; border-radius:8px; cursor:pointer; background:#c1ffc6; color:#3b7a54; font-size:16px;"
          >
            Login
          </button>
          ${showError ? '<p style="color:red; margin:0;">Incorrect username or password.</p>' : ''}
        </form>
        `;
      } else {
        pageContent = `
          <h1>Admin Board</h1>
          <p>Hey github! What's uppppp</p>

          <form method="POST" action="/admin/logout" style="margin-top:20px;">
            <button
              type="submit"
              style="padding:10px; border:none; border-radius:8px; cursor:pointer; background:#ffd6e8; color:#3b7a54; font-size:16px;"
            >
              Log out
            </button>
          </form>
        `;
      }
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
    .logo-grid { display: grid;grid-template-columns: repeat(2, 1fr);grid-template-rows: repeat(1, 1fr); gap: 24px;}
    .nav-links { display: flex; margin-left: auto; gap: 24px; align-items: center; }
    .nav-links a { font-family: 'IM Fell DW Pica', serif; font-style: italic; color: #3b7a54; text-decoration: none; font-size: 14px; }
    .nav-links a:hover { text-decoration: underline; }
    .dropdown { position: relative; }
    .dropdown-content { display: none; position: absolute; top: 100%; left: 0; background: rgba(193, 255, 198, 0.8); backdrop-filter: blur(5px); min-width: 150px; padding: 8px 0; border-radius: 4px; }
    .dropdown-content a { display: block; padding: 8px 16px; font-family: 'IM Fell DW Pica', serif; font-style: italic; color: #3b7a54; }
    .dropdown:hover .dropdown-content { display: block; }
    .archive-grid {display: grid;grid-template-columns: repeat(3, 1fr);gap: 24px;margin-top: 30px;}
    .archive-card {background: #ffffffaa;border-radius: 12px;padding: 16px;box-shadow: 0 4px 12px rgba(0,0,0,0.08);transition: transform 0.2s ease;aspect-ratio: 1 / 1;height: auto;overflow: hidden;display: flex;flex-direction: column;gap: 10px;}
    .archive-card:hover { transform: translateY(-5px); }
    .archive-image {width: 100%;flex: 1 1 auto;border-radius: 8px;background-size: cover;background-position: center;min-height: 0;}
    .archive-text {width: 100%;flex: 0 0 auto;border-radius: 8px;font-size: 2rem;font-family: 'IM Fell DW Pica';display: flex;align-items: center;justify-content: center;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
    .archive-subtitle,
    .archive-subtitle-small {width: 100%;flex: 0 0 auto;border-radius: 8px;font-family: 'IM Fell DW Pica';opacity: 0.65;overflow-wrap: break-word;word-wrap: break-word;text-align: center;}
    .archive-subtitle {font-size: 1rem;}
    .archive-subtitle-small {font-size: 0.8rem;}
    .archive-card p { margin: 0; }
    .center-image { display: block; margin-left: auto; margin-right: auto; width: 90%; margin-top: 30px;}
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
