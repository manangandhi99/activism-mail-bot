from flask import Flask, jsonify, request
from waitress import serve

from error import InvalidUsage
from send import Sender

from urllib.parse import unquote


app = Flask(__name__)


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



if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)


# serve(app, host='0.0.0.0', port=3000)
