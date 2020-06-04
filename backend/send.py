#!/usr/bin/env python3
import messages, recipients, smtplib, ssl, time
from getpass import getpass
from email.message import EmailMessage

class Sender():

    def get_recipients(self, state, county):
        if state != None:        
            if county != None:
                recv = recipients.get_county(state, county)
            else:
                recv = recipients.get_state(state)
        else:
            recv = recipients.get_all()
        return recv


    def send_email(self, recv, src_name, src_email, password):
        port = 465 # standard port for SMTP over SSL
        smtp_server = "smtp.gmail.com"

        num_sent = 0
        num_tries = 0
        while True:
            num_tries += 1
            try:
                # create a secure SSL context
                context = ssl.create_default_context()

                with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
                    server.login(src_email, password)
                    while recv:
                        recipient = recv.pop()
                        dst_name = recipient[0]
                        location = recipient[1]
                        dst_email = recipient[2]

                        msg = EmailMessage()

                        msg['Subject'] = messages.gen_subject()
                        msg['From'] = src_email
                        msg['To'] = dst_email
                        
                        body = messages.gen_body(src_name, dst_name, location)
                        msg.set_content(body)
                        print(msg.as_string())
                        server.send_message(msg)
                        print("Sent email")
                        num_sent += 1
                break
            except smtplib.SMTPException as E:
                print(E)
                if num_tries >= 5:
                    return -1
                    break
                print("Unexpected error... trying again in 10 seconds.")
                time.sleep(10)
        return num_sent