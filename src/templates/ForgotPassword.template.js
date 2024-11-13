import { appName } from '../constant/index.js';

export const forgotPasswordEmail = (otp) => {
  return `<!DOCTYPE >
  <html xmlns="http://www.w3.org/1999/xhtml">

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password</title>
    <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
  </head>
  
  <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
    <table role="presentation"
      style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
      <tbody>
        <tr>
          <td align="center" style="padding: 1rem 0.5rem; vertical-align: top; width: 100%;">
            <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
              <tbody>
                <tr>
                  <td style="padding: 40px 0px 0px;">
                    <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                      <div style="color: rgb(0, 0, 0); text-align: left;">
                        <h1 style="margin: 1rem 0; font-size:28px">${appName}</h1>
                        <p style="padding-bottom: 16px; font-size:19px">Trouble signing in?</p>
                        <p style="padding-bottom: 16px; font-size:16px">We've received a request to reset the password for this user account. Please use the below
                          code for verification</p>
                        <p style="padding-bottom: 16px"><strong style="font-size: 22px">${otp}</strong></p>
                        <p style="padding-bottom: 16px; font-size:15px">If you didn't ask to reset your password, you can ignore this email.</p>
                        <p style="padding-bottom: 16px; font-size:15px">Thanks,<br>${appName} Team</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  
  </html>`;
};
