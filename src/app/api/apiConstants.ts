export const apiPaths = {
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}` + '/api/',
  register: 'user/register/',
  login: 'user/login/',
  changeCurrentPassword: 'user/changeCurrentPassword/',
  getCardTemplates: 'card/templates/',
  updateContent: 'card/update-content/',
};
