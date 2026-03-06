# GenrecupSiteFull
This is the website accessible at https://genrecup.org . 
A website I built for Genrecup, a music competition project that has been hosted since the summer of 2024.
By Arlind Zalli.

## Features
- Archive page for past seasons
- Current competition page
- Live leaderboard from Google Sheets
- Contact page
- Admin page with password protection
  
<img width="961" height="420" alt="image" src="https://github.com/user-attachments/assets/87c5a31b-38e3-4b0e-b719-191a1aadfc1a" />
<img width="940" height="622" alt="image" src="https://github.com/user-attachments/assets/f00f3ac4-bbbb-404f-a326-6989ba99390d" />
<img width="938" height="577" alt="image" src="https://github.com/user-attachments/assets/a58b616a-076c-4298-9bc7-a80cb3256309" />

## Tech Stack
- JavaScript
- HTML/CSS
- Cloudflare Workers
- Google Sheets API via OpenSheet

## Why I Built This
I wanted to build a real website for a music competition and learn how to connect frontend pages with live data. I was originally hosting a music competition, and 2 years later now, I thought it would be cool to apply my learned Javascript skills to help with real issues occuring throughout Season 1 and 2 of hosting my competition, including submission streamlining, and publicity of submissions of winners, all being previously hosted on Bandlab.

## Challenges I faced while developing
I faced many challenges, but these three were the main ones that I struggled with, or still struggle with the most:
- Creating a working www.genrecup.org link (Now works in Cloudflare)
- Creating a password box with exterior encrpyted data to prevent any sort of breach (Fixed)
- Creating a dynamic look on the front page of the site featuring all of the hottest new albums by the community (Not fixed yet)

## What I Learned
- How routing works in a Cloudflare Worker, and how to set up different aspects of a domain
- How to fetch and display live leaderboard data (Importing data from Google Sheets, I used Onesheet as well)
- How to improve website layout with CSS
- How basic authentication works for admin pages (Using Secret variables in Cloudflare in combination with JS)

## Future Improvements
- Better mobile design
- Stronger admin security
- More promotion for community music, including a front page that has recent releases
- Cleaner code structure
- Better archive visuals
