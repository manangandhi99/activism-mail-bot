import base64
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import mimetypes
import os
import httplib2
from apiclient.discovery import build


from oauth2client.client import AccessTokenCredentials
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
from google.auth.credentials import Credentials


from apiclient import errors

class GmailSender():

    def __init__(self, access_token):
        credentials = AccessTokenCredentials(access_token=access_token, user_agent='my-user-agent/1.0')
        http = httplib2.Http()
        http = credentials.authorize(http)
        self.gmail_service = build('gmail', 'v1', http=http)


    def send_email(self, sender_email, recipient_email, subject, message_body):
        # create the email
        message = self.__create_message(sender_email, 
            recipient_email, # reciever
            subject, #subject
            message_body) # body

        # send it, real complicated stuff
        self.__send_email(self.gmail_service, sender_email, message)


    def __send_email(self, service, user_id, message):
      """Send an email message.

      Args:
        service: Authorized Gmail API service instance.
        user_id: User's email address. The special value "me"
        can be used to indicate the authenticated user.
        message: Message to be sent.

      Returns:
        Sent Message.
      """
      try:
        message = (service.users().messages().send(userId=user_id, body=message)
                   .execute())
        print ('Message Id: %s' % message['id'])
        return message
      except errors.HttpError as error:
        print ('An error occurred: %s' % error)


    def __create_message(self, sender, to, subject, message_text):
      """Create a message for an email.

      Args:
        sender: Email address of the sender.
        to: Email address of the receiver.
        subject: The subject of the email message.
        message_text: The text of the email message.

      Returns:
        An object containing a base64url encoded email object.
      """
      message = MIMEText(message_text)
      message['to'] = to
      message['from'] = sender
      message['subject'] = subject
      raw = base64.urlsafe_b64encode(message.as_bytes())
      raw = raw.decode()
      body = {'raw': raw}
      return body