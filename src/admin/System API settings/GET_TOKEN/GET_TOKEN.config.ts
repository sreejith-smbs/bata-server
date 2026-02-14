import * as T from 'types';

let systemApi: T.ISystemApiSettingsTypes = {
    enableCaching: false, // need to provide external redis settings from root user.
    acceptOnlyEncryptedData: false,
    apiAccessType: T.EAPIAccessType.NO_ACCESS,
    
    // No value = pickup authTokenInfo from default secret 
    // Empty Array = Only AM authorization required because we are overriding default secret's authTokenInfo
    // authTokenInfo: <T.IAuthTokenInfo[]>[],

};
module.exports = systemApi;