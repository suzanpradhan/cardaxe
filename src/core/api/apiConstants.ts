export const apiPaths = {
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}` + '/api/',
  register: 'user/register/',
  login: 'user/login/',
  changeCurrentPassword: 'user/change-password/',
  resetPassword: 'user/reset-password/',
  sendForgotPasswordEmail: 'user/send-forgot-password-email/',
  getCardTemplates: 'card/templates/',
  updateContent: 'card/update-content/',
};
