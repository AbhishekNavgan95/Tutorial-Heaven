module.exports = PasswordReset = () => {
    return ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed Successfully</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #ddd;
            }
            .header h1 {
                margin: 0;
                color: #333;
                font-size: 24px;
            }
            .content {
                padding: 20px 0;
                text-align: center;
            }
            .content h2 {
                margin: 0 0 20px;
                color: #555;
                font-size: 20px;
            }
            .content p {
                margin: 0 0 15px;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #777;
            }
            .footer p {
                margin: 0;
                font-size: 14px;
            }
            .warning {
                margin-top: 20px;
                color: #f00;
            }
            .contact {
                margin-top: 20px;
                font-style: italic;
            }
            .contact a {
                color: #333;
                text-decoration: none;
            }
            .support-btn {
              all: unset;
              cursor: pointer;
              padding: 5px 10px;
              background-color: royalblue;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Tutorial Heaven</h1>
            </div>
            <div class="content">
                <h2>Password Changed Successfully</h2>
                <p>Your password has been changed successfully.</p>
                <p>If you did not make this change, it might indicate unauthorized access to your account. Please take immediate action to secure your account.</p>
                <div class="warning">
                    <h3><strong>Security Warning:</strong> </h3>
                    <p>If this action was not initiated by you, your account may be compromised. Contact support immediately.</p>
                </div>
                <div class="contact">
                    <p>Contact us for assistance.</p>
                    <a class="support-btn" href="mailto:abhishekfpu@gmail.com">Get in Touch</a>
                </div>
            </div>
            <div class="footer">
                <p>&copy; 2024 Tutorial Heaven. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    
  `;
  };
  