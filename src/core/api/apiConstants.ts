export const apiPaths = {
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}` + '/api/v1/',
  registerUrl: 'user/register/',
  loginUrl: 'user/login/',
  profileUrl: 'user/profile/',
  changeCurrentPasswordUrl: 'user/change-password/',
  resetPasswordUrl: 'user/reset-password/',
  sendForgotPasswordEmailUrl: 'user/send-forgot-password-email/',
  getCardTemplatesUrl: 'templates/',
  getCardUrl: 'cards/',
  updateContentUrl: 'card/update-content/',
  cardsUrl: 'cards/'
};
