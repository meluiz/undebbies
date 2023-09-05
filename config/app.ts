import { Env } from 'Foundation/Core'

/*
|--------------------------------------------------------------------------
| OAuth Token
|--------------------------------------------------------------------------
|
| This variable stores the OAuth token for the Twitch Chatbot. The Chatbot's
| OAuth token is used to authenticate and authorize access to the Twitch
| account associated with the Chatbot and is publicly displayed in interactions.
|
| Be sure to keep this variable up to date to reflect the correct OAuth token
| for the Chatbot in communications with users.
|
*/
export const oauthToken: string = Env.get('TWITCH_OAUTH_TOKEN')

/*
|--------------------------------------------------------------------------
| Application Name
|--------------------------------------------------------------------------
|
| This variable stores the name of the Twitch Chatbot. The Chatbot's name
| is used to identify the Twitch account associated with the Chatbot and is
| publicly displayed in interactions.
|
| Ensure to keep this variable up to date to reflect the correct name
| of the Chatbot in communications with users.
|
*/
export const username: string = Env.get('TWITCH_USERNAME', 'undebbies')

/*
|--------------------------------------------------------------------------
| Twitch Client ID
|--------------------------------------------------------------------------
|
| This variable stores the Twitch Client ID used for authentication and
| authorization in your application.
|
| The Twitch Client ID is a unique identifier associated with your
| application, allowing it to interact with Twitch's services.
|
| Make sure to securely store and manage this Client ID, as it's a crucial
| component for connecting your application with Twitch's API.
|
*/
export const clientId: string = Env.get('TWITCH_CLIENT_ID')

/*
|--------------------------------------------------------------------------
| Twitch Client Secret
|--------------------------------------------------------------------------
|
| This variable stores the Twitch Client Secret used for authentication and
| authorization in your application.
|
| The Twitch Client Secret is a confidential token associated with your
| application, used to securely verify your application's identity when
| interacting with Twitch's services.
|
| Ensure to keep this Client Secret secure and confidential, as it's a
| critical component for authenticating your application with Twitch's API.
|
*/
export const clientSecret: string = Env.get('TWITCH_CLIENT_SECRET')

/*
|--------------------------------------------------------------------------
| Twitch Channel Name
|--------------------------------------------------------------------------
|
| This variable stores the name of the Twitch channel associated with your
| application or bot.
|
| The Twitch channel name is used to identify and interact with a specific
| Twitch channel when sending messages, performing actions, or monitoring
| events.
|
| Ensure that this variable contains the correct Twitch channel name for
| seamless communication and interaction with the designated channel.
|
*/
export const channel: string = Env.get('TWITCH_CHANNEL')
