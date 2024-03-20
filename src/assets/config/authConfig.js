export const msalConfig = {
  auth: {
    clientId: '',
    authority: '',
  },
  cache: {
    cacheLocation: 'localStorage', 
    storeAuthStateInCookie: false, 
  },
};

// export const msalConfig = {
//   auth: {
//     clientId: '337d6f48-0b3d-471d-a18e-730b1ae28dbe',
//     authority: 'https://login.microsoftonline.com/83e00f81-46ac-4173-bd16-a26604e5b754',
//   },
//   cache: {
//     cacheLocation: 'localStorage', // This configures where your cache will be stored
//     storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
//   },
// };

export const loginRequest = {
  scopes: ['api://fce1106e-880a-499d-b611-5a235a44cc46/.default'],
};

export const loginSilentRequest = {
  scopes: ['api://fce1106e-880a-499d-b611-5a235a44cc46/.default'],
};

export const dataUserRequest = {
  scopes: ['User.Read', 'User.ReadBasic.All'],
};

export const graphConfig = {
  prod: 'http://localhost:4000/api',
  dev: 'http://localhost:4000/api',
};
