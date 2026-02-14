import * as T from 'types';

const instanceName = 'Bata';
const databaseName = 'bata_db';
const tableName = 'public.users';
const userNameColumn = 'username';
const passwordColumn = 'password';
const userTypeColumn = 'user_type';

async function main(g: T.IAMGlobal) {
  const refreshToken = g.req.body.refreshToken;

  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  g.logger.log("Processing refresh token...");

  let decoded: any;
  try {
    decoded = JSON.parse(
      Buffer.from(refreshToken.split('.')[1], 'base64').toString()
    );
    // Don't log decoded payload - it contains password
    g.logger.log("Token decoded successfully");
  } catch (err) {
    throw new Error("Invalid token format");
  }

  if (!decoded || !decoded.__amDBRequestData) {
    throw new Error("Invalid AM_DB refresh token");
  }

  const dbData = JSON.parse(decoded.__amDBRequestData);

  if (dbData.instance !== instanceName || dbData.database !== databaseName) {
    throw new Error("Token instance mismatch");
  }

  const user: any = await g.sys.db.getById({
    instance: instanceName,
    database: databaseName,
    collection: tableName,
    primaryKey: userNameColumn,
    id: dbData.u,
  });

  const userData = Array.isArray(user) ? user[0] : user;

  if (!userData) {
    throw new Error("User not found");
  }

  if (userData.active !== 'active') {
    throw new Error("User account is not active");
  }

  const adminUserName = userData[userTypeColumn];
  if (!adminUserName) {
    throw new Error("User type not assigned");
  }

  const adminUserPass = await g.sys.system.getSecret(
    'common.apiUserPasswords.' + adminUserName
  );

  if (!adminUserPass) {
    throw new Error(`AM password not found for userType: ${adminUserName}`);
  }

  g.logger.log("Regenerating tokens...");

  const outputArr = await g.sys.system.getToken([
    {
      authTokenType: T.EAuthTokenType.AM,
      authTokenAM: {
        u: adminUserName,
        p: adminUserPass
      }
    },
    {
      authTokenType: T.EAuthTokenType.AM_DB,
      authTokenAMDB: {
        instance: dbData.instance,
        database: dbData.database,
        collection: dbData.collection,
        usernameColumn: dbData.usernameColumn,
        passwordColumn: dbData.passwordColumn,
        u: dbData.u,
        p: dbData.p  // Still contains plaintext password
      }
    }
  ]);

  g.logger.log("Tokens refreshed successfully");

  return {
    amToken: outputArr[0],
    amDbToken: outputArr[1],
    user: {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      user_type: userData.user_type,
      unit_id: userData.unit_id
    }
  };
}

module.exports = main;