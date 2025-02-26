export interface Configuration {
    application: {
      cultureInfo: string;
      autoLogoutTime: number;
    };
  
    keycloak: {
      realm: string;
      url: string;
      clientid: string;
    };
  }
  
  const state: Configuration = {
    application: {
      cultureInfo: 'en-us',
      autoLogoutTime: 10, // min
    },
    keycloak: {
      realm: '',
      url: '',
      clientid: '',
    }
  };
  
  export const useConfiguration = (): Configuration => {
    return {
      application: state.application,
      keycloak: state.keycloak,
    };
  };
  