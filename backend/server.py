import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from waitress import serve

from error import InvalidUsage
from send import Sender

from urllib.parse import unquote

from gmail import GmailSender

from google.oauth2 import id_token
from google.auth.transport import requests


app = Flask(__name__)
CORS(app)


def has_args(iterable, args):
    """Verify that all args are in the iterable."""

    try:
        return all(x in iterable for x in args)

    except TypeError:
        return False


@app.route('/', methods=['GET'])
def ping():
    return 'success'


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/sendEmail', methods=['POST'])
def send_email():

    if not has_args(request.json, ['email']):
        raise InvalidUsage('Missing email.')

    if not has_args(request.json, ['password']):
        raise InvalidUsage('Missing password.')
    
    if not has_args(request.json, ['name']):
        raise InvalidUsage('Missing name.')

    if not has_args(request.json, ['state']):
        raise InvalidUsage('Missing state.')

    if not has_args(request.json, ['county']):
        raise InvalidUsage('Missing county.')

    sender = Sender()
    
    state = request.json['state']
    county = request.json['county']
    email = unquote(request.json['email'])
    password = unquote(request.json['password'])
    print(email)
    
    recv = sender.get_recipients(state, county)
    num_sent = sender.send_email(recv, request.json['name'], email, password)
    
    
    return jsonify({'number of emails sent': num_sent})


@app.route('/gmail', methods=['POST'])
def gmail_email():
    try:
        # this flow is used for the id_token (jwt) no need for it now but could be used later
        # short way of saying i was too lazy to delete it, but not lazy enough to write all this

        # Specify the CLIENT_ID of the app that accesses the backend:
        # CLIENT_ID = os.environ.get('ACTIVISM_EMAIL_BOT_GOOGLE_CLIENT_ID')

        # print(request.args['id_token'])

        # idinfo = id_token.verify_oauth2_token(
        #     request.args['id_token'], requests.Request(), CLIENT_ID)

        # if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
        #     raise ValueError('Wrong issuer.')

        # if CLIENT_ID not in idinfo['aud']:
        #     print("clientid was not in aud field from google response")
        #     return

        # ID token is valid. Get the user's Google Account ID from the decoded token.

        # email = idinfo['email']
        # print("here is the users email: " + str(email))

        access_token = request.json['access_token']
        gmail_sender = GmailSender(access_token)

        # def send_email(sender_email, recipient_email, subject, message_body):
        gmail_sender.send_email('activismmailbot@gmail.com', 
            'activismmailbot@gmail.com', 
            'python is an ass lang', 
            'sharan likes his code like he likes his balls.... dirty')

        return 'yay'

    except ValueError:
        # Invalid token
        print("invalid login")
        return


if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)

# serve(app, host='0.0.0.0', port=3000)
