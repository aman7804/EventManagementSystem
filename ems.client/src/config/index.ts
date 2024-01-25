export enum NODE_ENV_TYPES {
    Development = "development",
    Staging = "staging",
    Production = "production",
  }
  
  const Config = {
    env: {
      NodeEnv: process.env.NODE_ENV,
      BaseUrl: process.env.REACT_APP_BASE_ENDPOINT,
    },
  };
  
  export default Config;