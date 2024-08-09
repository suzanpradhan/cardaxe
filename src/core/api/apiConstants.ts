export const apiPaths = {
  clientBaseUrl: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
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
  getDefaultCardUrl: 'default/card/',
  updateContentUrl: 'card/update-content/',
  cardsUrl: 'cards/',
  connectUrl: 'connect/',
  getSocialInfosUrl: 'card-infos'
};
