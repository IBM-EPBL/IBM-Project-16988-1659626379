import os
import sendgrid
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
'''
message = Mail(
    from_email='gracelin008@gmail.com',
    to_emails='gracelin008@gmail.com',
    subject='Sending with Twilio SendGrid is Fun',
    html_content='<strong>and easy to do anywhere, even with Python</strong>')
try:
    sg = SendGridAPIClient(os.environ.get('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'))
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print(e.message)
        '''
sg= sendgrid.SendGridAPIClient(api_key='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')       
from_email = Email("gracelin008@gmail.com")
to_email = Email("gracelin008@gmail.com")
subject = "Connection Successful"
content = Content("text/plain", " Hurray !!! Your Order has been confirmed.Thanks for shopping with us :) ")
mail = Mail(from_email, to_email, subject, content)
response = sg.client.mail.send.post(request_body=mail.get())
print(response.status_code)
print(response.body)
print(response.headers)
