# twitter_scraper
## Description
A free method for scraping tweets, for a given user. Building upon [Chris Lever's (@sitebee)implementation](https://github.com/sitebee/TwitterScraper) by adding additional features. The tweets are scraped from Nitter, an open-source alternative of Twitter where tweets of a user could be seen historically without any login. 
 
For a detailed explanation about the motivation and implementation steps of this project check [here](https://medium.com/@mronatkaya/how-to-scrape-tweets-from-twitter-for-free-2023-7562fd8121cc).

## Downloading the Repository

```
git clone https://github.com/onatkaya/twitter_scraper.git
cd twitter_scraper
```

## Installing Dependencies

```
pip install selenium
pip install beautifulsoup4
npm install puppeteer
```

## Running "run_both" file for automatic execution of .py and .js codefiles 
### For MacOS/Linux:

IMPORTANT: Before this, do not forget to assign the Nitter URL of the user that you want to scrape its tweets of to "my_url" variable (in store_pages.py).
```
chmod +x run_both.sh

./run_both.sh
```
### For Windows:
```
run_both.bat
```

## Further Reading:
- [Chris Lever's implementation](https://github.com/sitebee/TwitterScraper)
- [Nitter - Wikipedia](https://en.wikipedia.org/wiki/Nitter)
- https://www.scrapingdog.com/blog/scrape-twitter/
- https://scrapeops.io/python-web-scraping-playbook/python-beautifulsoup-find/
- https://pypi.org/project/beautifulsoup4/
- https://pypi.org/project/selenium/
- https://techcrunch.com/2023/02/01/twitter-to-end-free-access-to-its-api/
- https://www.theverge.com/2023/5/31/23739084/twitter-elon-musk-api-policy-chilling-academic-research

Happy scraping!
