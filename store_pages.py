from bs4 import BeautifulSoup
from selenium import webdriver
import time

def add_next_cursor(my_url):

	driver = webdriver.Chrome()
	driver.get(my_url)
	time.sleep(5)

	resp = driver.page_source
	driver.close()

	soup=BeautifulSoup(resp,'html.parser')
	
	show_more_divs = soup.find_all("div", {"class": "show-more"})

	if len(show_more_divs) >= 2:
		profile_header = show_more_divs[1]
		cursor = profile_header.find('a').get('href')
		return cursor
	else:
		profile_header = soup.find("div",{"class":"show-more"})
		cursor = profile_header.find('a').get('href')
		return cursor


if __name__ == "__main__":
    my_list = []
    my_url  = "https://nitter.net/realDonaldTrump" # the URL that you want to extract the tweets of.
    my_list.append(my_url)

    checkpoint = True
    count = 1
    cursor = ""

    while(checkpoint == True):
    	try:
    		cursor = add_next_cursor(my_url+cursor)

    		my_list.append(my_url+cursor)
    		print(f"Page no. {count} added! -- ", my_url+cursor)
    		
    		count += 1
    	except:
    		print("Reached the end, ending the program...")
    		checkpoint = False

    my_list.pop()
    print(my_list)

    with open('output.txt', 'w') as file:
    # Iterate through the list and write each string as a line in the file
    	for string in my_list:
        	file.write(string + '\n')  # Write the string followed by a newline character

