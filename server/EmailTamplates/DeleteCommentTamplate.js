module.exports = deleteCommentTamplate = (postTitle, commentText) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333333;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #dddddd;
    }
    .header h1 {
      margin: 0;
      color: #333333;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content h2 {
      margin: 0 0 20px;
      color: #555555;
    }
    .footer {
      text-align: center;
      padding: 10px 0;
      border-top: 1px solid #dddddd;
      color: #777777;
    }
    .footer p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Tutorial Heaven</h1>
    </div>
    <div class="content">
      <h2>Comment Removed</h2>
      <p>Dear User,</p>
      <p>We regret to inform you that your comment on the post titled <strong>${postTitle}</strong> has been removed from Tutorial Heaven due to a violation of our terms and conditions.</p>
      <p><strong>Your Comment:</strong></p>
      <p>"${commentText}"</p>
      <p>If you believe this is a mistake or have any questions, please contact our support team.</p>
      <p>Thank you for your understanding.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Tutorial Heaven. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};
