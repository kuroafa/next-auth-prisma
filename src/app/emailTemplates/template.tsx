export const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meetly Real Estate Message</title>
    <style>
        /* Add your email styles here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }

        .header {
            background-color: #007BFF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .message {
            padding: 20px;
        }

        .client-name {
            font-size: 24px;
            font-weight: bold;
        }

        .message-content {
            font-size: 16px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Meetly Real Estate</h1>
            <p>Message from Your Real Estate Agent</p>
        </div>
        <div class="message">
            <p class="client-name">{name}</p>
            <p class="message-content">Message:</p>
            <p class="message-content">{message}</p>
        </div>
    </div>
</body>
</html>
`;
