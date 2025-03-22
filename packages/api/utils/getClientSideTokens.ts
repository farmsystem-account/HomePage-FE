import Cookies from 'js-cookie';

export const getClientSideTokens = () => {
  return {
    accessToken: Cookies.get('accessToken') || '',
    refreshToken: Cookies.get('refreshToken') || '',
  };
};
