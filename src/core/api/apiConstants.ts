export const apiPaths = {
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}` + '/api/',
  registerUrl: 'user/register/',
  loginUrl: 'user/login/',
  changeCurrentPasswordUrl: 'user/change-password/',
  resetPasswordUrl: 'user/reset-password/',
  sendForgotPasswordEmailUrl: 'user/send-forgot-password-email/',
  getCardTemplatesUrl: 'card/templates/',
  updateContentUrl: 'card/update-content/',
};
