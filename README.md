# Poya Reminder 
  Poya Reminder is a Facebook Messenger bot which notifies about upcoming Poya Dates. This is an inspiration of the website : [https://nextpoyawhen.com/](https://nextpoyawhen.com/)

## How to use
Will update this once Facebook approved the bot. Stay tuned :) 

## Technologies & Frameworks used
- Node.js v10.15.0
- ExpressJS
- Axios
- NextPoyaWhen.com API 

## Installation
1. Clone the repository
2. Install dependencies
	```
	npm install
	```
3. Create an app on  [Facebook Developer Platform](https://developers.facebook.com/apps)
4. Create and connect a Facebook page with the app & get the Page Access Token
5. Create a bot on [Dashbot Analytics](https://www.dashbot.io/) (Optional) and grab the API KEY if you need analytics
6. Rename the file ```.env.example``` to ```.env```

7. Add a Verify Token as you wish, the page access token and dashbot API Key if you created a dashbot bot to get analytics
	```
	FB_VERIFY_TOKEN = HelloPoyaBot
	FB_PAGE_ACCESS_TOKEN = thisisasamplepageaccesstoken
	PORT = 3000
	DASHBOT_API_KEY = thisisasampleapikey
	```
8. Finally, Run it 
	To locally run use:
	```
	npm run start_local
	```
	To run in a Production Server:
	```
	npm run start
	```

## Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b my-new-feature)
2.  Commit your changes (git commit -am 'Add some feature')
3.  Push to the branch (git push origin my-new-feature)
4.  Create a new Pull Request

Feel free to suggest new features, report issues and contribute :)

## Special Thanks
- To @thameera - NextPoyaWhen.com

## Credits
- NextPoyaWhen.com Repository - [https://github.com/thameera/poya](https://github.com/thameera/poya)
