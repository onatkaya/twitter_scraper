const puppeteer = require('puppeteer');
const fs = require('fs');
const filePath = 'output.txt'; 

function cleanText(text) {
    return text.replace(/[^\w\s@#.,!?]/g, '');
}

function getFormattedDate() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}`;
}


fs.readFile(filePath, 'utf8', (err, data) =>
{
  if (err)
    {
    console.error('There was a problem reading the file:', err);
    return;
    }

  const linesArray = data.split('\n');

  // Remove empty lines (if any) and validate URLs
  const validURLsArray = linesArray
    .map(line => line.trim()) // Remove leading/trailing whitespaces
    .filter(line => line !== '') // Remove empty lines
    .filter(line => {
      try {
        new URL(line); // Check if the URL is valid
        return true;
      } 
      catch (error) {
        console.error(`Invalid URL found: ${line}`);
        return false;
      }
});


(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.3');
    await page.setDefaultNavigationTimeout(600000);

    //const profiles = [
//'https://nitter.net/elonmusk', 'https://nitter.net/elonmusk?cursor=DAABCgABF_0PzOo__-kKAAIX-kDd2JdgXggAAwAAAAIAAA', 'https://nitter.net/elonmusk?cursor=DAABCgABF_0PzOo__-kKAAIX-kDd2JdgXggAAwAAAAIAAA?cursor=DAABCgABF_0P2vA__-kKAAIX-kDd2JdgXggAAwAAAAIAAA'
//    ];

    let allTweets = [];
    for (const url of validURLsArray) {
        const response = await page.goto(url);
        const statusCode = response.status();
        console.log(`HTTP Status Code for ${url}: ${statusCode}`);

        if (statusCode !== 200) {
            console.error(`Failed to access ${url}. Skipping...`);
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds before the next profile
            continue;
        }

        const tweets = await page.$$eval('.timeline-item', nodes => {
            return nodes.map(node => {
                let content = (node.querySelector('.tweet-content')?.innerText || '').replace(/\n/g, ' ').replace(/,/g, ';');
                const time = node.querySelector('.tweet-date a')?.innerText || '';
                const link = node.querySelector('.tweet-link')?.href || '';
                return { content, time, link };
            });
        });

        // Clean the tweets content after retrieving them
        //for (let tweet of tweets) {
        //    tweet.content = cleanText(tweet.content);
        //}

        allTweets = allTweets.concat(tweets.map(tweet => ({ url, ...tweet })));

        console.log(`Scraped ${tweets.length} tweets from ${url}`);
        await new Promise(resolve => setTimeout(resolve, 25000)); // Wait for 10 seconds before the next profile
    }

    await browser.close();

    allTweets.forEach(tweet => {
        console.log(`Scraping tweet from ${tweet.url}: ${tweet.content.substring(0, 50)}...`);
    });

    const csvContent = allTweets.map(tweet => `${tweet.url},${tweet.content},${tweet.time},${tweet.link}`).join('\n');
    const outputFilename = `tweets_${getFormattedDate()}.csv`;
    fs.writeFileSync(outputFilename, `URL,Content,Time,Link\n${csvContent}`);

    console.log(`Scraped a total of ${allTweets.length} tweets.`);
    console.log(`Tweets saved to ${outputFilename}`);
})();
});