interface CapsuleCreationEmailProps {
  creatorName: string;
  accessLink: string;
}

export function capsuleCreationEmailTemplate({
  creatorName,
  accessLink,
}: CapsuleCreationEmailProps): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Capsule from DigiCapsule</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                line-height: 1.6;
                color: #9da6b9;
                background-color: #111318;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #1c1f27;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }
            .header {
                background: linear-gradient(135deg, #135bec 0%, #0d47a1 100%);
                padding: 40px 30px;
                text-align: center;
                color: #ffffff;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
                letter-spacing: -0.5px;
            }
            .header p {
                margin: 10px 0 0 0;
                font-size: 14px;
                opacity: 0.9;
            }
            .content {
                padding: 40px 30px;
            }
            .message {
                background-color: #111318;
                padding: 20px;
                border-left: 4px solid #135bec;
                margin: 25px 0;
                border-radius: 5px;
            }
            .message-text {
                font-size: 15px;
                color: #9da6b9;
                margin: 0;
            }
            .capsule-info {
                background-color: #111318;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
                border: 1px solid #3b4354;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }
            .info-label {
                font-size: 13px;
                color: #9da6b9;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .info-value {
                font-size: 14px;
                color: #ededed;
                font-weight: 500;
            }
            .cta-container {
                text-align: center;
                margin: 35px 0;
                
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #135bec 0%, #0d47a1 100%);
                color: #ffffff;
                padding: 14px 40px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                font-size: 15px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(19, 91, 236, 0.3);
            }
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(19, 91, 236, 0.4);
            }
            .footer {
                background-color: #111318;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #3b4354;
            }
            .footer-text {
                font-size: 12px;
                color: #9da6b9;
                margin: 10px 0;
            }
            .footer-link {
                color: #135bec;
                text-decoration: none;
            }
            .footer-link:hover {
                text-decoration: underline;
            }
            .divider {
                height: 1px;
                background-color: #3b4354;
                margin: 25px 0;
            }
            .highlight {
                color: #135bec;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <h1>DigiCapsule</h1>
            </div>

            <!-- Content -->
            <div class="content">
                <div class="message">
                    <p class="message-text">
                        You have been added as a receiver for a capsule created by <span class="highlight">${creatorName}</span>. 
                        Click the button below to access it.
                    </p>
                </div>

                <!-- Capsule Details -->
                <div class="capsule-info">
                    <div class="info-row">
                        <span class="info-label">Created By</span>
                        <span class="info-value">${creatorName}</span>  
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Call to Action -->
                <div class="cta-container">
                    <a href="${accessLink}" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, #135bec 0%, #0d47a1 100%); color: #ffffff !important; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; line-height: 1.1; text-align: center;">View Your Capsule</a>
                </div>

                <p style="font-size: 13px; color: #9da6b9; text-align: center; margin-top: 20px;">
                    or copy and paste this link in your browser:<br>
                    <span style="color: #135bec; word-break: break-all;">${accessLink}</span>
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p class="footer-text">
                    © ${new Date().getFullYear()} DigiCapsule. All rights reserved.
                </p>
                
                <p class="footer-text" style="font-size: 11px; margin-top: 15px; opacity: 0.7;">
                    This is an automated message. Please do not reply to this email.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}
