import * as T from 'types';

const instanceName = 'Bata';
const databaseName = 'bata_db';
const tableName = 'public.users';
const userNameColumn = 'username';
const passwordColumn = 'password';
const userTypeColumn = 'user_type';

async function main(g: T.IAMGlobal) {
  try {
    const username = g.req.body.username || null;
    const password = g.req.body.password || null;

    // Don't log password, even as ***
    g.logger.log('Check-user input:', { username });

    if (!username || !password) {
      g.logger.log('Missing username or password');
      return { valid: false };
    }

    const dbResult: any = await g.sys.db.getById({
      instance: instanceName,
      database: databaseName,
      collection: tableName,
      primaryKey: userNameColumn,
      id: username,
    });

    // Don't log full DB result (contains encrypted password)
    g.logger.log('User lookup completed');

    const user = Array.isArray(dbResult) ? dbResult[0] : dbResult;

    if (!user) {
      g.logger.log('User not found');
      return { valid: false };
    }

    if (user.active !== 'active') {
      g.logger.log('User not active');
      return { valid: false };
    }

    const encryptSecret = await g.sys.system.getSecret('common.secret');

    let decryptedPass: string;
    try {
      decryptedPass = await g.sys.system.decrypt(
        user[passwordColumn],
        T.EEncryptionAlgorithm.AES,
        encryptSecret
      );
      g.logger.log('Password decrypted successfully');
    } catch (e) {
      g.logger.error('Decrypt failed');
      decryptedPass = user[passwordColumn];
    }

    // Don't log passwords or comparison results
    if (String(decryptedPass) !== String(password)) {
      g.logger.log('Password mismatch');
      return { valid: false };
    }

    const adminUserName = user[userTypeColumn];
    if (!adminUserName) {
      g.logger.log('User type not assigned');
      return { valid: false };
    }

    const adminUserPass = await g.sys.system.getSecret(
      'common.apiUserPasswords.' + adminUserName
    );

    if (!adminUserPass) {
      g.logger.log(`AM password not found for userType: ${adminUserName}`);
      return { valid: false };
    }

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
          instance: instanceName,
          database: databaseName,
          collection: tableName,
          usernameColumn: userNameColumn,
          passwordColumn: passwordColumn,
          u: username,
          p: password  // Still a security issue, but unavoidable with AM_DB
        }
      }
    ]);

    g.logger.log('Login successful');
    return {
      valid: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        user_type: user.user_type,
        unit_id: user.unit_id
      },
      amToken: outputArr[0],
      amDbToken: outputArr[1]
    };

  } catch (err) {
    g.logger.error('check-user error');
    return { valid: false };
  }
}

module.exports = main;