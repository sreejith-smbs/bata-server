/**
 * Global API Maker context object available in custom code execution.
 * Provides access to request/response data, system utilities, logging, and shared state.
 */
export interface IAMGlobal {
    /** Request context containing headers, parameters, body, and authentication data. */
    req: IAMGlobalRequest;
    /** Response context for setting status codes, output, errors, and headers. */
    res: IAMGlobalResponse;
    /** System utilities for database operations, encryption, caching, and external API calls. */
    sys: IAMGlobalSys;
    /** Logger instance for debugging and monitoring. */
    logger: IAMGlobalLogger;
    /** Shared object for passing data between different execution contexts. */
    shared: any;
}

/**
 * Logger interface for writing diagnostic information at various severity levels.
 */
export interface IAMGlobalLogger {
    /** Log debug-level messages for detailed troubleshooting. */
    debug(...data: any[]): void;
    /** Log general informational messages. */
    log(...data: any[]): void;
    /** Log informational messages about normal application flow. */
    info(...data: any[]): void;
    /** Log warning messages for potentially harmful situations. */
    warn(...data: any[]): void;
    /** Log error messages for serious problems that need attention. */
    error(...data: any[]): void;
}

/**
 * Request context object containing all incoming request data.
 */
export interface IAMGlobalRequest {
    /** HTTP request headers. */
    headers: any;
    /** URL path and route parameters. */
    params: IBaseParams;
    /** URL query string parameters. */
    query: any;
    /** Request body payload. */
    body: any;
    /** Event-specific data for event-driven requests. */
    eventData: any;
    /** Authentication and authorization information. */
    auth: ISandboxReqAuthObj;
    /** Request metadata including URL, API category, and method. */
    reqInfo: IRequestInfo;

    /**
     * Indicates whether the request originates from an actual end user.
     * Will be `true` for direct user requests, `false` for internal code execution
     * (e.g., custom API calls, AM UI operations).
     */
    isApiRequestFromUser?: boolean;
}

/**
 * Authentication object containing tokens from various authentication providers.
 */
export interface ISandboxReqAuthObj {
    /** API Maker user authentication token. */
    authAMUser?: any;
    /** API Maker database user authentication token. */
    authAMDB?: any;

    /** Google authentication token. */
    authGoogle?: any;
    /** AWS (Amazon Web Services) authentication token. */
    authAWS?: any;
    /** Azure Active Directory authentication token. */
    authAzure?: any;
}

/**
 * Metadata about the current API request.
 */
export interface IRequestInfo {
    /** The requested URL path. */
    url: string;
    /** Category classification of the API endpoint. */
    apiCategory: EAPICategoryEnum;
    /** Detailed information about the API endpoint. */
    apiInfo: {
        /** Schema type indicating whether this is a schema-based or generated API. */
        schemaType: 'SCHEMA' | 'GEN',
        /** Unique identifier for the API endpoint. */
        id: EAPIIdEnum;
        /** Human-readable name of the API. */
        name: string;
        /** Full URL path to the API endpoint. */
        url: string;
    };
    /** HTTP request method (GET, POST, PUT, DELETE). */
    reqMethod?: ERequestMethod;
}

/**
 * Categories of API endpoints in the API Maker system.
 */
export enum EAPICategoryEnum {
    /** Database instance APIs for CRUD operations. */
    INSTANCES = 'INSTANCES',
    /** Third-party API integrations. */
    THIRD_PARTY_APIS = 'THIRD_PARTY_APIS',
    /** User-defined custom APIs. */
    CUSTOM_APIS = 'CUSTOM_APIS',
    /** Built-in system APIs for platform operations. */
    SYSTEM_APIS = 'SYSTEM_APIS',
    /** Event handlers and listeners. */
    EVENTS = 'EVENTS',
    /** Scheduled tasks and cron jobs. */
    SCHEDULERS = 'SCHEDULERS',
    /** Database migration scripts. */
    MIGRATION_SCRIPT = 'MIGRATION_SCRIPT',
    /** WebSocket connection authorization handlers. */
    WEB_SOCKET_EVENT_CAN_USER_CONNECT_CODE = 'WEB_SOCKET_EVENT_CAN_USER_CONNECT_CODE',
    /** Process initialization scripts. */
    PROCESS_INITIALIZER = 'PROCESS_INITIALIZER',
    /** Reusable utility classes and functions. */
    UTILITY_CLASS = 'UTILITY_CLASS',
}

export enum EAPIIdEnum {
    // Schema APIs
    SCHEMA_GET_ALL = 'SCHEMA_GET_ALL',
    SCHEMA_GET_ALL_STREAM = 'SCHEMA_GET_ALL_STREAM',
    SCHEMA_GET_BY_ID = 'SCHEMA_GET_BY_ID',
    SCHEMA_POST_BULK_INSERT = 'SCHEMA_POST_BULK_INSERT',
    SCHEMA_MASTER_SAVE = 'SCHEMA_MASTER_SAVE',
    SCHEMA_ARRAY_OPERATIONS = 'SCHEMA_ARRAY_OPERATIONS',
    SCHEMA_UPDATE_MANY = 'SCHEMA_UPDATE_MANY',
    SCHEMA_PUT_UPDATE_BY_ID = 'SCHEMA_PUT_UPDATE_BY_ID',
    SCHEMA_PUT_REPLACE_BY_ID = 'SCHEMA_PUT_REPLACE_BY_ID',
    SCHEMA_DEL_DELETE_BY_ID = 'SCHEMA_DEL_DELETE_BY_ID',
    SCHEMA_POST_QUERY = 'SCHEMA_POST_QUERY',
    SCHEMA_POST_QUERY_STREAM = 'SCHEMA_POST_QUERY_STREAM',
    SCHEMA_POST_QUERY_DELETE = 'SCHEMA_POST_QUERY_DELETE',
    SCHEMA_POST_AGGREGATE = 'SCHEMA_POST_AGGREGATE',
    SCHEMA_POST_COUNT = 'SCHEMA_POST_COUNT',
    SCHEMA_GET_DISTINCT = 'SCHEMA_GET_DISTINCT',
    SCHEMA_POST_DISTINCT_QUERY = 'SCHEMA_POST_DISTINCT_QUERY',

    // GEN APIs
    GEN_GET_ALL = 'GEN_GET_ALL',
    GEN_GET_ALL_STREAM = 'GEN_GET_ALL_STREAM',
    GEN_GET_BY_ID = 'GEN_GET_BY_ID',
    GEN_POST_BULK_INSERT = 'GEN_POST_BULK_INSERT',
    GEN_MASTER_SAVE = 'GEN_MASTER_SAVE',
    GEN_ARRAY_OPERATIONS = 'GEN_ARRAY_OPERATIONS',
    GEN_UPDATE_MANY = 'GEN_UPDATE_MANY',
    GEN_PUT_UPDATE_BY_ID = 'GEN_PUT_UPDATE_BY_ID',
    GEN_PUT_REPLACE_BY_ID = 'GEN_PUT_REPLACE_BY_ID',
    GEN_DEL_DELETE_BY_ID = 'GEN_DEL_DELETE_BY_ID',
    GEN_POST_QUERY = 'GEN_POST_QUERY',
    GEN_POST_QUERY_STREAM = 'GEN_POST_QUERY_STREAM',
    GEN_POST_QUERY_DELETE = 'GEN_POST_QUERY_DELETE',
    GEN_POST_AGGREGATE = 'GEN_POST_AGGREGATE',
    GEN_POST_COUNT = 'GEN_POST_COUNT',
    GEN_GET_DISTINCT = 'GEN_GET_DISTINCT',
    GEN_POST_DISTINCT_QUERY = 'GEN_POST_DISTINCT_QUERY',

    // System APIs
    EXECUTE_PLAIN_QUERY = 'EXECUTE_PLAIN_QUERY',
    ENCRYPT_DATA = 'ENCRYPT_DATA',
    DECRYPT_DATA = 'DECRYPT_DATA',
    HASH_DATA = 'HASH_DATA',
    GET_TOKEN = 'GET_TOKEN',
    CALL_EXTERNAL_API = 'CALL_EXTERNAL_API',
    GET_SECRET = 'GET_SECRET',

    GET_REDIS_KEY = 'GET_REDIS_KEY',
    SET_REDIS_KEY = 'SET_REDIS_KEY',
    REMOVE_REDIS_KEY = 'REMOVE_REDIS_KEY',
    CUSTOM_USER_CACHING = 'CUSTOM_USER_CACHING', // it is used for CRUD of user keys from system API.

    RESET_REDIS_CACHE_DB = 'RESET_REDIS_CACHE_DB',
    RESET_REDIS_CACHE_CUSTOM_APIS = 'RESET_REDIS_CACHE_CUSTOM_APIS',
    RESET_REDIS_CACHE_SYSTEM_APIS = 'RESET_REDIS_CACHE_SYSTEM_APIS',
    RESET_REDIS_CACHE_TP_APIS = 'RESET_REDIS_CACHE_TP_APIS',
    GET_TABLE_META = 'GET_TABLE_META',
    EMIT_EVENT = 'EMIT_EVENT',
    EMIT_EVENT_WS = 'EMIT_EVENT_WS',

    IS_VALID_DATA_FOR_TABLE = 'IS_VALID_DATA_FOR_TABLE',
    IS_VALID_DATA_FOR_CUSTOM_API = 'IS_VALID_DATA_FOR_CUSTOM_API',
    IS_VALID_DATA_FOR_THIRD_PARTY_API = 'IS_VALID_DATA_FOR_THIRD_PARTY_API',

    MULTI_TENANT_INSTANCE_UPDATED = 'MULTI_TENANT_INSTANCE_UPDATED',
    IS_VALID_CONNECTION_STRING = 'IS_VALID_CONNECTION_STRING',
}

/**
 * Collection of authentication information objects from various providers.
 */
export interface IAuthInfoObjects {
    /** API Maker database authentication token information. */
    authAMDBInfo?: IAuthTokenAMDB;
    /** Groups/roles assigned to the API Maker database user. */
    authAMDBGroups?: any[]; // IGroup[]

    /** Google authentication token information. */
    authGoogleInfo?: IAuthTokenGoogle;
    /** Groups/roles assigned to the Google authenticated user. */
    authGoogleGroups?: any[]; // IGroup[]
    /** AWS authentication token information. */
    authAWSInfo?: IAuthTokenAWS;
    /** Groups/roles assigned to the AWS authenticated user. */
    authAWSGroups?: any[]; // IGroup[]
    /** Azure Active Directory authentication token information. */
    authAzureInfo?: IAuthTokenAzureAD;
    /** Groups/roles assigned to the Azure authenticated user. */
    authAzureGroups?: any[]; // IGroup[]
}

/**
 * HTTP Content-Type header values.
 * Note: This is duplicated with store-types for frontend compatibility.
 */
export enum EContentType {
    /** JSON content type. */
    JSON = 'application/json',
    /** XML content type. */
    XML = 'text/xml',
    /** YAML content type. */
    YAML = 'text/yaml',
    /** Plain text content type. */
    TEXT = 'text/plain',
    /** HTML content type. */
    HTML = 'text/html',
    /** Binary/octet stream content type for file downloads. */
    OCTET_STREAM = 'application/octet-stream',
}

/**
 * HTTP request methods.
 * Note: This is duplicated with store-types for frontend compatibility.
 */
export enum ERequestMethod {
    /** HTTP GET method for retrieving resources. */
    GET = 'GET',
    /** HTTP POST method for creating resources. */
    POST = 'POST',
    /** HTTP PUT method for updating resources. */
    PUT = 'PUT',
    /** HTTP DELETE method for removing resources. */
    DELETE = 'DELETE',
}

/**
 * Base parameters common to all API requests in the system.
 */
export interface IBaseParams {
    /** API endpoint path. */
    apiPath?: string;
    /** HTTP request method. */
    reqMethod?: ERequestMethod;

    // Instance API parameters
    /** Name of the database instance. */
    instanceName?: string;

    /**
     * @deprecated Use `dbEnvironment` or `dbUser` instead.
     * Database name (deprecated field).
     */
    database?: string;
    /** Collection name (MongoDB) or table name (SQL databases). */
    collection?: string;
    /** Column/field name for operations. */
    column?: string;
    /** Document/record identifier. */
    id?: any;
    /** Primary key field name (if different from default). */
    primaryKey?: any;

    // Distinct API parameters
    /** Field name for distinct value operations. */
    field?: string;
    /** Sort order ('asc' or 'desc'). */
    order?: string;

    // Third-party API parameters
    /** Third-party API bundle name. */
    apiBundleName?: string;
    /** Third-party API version. */
    apiVersionName?: string;
    /** Third-party API name. */
    apiName?: string;
    /** Code path for the third-party API. */
    apiCodePath?: string;

    // Swagger parameters
    /** Authentication token for Swagger API access. */
    swaggerToken?: string;

    // Calculated database fields
    /**
     * Database environment name as provided by the user.
     * Will be converted to the masked database name internally.
     * @example "inventory_db"
     */
    dbEnvironment?: string;

    /**
     * Actual database name where the operation is performed.
     * This is the masked/resolved database name.
     * @example "inventory_db_dev_1"
     */
    dbUser?: string;

    /**
     * When `true`, circular reference errors will be suppressed.
     * Useful for recursive data structures.
     * @default false
     */
    noCycle?: boolean;

    /**
     * Controls whether pre-hooks and post-hooks are executed.
     * This is typically set to `true` when calling from custom API code.
     * @default true
     */
    skipHookRunning?: boolean;

    /**
     * Controls optimistic concurrency control behavior.
     * When `true`, allows update/replace/master save operations without version validation,
     * preventing errors when version fields differ.
     * @default true
     */
    skipConcurrencyControl?: boolean;

    /**
     * Type of hook being executed.
     * Used internally for instance, database, and collection hooks.
     */
    hookType?: 'pre' | 'post';

    // Multi-tenant architecture fields
    /** Username for multi-tenant database access. */
    tenantUsername?: string;
    /** Secret path for multi-tenant credentials. */
    tenantSecretPath?: string;
}

/**
 * Response context object for configuring API response data.
 */
export interface IAMGlobalResponse {
    /**
     * HTTP status code for the response.
     * @example 200, 401, 500
     */
    statusCode?: EStatusCode;

    /**
     * Content-Type header for the response.
     * @default 'application/json'
     */
    contentType?: EContentType;

    /**
     * Response data that will be sent to the client.
     * This is the main payload of the API response.
     */
    output?: any;

    /**
     * Shared object for passing data between execution contexts.
     */
    shared?: any;

    /**
     * Array of error objects to be returned to the client.
     * Populated when validation or processing errors occur.
     */
    errors?: IResponseError[];

    /**
     * Array of warning objects to be returned to the client.
     * Populated for non-critical issues that don't prevent operation completion.
     */
    warnings?: IResponseError[];

    /**
     * Custom HTTP headers to include in the response.
     */
    headers?: any;
}

/**
 * Configuration for multi-tenant database access credentials.
 */
export interface IMultiTenantSecretObj {
    /** Name of the database instance. */
    instanceName: string;
    /** Name of the database. */
    databaseName: string;
    /** Collection/table containing tenant credentials. */
    collectionName: string;
    /** Column name containing the username. */
    usernameColumn: string;
    /** Column name containing the connection string. */
    connectionStringColumn: string;

    // Oracle-specific fields
    /** Column name for Oracle database username. */
    oracleDBUsernameColumn?: string;
    /** Column name for Oracle database password. */
    oracleDBPasswordColumn?: string;
    /** Column name for Oracle database privilege level. */
    oracleDBPrivilegeColumn?: string;

    /** Query filter to identify the tenant record. */
    find: any;
}

/**
 * Data types supported by the schema system.
 */
export enum EType {
    /** String/text data type. */
    string = 'string',
    /** Numeric data type. */
    number = 'number',
    /** Boolean data type (true/false). */
    boolean = 'boolean',
    /** Date/DateTime data type. */
    date = 'date',
    /** MongoDB ObjectId data type. */
    objectId = 'objectId',

    // File upload types (used in third-party API request body)
    /** Single file upload. */
    file = 'file',
    /** Multiple file uploads. */
    files = 'files'
}

/**
 * Error types for validation and operation failures.
 */
export enum EErrorType {
    /** Required field validation error. */
    required = 'required',
    /** Minimum value validation error (for numbers/dates). */
    min = 'min',
    /** Maximum value validation error (for numbers/dates). */
    max = 'max',
    /** Minimum length validation error (for strings/arrays). */
    minLength = 'minLength',
    /** Maximum length validation error (for strings/arrays). */
    maxLength = 'maxLength',
    /** Unique constraint violation for a single field. */
    unique = 'unique',
    /** Unique constraint violation for combination of multiple fields. */
    uniqueCombination = 'uniqueCombination',
    /** Value doesn't match expected format or allowed values. */
    invalidValue = 'invalidValue',
    /** Referenced schema property/key not found. */
    schemaKeyNotFound = 'schemaKeyNotFound',
    /** Referenced schema definition not found. */
    schemaNotFound = 'schemaNotFound',
    /** Email format validation error. */
    emailNotValid = 'emailNotValid',
    /** Enumeration value validation error. */
    enumValidation = 'enumValidation',
    /** Virtual field incorrectly used in query find clause. */
    virtualFieldUsedInFind = 'virtualFieldUsedInFind',
}

// Main interfaces
export interface ISchemaType {
    [key: string]: IAnySchemaPropertyType;
}

export interface ISchemaTypeCustomApi {
    [key: string]: IAnySchemaPropertyTypeCustomApi;
}

export type IAnySchemaPropertyType = EType | [EType] | ISchemaProperty | [ISchemaProperty] | ISchemaType | [ISchemaType];
export type IAnySchemaPropertyTypeCustomApi = EType | [EType] | ISchemaPropertyCustomApi | [ISchemaPropertyCustomApi] | ISchemaTypeCustomApi | [ISchemaTypeCustomApi];

/**
 * Schema property definition with validation, conversion, and relationship configuration.
 * Remember to add new properties to ValidateDBSchema as well.
 */
export interface ISchemaProperty {
    /** Data type of the property. */
    __type?: EType;
    /** Conversion rules to apply before validation or storage. */
    conversions?: IPropertyConversion;
    /** Validation rules to enforce on the property value. */
    validations?: IPropertyValidation;

    /**
     * UI Maker specific configuration settings.
     * These settings are only applicable when UI Maker extension is installed.
     *
     * When generating default JSON for a collection from UI Maker, these settings
     * are merged with the auto-generated configuration.
     *
     * Note: These settings only affect UI generation, not runtime behavior.
     * After code generation, the system uses these settings to override default configurations.
     */
    uim?: IDBMasterConfigFormField;

    // Relationship configuration fields
    /** Target instance name for relationships (supports dot notation with _.get). */
    instance?: string;
    /** Target database name for relationships (supports dot notation with _.get). */
    database?: string;
    /** Target collection name for relationships (supports dot notation with _.get). */
    collection?: string;
    /** Target table name for relationships. */
    table?: string;

    /**
     * Target collection column/field name.
     * Eliminates the need to define t_key in deeply nested properties.
     * The value returned after nested save operations will be from this column.
     */
    column?: string;

    /**
     * Source column for virtual field deep population.
     * Specifies which column in the current table is used to generate this virtual field.
     */
    s_columnVirtualLinker?: string;

    /**
     * Target column for virtual field linking.
     * Required for columns where isVirtualField is true.
     * Specifies the column name in the target table that holds the primary key reference to this table.
     * Optional when the target table has only one column where collection/table equals this collection/table name.
     */
    t_columnVirtualLinker?: string;

    /** Indicates if this field is the primary key. */
    isPrimaryKey?: boolean;

    /**
     * Database-managed auto-increment.
     * The database system will automatically assign incremental values to this field.
     */
    isAutoIncrementByDB?: boolean;

    /**
     * API Maker-managed auto-increment.
     * API Maker will assign incremental values to this field.
     * Note: Has no effect if isAutoIncrementByDB is true.
     */
    isAutoIncrementByAM?: boolean | IIsAutoIncrementByAM;

    /**
     * API Maker-managed auto-generation.
     * API Maker will generate random values for this field based on configuration.
     * Values are only generated when not provided in the request.
     * Note: Has higher priority than isAutoIncrementByAM.
     * Note: Has no effect if isAutoIncrementByDB is true.
     */
    isAutoGenerateByAM?: IIsAutoGenerateByAM;

    /**
     * Optimistic concurrency control field.
     * When true, the system will fail update/replace operations if the value in the request
     * differs from the database value, preventing concurrent modification conflicts.
     *
     * Requirements:
     * - This field must be included in update requests (mandatory).
     * - Consider using conversions.conversionFun to generate version values automatically.
     *
     * Limitations:
     * - Does not work with SCHEMA_UPDATE_MANY API (direct batch database updates).
     *
     * Use optimistic concurrency control to maintain data integrity by preventing
     * overwriting of concurrent modifications.
     */
    isConcurrencyControlField?: boolean;

    /**
     * Virtual field indicator.
     * When true, this field doesn't exist in the actual database table but only in the schema.
     * Virtual fields enable deep population and master save operations to get/store
     * related data in a single API call.
     */
    isVirtualField?: boolean;
}

export type ISchemaPropertyCustomApi = Pick<ISchemaProperty, '__type' | 'conversions' | 'validations'>;

export interface IIsAutoIncrementByAM {
    start: number;
    step?: number; // default value will be 1
}

export interface IIsAutoGenerateByAM {
    valueGeneratorType: EValueGeneratorType;
}

export enum EValueGeneratorType {
    GUID_UUID = 'GUID_UUID',
    ObjectID = 'ObjectID',
    ULID = 'ULID',
    ShortUUID = 'ShortUUID',
}

/**
 * Property conversion rules applied before validation or database storage.
 */
export interface IPropertyConversion {
    /** Remove whitespace from the beginning of the string. */
    trimStart?: boolean;
    /** Remove whitespace from the end of the string. */
    trimEnd?: boolean;
    /** Remove whitespace from both ends of the string. */
    trim?: boolean;
    /** Convert string to lowercase. */
    toLowerCase?: boolean;
    /** Convert string to uppercase. */
    toUpperCase?: boolean;
    /** Custom conversion function for advanced transformations. */
    conversionFun?: Function;

    /**
     * Default value configuration.
     * When a property is absent from save/replace payloads, this default value is applied.
     * The default value is converted to the property's type before application.
     * Empty strings and null values are handled based on configuration flags.
     */
    defaults?: IPropertyConversionDefaults;

    /** Enable encryption for this property value. */
    encryption?: boolean | IEncryptionDescription;

    // /** Enable decryption for this property value. */
    // decryption?: boolean | IEncryptionDescription;

    /** Enable hashing for this property value. */
    hashing?: boolean | IPropertyHashing;
}

/**
 * Default value configuration for schema properties.
 */
export interface IPropertyConversionDefaults {
    /**
     * Default value to apply when property is missing.
     * This value will be converted to the property's type before assignment.
     */
    defaultValue?: any;

    /**
     * Function to generate default values dynamically.
     * Note: defaultValue has higher priority. This function is only executed when defaultValue is not present.
     */
    defaultFun?: Function;

    /**
     * When true, replaces null values with the default value.
     * @default false
     */
    shouldReplaceNullWithDefault?: boolean;

    /**
     * When true, replaces empty string values with the default value.
     * @default false
     */
    shouldReplaceEmptyStringWithDefault?: boolean;
}

export enum EIPropertyConversionDefaults {
    defaultValue = 'defaultValue',
    defaultFun = 'defaultFun',
}

/**
 * Encryption configuration for schema properties.
 */
export interface IEncryptionDescription {
    /**
     * Encryption direction.
     * @default 'DB' for encryption (when saving to database)
     * @default 'User' for decryption (when sending to user)
     */
    sendingTo?: ESendingToSchema;

    /**
     * Path to encryption algorithm within the secret object.
     * @default 'common.encryptionAlgorithm'
     */
    encryptionAlgorithm?: string;

    /**
     * Path to encryption secret within the secret object.
     * @default 'common.secret'
     */
    secret?: string;

    /**
     * Path to nonce value within the secret object.
     * @default 'common.nonce' or falls back to 'common.secret'
     */
    nonce?: string;
}

/**
 * Hashing configuration for schema properties.
 */
export interface IPropertyHashing {
    /**
     * Hashing direction.
     * @default 'DB' for hashing (when saving to database)
     * @default 'User' for verification (when sending to user)
     */
    sendingTo?: ESendingToSchema;

    /**
     * Path to hashing algorithm within the secret object.
     * @default 'common.hashingAlgorithm'
     */
    hashingAlgorithm?: string;

    /**
     * Path to hashing secret within the secret object.
     * @default 'common.secret'
     */
    secret?: string;
}

/**
 * Direction for encryption/hashing/decryption operations.
 */
export enum ESendingToSchema {
    /** Apply operation when sending data to the database. */
    DB = 'DB',
    /** Apply operation when sending data to the user. */
    USER = 'USER',
}

/**
 * Response configuration for file download operations.
 */
export interface IDownloadResponse {
    /**
     * Override the download filename.
     * @example 'report.pdf'
     */
    __am__downloadFolderFileName?: string;

    /**
     * Path to the file in the uploads folder.
     * Should typically be a unique/random identifier with the original filename.
     * @example 'my.zip' or '1234567890_document.txt'
     */
    __am__downloadFilePath?: string;

    /**
     * Single file path, array of file paths, or array of file mapping objects for zip creation.
     * When using objects, specify source file system path and destination path within archive.
     */
    __am__downloadFileOrFolderPaths?: string | string[] | { fsSource: string; archiveDestination: string }[];

    /**
     * Files or folders to delete after the download is sent to the user.
     * Paths are relative to the uploads directory.
     */
    __am__cleanupFileOrFolderPaths?: string | string[];
}

/**
 * Special parameter key names used in specific contexts.
 */
export enum ESpecialParamKeyNames {
    /**
     * Used in file upload/download for FTP, S3, and Azure operations.
     * The engine uses this to extract filename with extension for proper download handling.
     */
    path = 'path',
}

// Below interface is used in Secret Management.
export interface ISecretType {
    common?: ISecretTypeCommon; // it is general purpose secret key section.
}

export interface ISecretTypeCommon extends Pick<IAuthTokenInfoCommon, 'authTokenInfo'> {
    hashingAlgorithm?: 'SHA256'; // change in IPropertyHashing also
    nonce?: string; // if it is available, it will be used for hashing, if not available secret will be used for hashing

    encryptionAlgorithm?: 'AES' | 'RC4' | 'TRIPLEDES'; // encryptionAlgorithm  // encryptionAlgorithmDBPersist
    secret?: string; // secret // secretDBPersist

    encryptionAlgorithmFETransfer?: 'AES' | 'RC4' | 'TRIPLEDES'; // encryption algo used to decrypt data sent by FE.
    secretFETransfer?: string; // secret used to decrypt data sent by FE.
    feTransferDataValidityInSeconds?: number; // to validate value of createdAt // to (now - createdAt) > this value, means payload is invalid.

    connectionString: {
        mongodb?: string;
        mysql?: string;
        mariadb?: string;
        sqlServer?: string;
        postgreSQL?: string;
        oracle?: string;
    };
}

export interface IAuthTokenInfo {
    authTokenType?: EAuthTokenType;
    authTokenAM?: IAuthTokenAM | IRefreshTokenAM;
    authTokenAMDB?: IAuthTokenAMDB | IRefreshTokenAM;

    authTokenAWS?: IAuthTokenAWS;
    authTokenAzureAD?: IAuthTokenAzureAD;
    authTokenGoogle?: IAuthTokenGoogle;
    testObj?: any;
}

/**
 * API Maker user authentication credentials.
 */
export interface IAuthTokenAM {
    /** Username. */
    u: string;
    /** Password. */
    p: string;
    /** Token expiration time in seconds. */
    expiresInSeconds?: number;
}

export interface IRefreshTokenAM {
    refresh_token: string;
}

/**
 * API Maker database user authentication configuration.
 */
export interface IAuthTokenAMDB extends Partial<IAuthTokenAM> {
    /** Database instance name. */
    instance?: string;
    /** Database name. */
    database?: string;
    /** Collection name (MongoDB). */
    collection?: string;
    /** Table name (SQL databases). */
    table?: string;
    /** Column name containing the username. */
    usernameColumn?: string;
    /** Column name containing the password. */
    passwordColumn?: string;
    /**
     * Column tracking password change timestamp.
     * When used, the password field is not stored in the JWT token.
     * Instead, this timestamp value is included to detect password changes.
     */
    passwordChangedAtColumn?: string;

    /**
     * Column containing comma-separated group assignments.
     * Use "*" to grant access to all API user groups.
     * DB users can access APIs if they belong to at least one of the required groups.
     */
    groupsColumn?: string;
    /**
     * Number of users to load for testing purposes.
     * Controls dropdown population size during development.
     */
    countOfUsersForTesting?: number;

    /** Filter conditions for user queries. */
    condition?: any;
    /** Sort order for user list in testing dropdown. */
    sortUsersForTesting?: any;
    /** Fields to select from user records. */
    select?: any;

    /**
     * Stringified request JSON data.
     * Internal field populated by the system.
     */
    __amDBRequestData?: string;
}

/**
 * AWS Cognito authentication configuration.
 */
export interface IAuthTokenAWS extends IAuthTokenGroupsProperties {
    /** AWS Cognito User Pool identifier. */
    cognitoUserPoolId: string;
    /** AWS region where the user pool is located. */
    region: string;
    /**
     * Type of Cognito token to validate.
     * - `access`: Access token validation
     * - `id`: ID token validation
     */
    tokenUse: 'access' | 'id';
    /**
     * Token expiration duration in milliseconds.
     * @default 3600000 (1 hour)
     * @maximum 3600000
     */
    tokenExpiration: number;
}

/**
 * Azure Active Directory authentication configuration.
 */
export interface IAuthTokenAzureAD extends IAuthTokenGroupsProperties {
    /**
     * Azure AD application (client) ID.
     * Also known as client_id in OAuth terminology.
     */
    appId: string;
    /** Azure AD tenant identifier. */
    tenant: string;

    /** Expected audience claim value in the token. */
    audience: string;
    /** Expected issuer claim value in the token. */
    issuer: string;
    /** Maximum number of retry attempts for token validation. */
    maxRetries: number;
}

/**
 * Group/role assignment configuration for third-party authentication providers.
 */
export interface IAuthTokenGroupsProperties {
    /** Field name in the token containing the unique user identifier. */
    sourceFieldOfUniqueId?: string;
    /** Database configuration for retrieving user groups/roles. */
    groupsDataSource?: {
        /** Database instance name. */
        instance: string;
        /** Database name. */
        database: string;
        /** Collection name (MongoDB). */
        collection?: string;
        /** Table name (SQL databases). */
        table?: string;
        /** Column matching the unique user identifier. */
        targetFieldForUniqueId: string;
        /** Column containing group/role assignments. */
        groupsColumn: string;
        /** Fields to select from the groups table. */
        select?: any;
    };
}

/**
 * Google OAuth authentication configuration.
 */
export interface IAuthTokenGoogle extends IAuthTokenGroupsProperties {
    /** Google OAuth client ID for token validation. */
    clientId: string;
}

export interface IConnectionOptions {
    title: '', // title of the option
    text?: '', // description of the connection option
    sample?: '' // sample connection string of that option
}

/**
 * Error or warning details returned in API responses.
 */
export interface IResponseError {
    /** Error type classification. */
    type?: EErrorType;
    /** Field name where the error occurred. */
    field?: string;
    /** Human-readable error message. */
    message?: string;
    /** Suggested action to resolve the error or issue. */
    action?: string;
    /** The actual value that caused the error. */
    value?: any;
    /** HTTP status code associated with this error. */
    code?: EStatusCode;
    /** System-generated technical error message. */
    systemMessage?: string;
    /** Array index where error occurred (for batch operations). */
    dataIndex?: number;
    /** Stack trace information (may be present for debugging). */
    stack?: any;
    /** Sequence of API calls leading to this error. */
    apiCallSequence?: string[];
}

export enum EApiPaths {
    API = '/api',
    GEN = '/gen',
    SCHEMA = '/schema',
    THIRD_PARTY = '/third-party',
    THIRD_PARTY_STORE = '/third-party-store',
    CUSTOM_API = '/custom-api',
    SYSTEM_API = '/system-api',
    SITES = '/sites',

    // test--hook is hard coded in eval utils so please change that also if changing.
    TEST_HOOK = '/test--hook', // it is special url for custom api for hook to test hook code.
    ENCRYPT_DATA = '/encrypt-data',
    DECRYPT_DATA = '/decrypt-data',
    HASH_DATA = '/hash-data',
    GET_TOKEN = '/token',
    CALL_EXTERNAL_API = '/call-external-api',
    EXECUTE_PLAIN_QUERY = '/execute-plain-query', // it is special url for executing
    GET_SECRET_BY_NAME = '/get-secret-by-name', // it is special url for executing
    GET_REDIS_KEY = '/get-redis-key',
    SET_REDIS_KEY = '/set-redis-key',
    REMOVE_REDIS_KEY = '/remove-redis-key',
    RESET_REDIS_CACHE_DB = '/reset-redis-cache-db',
    RESET_REDIS_CACHE_CUSTOM_APIS = '/reset-redis-cache-custom-apis',
    RESET_REDIS_CACHE_SYSTEM_APIS = '/reset-redis-cache-system-apis',
    RESET_REDIS_CACHE_TP_APIS = '/reset-redis-cache-third-party-apis',

    GET_TABLE_META = '/get-table-meta', // get table meta data for sql databases in some common format.
    EMIT_EVENT = '/emit-event',
    EMIT_EVENT_WS = '/emit-event-ws',

    // validations
    IS_VALID_DATA_FOR_TABLE = '/is-valid-data-for-table',
    IS_VALID_DATA_FOR_CUSTOM_API = '/is-valid-data-for-custom-api',
    IS_VALID_DATA_FOR_THIRD_PARTY_API = '/is-valid-data-for-third-party-api',

    MULTI_TENANT_INSTANCE_UPDATED = '/multi-tenant-instance-updated',
    IS_VALID_CONNECTION_STRING = '/is-valid-connection-string',
}

/**
 * Query format for database operations (find, sort, pagination, etc.).
 */
export interface IQueryFormat {
    /** Filter criteria for selecting records. */
    find?: any;
    /** Join conditions for querying related tables. */
    find_join?: IFindJoinFormat[];
    /** Sort order specification. */
    sort?: any;
    /** Number of records to skip (for pagination). */
    skip?: number;
    /** Maximum number of records to return. */
    limit?: number;
    /** Fields to include or exclude in the result. */
    select?: any;
    /** Deep population configuration for nested data. */
    deep?: IApiParamsDeepFormat[] | string[] | string;
    /** Update data for bulk update operations. */
    set?: any;
    /** Group by clause for SQL queries. */
    groupBy?: any;
    /** Update data for updateMany API operations. */
    updateData?: any;
    /**
     * When true, includes total count of matching records in the response.
     * @default false
     */
    getTotalCount?: boolean;
    /** Additional custom query parameters. */
    [key: string]: any;
}

/**
 * Configuration for deep population of nested data in API responses.
 */
export interface IApiParamsDeepFormat {
    /** Source key in the current collection for relationship linking. */
    s_key: string;

    /**
     * Source column for virtual field deep population.
     * Specifies which column value is used to compare with t_keyColumnVirtualLinker in the target collection.
     */
    s_keyColumnVirtualLinker?: string;

    // Target collection/table configuration
    // t_apiPath?: string;
    /** Target instance name. */
    t_instance?: string;
    /** Target database name. */
    t_db?: string;
    /** Target collection/table name. */
    t_col?: string;
    /** Primary key of the target collection/table. */
    t_key?: string;
    /** Column in target table that holds data linking to the current table. */
    t_keyColumnVirtualLinker?: string;

    /** Nested deep population configuration. */
    deep?: IApiParamsDeepFormat[] | string[] | string;
    /** Fields to select from the populated data. */
    select?: any;

    // Advanced population features
    /** When true, populates as an array of objects; otherwise as a single object. */
    isMultiple?: boolean;
    /** Filter criteria for the populated data. */
    find?: any;
    /** Sort order for the populated data. */
    sort?: any;

    /**
     * Number of records to skip in the populated data.
     * Note: Cannot be directly supported in queries because all IDs are fetched at once.
     * Skip and limit are processed while setting multiple data.
     */
    skip?: number;

    /**
     * Maximum number of records in the populated data.
     * Note: Cannot be directly supported in queries because all IDs are fetched at once.
     * Skip and limit are processed while setting multiple data.
     */
    limit?: number;

    /**
     * Data fetching strategy for virtual fields (isVirtualField: true).
     * - `chunk`: Fetches data in chunks from database (default method with chunk size = 1000)
     * - `one_by_one`: Fetches nested data individually for each object (use when applying limit & skip with large datasets)
     */
    fetchingTechnique?: 'chunk' | 'one_by_one';

    /**
     * Configuration options for the fetching technique.
     * Only applicable when field has isVirtualField: true in schema.
     */
    fetchingTechniqueSettings?: {
        /**
         * Number of records to fetch per chunk.
         * @default 1000
         */
        chunkSize?: number;
    }
}

export interface IDeepFormat extends IApiParamsDeepFormat {
    // below is used in deep
    selectFromNextDeep?: any;
}

export interface IFindJoinFormat {
    t_instance?: string;
    t_db?: string;
    t_col: string;
    find: any;

    find_key_target?: string; // after find, put list of ids in this key of find // ex: address.country, address
    find_id_source?: string; // get ids from this source key instead of find property // ex: address.country
    sourceTablePrimaryKey?: string; // it will be present when user defines column in source/parent table schema. We will use it instead of child table primary key.
}

/**
 * Data validation rule for complex constraints.
 * Create an array of these in your schema to validate records on every update/save operation.
 */
export interface IDataValidation {
    /** Human-readable name for this validation rule. */
    name?: string;
    /** Array of field paths that participate in this validation. */
    paths: string[];
    /** Type of validation to perform. */
    type: EDataValidationType;
    /**
     * Custom error message to return when validation fails.
     * Can be a string or any object structure.
     */
    errorMessage?: string | any;
}

/**
 * Types of data validation rules.
 */
export enum EDataValidationType {
    /**
     * Super key (composite unique key) validation.
     * Ensures the combination of specified fields is unique across all records.
     * Note: All fields in the combination should be marked as required.
     */
    SUPER_KEY = 'SUPER_KEY',
}

/**
 * HTTP status codes used in API responses.
 */
export enum EStatusCode {
    /** Request succeeded. */
    OK = 200,
    /**
     * No content to return.
     * Note: Avoid using this as it prevents returning data payloads.
     */
    NO_CONTENT = 204,
    /** Resource created successfully. */
    CREATED = 201,
    /** Malformed request or invalid parameters. */
    BAD_REQUEST = 400,
    /** Authentication required or invalid credentials. */
    UNAUTHORIZED = 401,
    /** Client authenticated but lacks access permissions, or CORS error. */
    FORBIDDEN = 403,
    /**
     * Resource not found.
     * Note: 405 (Method Not Allowed) errors are converted to 404.
     */
    RESOURCE_NOT_FOUND = 404,
    /** Server encountered an unexpected error. */
    INTERNAL_SERVER_ERROR = 500,
}

/**
 * Configuration for making external API calls from backend code.
 */
export interface ICallApiFromBackend {
    /** Target API endpoint URL. */
    url: string;
    /**
     * HTTP method for the request.
     * @default 'GET'
     */
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
    /** Request timeout in milliseconds. */
    timeout?: number;
    /** Request body payload. */
    body?: any;
    /** URL query parameters. */
    queryParams?: any;
    /** HTTP request headers. */
    headers?: any;
    /** Unique identifier for this API call (useful for referencing in pre/post processing). */
    id?: string;
    /** Data transformations to apply before making the request. */
    preProcess?: ICallApiFromBackendDataProcess[];
    /** Data transformations to apply after receiving the response. */
    postProcess?: ICallApiFromBackendDataProcess[];
    /** Response data from the API call (populated after execution). */
    output?: any;
}

/**
 * Data transformation mapping for API call pre/post processing.
 */
export interface ICallApiFromBackendDataProcess {
    /**
     * Source path for data extraction.
     * @example '1.resp.id' - Get 'id' from response of API call with id='1'
     */
    from?: string;
    /**
     * Destination path for data placement.
     * @example 'body.orderId' - Set 'orderId' in request body
     */
    to?: string;
}

/**
 * Configuration for sequential or parallel API call execution.
 */
export interface ICallApiFromBackendProcess {
    /** Execution strategy for the API calls. */
    type: EApiCallType,
    /** Nested process configuration or array of API call configurations. */
    data: ICallApiFromBackendProcess | ICallApiFromBackend[];
}

/**
 * API call execution strategies.
 */
export enum EApiCallType {
    /** Execute all API calls concurrently. */
    parallel = 'parallel',
    /** Execute API calls one after another in sequence. */
    sequential = 'sequential',
}

export interface IArrayOperationBody {
    find: any;
    select?: any;
    operations: IArrayOperation[];
}

/**
 * Array operation specification for modifying array fields.
 */
export interface IArrayOperation {
    /** Type of array operation to perform. */
    operation?: EArrayOperation;
    /** Field path to the array being modified. */
    path?: string;
    /** Data to push into the array ($push operation). */
    dataToPush?: any[];
    /** Query to identify items to remove from array ($pull operation). */
    queryToRemove?: any;
    /** Array of items to remove from array ($pullAll operation). */
    dataToPull?: any[];
    /**
     * Direction for pop operation.
     * -1: Remove first element, 1: Remove last element.
     */
    direction?: -1 | 1;
    /**
     * Position for inserting data in push operation.
     * Used with $each operator when dataToPush is an array.
     */
    position?: number;
    /**
     * Number of elements to keep in array after push.
     * Must be used with $each operator.
     * Positive: Keep first N elements, Negative: Keep last N elements.
     */
    slice?: number;
    /**
     * Sort order to apply after push.
     * Must be used with $each operator.
     */
    sort?: number;
    /** Object to be used with $set operator for updating array elements. */
    dataToSet?: any;
    /**
     * Array of filter objects for identifying specific array elements.
     * Used with $set operator to conditionally update array items.
     */
    arrayFilters?: any[];
    /**
     * When true and value not found in $set operation, inserts new value.
     * @default false
     */
    upsert?: boolean;
}

/**
 * Response structure for token generation API calls.
 */
export interface IGetTokenResponse {
    /** JWT authentication token. */
    token: string;
    /** Refresh token for obtaining new access tokens. */
    refresh_token: string;
    /**
     * Token expiration time.
     * @unit seconds
     */
    expires_in: number;
}

export interface IAuthTokenInfoCommon {
    apiAccessType?: EAPIAccessType; // api level setting
    authTokenInfo?: IAuthTokenInfo[] | string; // string will point to secret path.
}

export interface IInstanceApiSettingsTypes extends IAuthTokenInfoCommon {
    enableCaching?: boolean; // collection level setting
    acceptOnlyEncryptedData?: boolean; // database & collection & api level setting
}

export type IInstanceApiSettingsTypesForAPI = Omit<IInstanceApiSettingsTypes, 'enableCaching'>;

export interface ITPApiSettingsTypes extends IAuthTokenInfoCommon {
    enableCaching?: boolean; // collection level setting
    resetCacheOnModificationOf?: string[]; // ins.db.col | api_bundle.version
    acceptOnlyEncryptedData?: boolean; // database & collection & api level setting
}

export type ITPApiSettingsTypesAPILevel = Omit<ITPApiSettingsTypes, 'enableCaching' | 'resetCacheOnModificationOf'>;

/**
 * Configuration settings for custom API endpoints.
 */
export interface ICustomApiSettingsTypes extends IAuthTokenInfoCommon {
    /** Unique name identifier for the custom API. */
    name: string;
    // label: string;
    /** URL path for accessing this API. */
    path: string;
    /** HTTP method(s) accepted by this API. */
    requestMethod: ERequestMethod;
    /** Enable response caching for this API. */
    enableCaching?: boolean;
    /**
     * Cache invalidation triggers.
     * Specifies which data changes should reset this API's cache.
     * @example ['ins.db.col', 'api_bundle.version']
     */
    resetCacheOnModificationOf?: string[];
    /** Require encrypted request payloads for this API. */
    acceptOnlyEncryptedData?: boolean;

    /** Schema definition for request body validation. */
    reqBodySchema?: ISchemaTypeCustomApi;
    /** Schema definition for query parameter validation. */
    reqQueryParametersSchema?: ISchemaTypeCustomApi;

    /**
     * Execute code on the native Node.js process instead of sandbox.
     *
     * Benefits:
     * - Faster execution (no sandbox overhead)
     * - Access to Node.js built-in packages
     * - Access to packages from api_maker_be's package.json
     * - Full access to global variable 'g'
     *
     * Limitations:
     * - Cannot use sandbox-specific packages
     *
     * ⚠️ WARNING: Use with extreme caution!
     * - Poor code can freeze the entire server
     * - May cause unexpected behavior
     * - Only use if you fully understand the implications
     *
     * @default false
     */
    runOnNativeProcess?: boolean;

    /**
     * List of all possible error messages this API can return.
     * Used for API documentation and client-side error handling.
     */
    errorList: string[];
    /** Swagger/OpenAPI documentation configuration. */
    swaggerDocs?: ISwaggerDocsObj;

    /**
     * Dedicated sandbox configuration for this API.
     * Note: Ignored when runOnNativeProcess is true.
     * Note: "Automatic Sandbox Restart In Seconds" setting is overridden by this configuration.
     */
    separateSandboxSettings?: ISeparateSandboxSettings;

    /** File upload configuration and restrictions. */
    fileUpload?: IFileUploadSettings;
}

/**
 * File upload configuration and validation rules.
 */
export interface IFileUploadSettings {
    /**
     * Enable or disable file upload functionality.
     * @default true
     */
    enable?: boolean;

    /**
     * Whitelist of form fields allowed for file uploads.
     * If specified, only these fields can receive file uploads.
     */
    allowFileUploadFields?: EFilesVariables[];

    /**
     * Field-specific validation rules for uploaded files.
     * Configure size limits and allowed file types per field.
     */
    validations?: {
        [key in EFilesVariables]?: IFileUploadSettingsValidations;
    }
}

/**
 * Validation rules for file uploads.
 */
export interface IFileUploadSettingsValidations {
    /**
     * Minimum allowed file size in bytes.
     * System throws error if uploaded file is smaller than this value.
     */
    minFileSizeBytes?: number;
    /**
     * Maximum allowed file size in bytes.
     * System throws error if uploaded file exceeds this value.
     */
    maxFileSizeBytes?: number;
    /**
     * Allowed file extensions (including the dot).
     * @example ['.png', '.jpeg', '.jpg', '.pdf']
     */
    allowedExtensionsArr?: string[];
}

/**
 * Configuration for dedicated sandbox environments.
 */
export interface ISeparateSandboxSettings {
    /**
     * Sandbox group identifier for resource sharing.
     *
     * When specified (e.g., "Sandbox_Group_1"), the system creates a dedicated sandbox
     * for this entity, independent of the global "Automatic Sandbox Restart In Seconds" setting.
     *
     * All custom APIs with the same group identifier share the same sandbox,
     * meaning all their packages are available during execution.
     *
     * @example "Sandbox_Group_1"
     */
    enableSeparateSandboxForThis?: string;

    /**
     * Custom Dockerfile for this sandbox.
     * If provided, this Dockerfile is used instead of the default "Sandbox Settings" Dockerfile.
     */
    dockerFileOfSandbox?: string;

    /**
     * Package installation configuration.
     * Only applies when enableSeparateSandboxForThis is set.
     */
    packages?: {
        /**
         * Grant access to all admin packages.
         * When true, this sandbox has access to all packages installed in the admin environment.
         * @default false
         */
        allowAllPackagesOfAdmin?: boolean;

        /**
         * Custom package list for this sandbox.
         * Only used when allowAllPackagesOfAdmin is false.
         * These packages are installed exclusively in this sandbox environment.
         */
        sandboxPackages?: {
            /** NPM package name. */
            name: string;
            /** Package version (semver format). */
            version: string;
        }[];
    }

    /**
     * Automatic restart configuration.
     * Sandbox restarts gracefully without failing any requests.
     */
    autoRestart?: {
        /**
         * Restart interval in seconds.
         * Only effective when enableSeparateSandboxForThis is set.
         * Sandbox restarts automatically after this duration from its creation.
         */
        afterTheseMuchSeconds?: number;
    }
}

/**
 * Swagger/OpenAPI documentation configuration.
 */
export interface ISwaggerDocsObj {
    /** Tag(s) for grouping this API in Swagger documentation. */
    tag?: string | string[];
    /**
     * Custom parameter definitions for Swagger documentation.
     * Useful for dynamic parameters not auto-detected from schema.
     * @example For file uploads: [{ in: 'formData', name: 'files', type: 'file' }]
     */
    parameters?: ISwaggerParametersEntity[];
}

/**
 * Swagger parameter definition.
 */
export interface ISwaggerParametersEntity {
    /** Parameter name. */
    name: string;
    /** Location of the parameter in the request. */
    in: ESwaggerParamInType;
    /** Human-readable parameter description. */
    description?: string;
    /** Whether this parameter is required. */
    required?: boolean;
    /** Format hint for the parameter value. */
    format?: string | null;
    /** Schema definition for the parameter. */
    schema?: {
        /** Data type of the parameter. */
        type: 'array' | 'object' | 'string' | 'integer' | 'boolean' | 'file';
        /** Example value for documentation. */
        example?: any,
        /** Default value if not provided. */
        default?: any;
        /** Allowed enumeration values. */
        enum?: any[];
    };
}

/**
 * Locations where parameters can be specified in HTTP requests.
 */
export enum ESwaggerParamInType {
    /** Parameter in request body. */
    body = 'body',
    /** Parameter in URL query string. */
    query = 'query',
    /** Parameter in URL path. */
    path = 'path',
    /** Parameter in HTTP headers. */
    header = 'header',
    /** Parameter in multipart form data. */
    formData = 'formData',
}

export interface ISystemApiSettingsTypes extends IAuthTokenInfoCommon {
    enableCaching?: boolean; // collection level setting
    acceptOnlyEncryptedData?: boolean; // database & collection & api level setting
}

/**
 * Supported authentication token types.
 */
export enum EAuthTokenType {
    /** API Maker native user authentication. */
    AM = 'AM',
    /** Database-backed user authentication. */
    AM_DB = 'AM_DB',
    /** Google OAuth authentication. */
    GOOGLE = 'GOOGLE',
    /** AWS Cognito authentication. */
    AWS = 'AWS',
    /** Azure Active Directory authentication. */
    AZURE = 'AZURE',
    // Future authentication providers:
    // GITHUB = 'GITHUB',
    // FACEBOOK = 'FACEBOOK',
    // TWITTER = 'TWITTER',
}

/**
 * Array modification operations for MongoDB-style array manipulations.
 */
export enum EArrayOperation {
    /** Add elements to the end of an array. */
    push = 'push',
    /** Add elements to array only if they don't already exist (prevents duplicates). */
    addToSet = 'addToSet',
    /** Remove all array elements matching a query. */
    pull = 'pull',
    /** Remove all specified values from array. */
    pullAll = 'pullAll',
    /** Remove first or last element from array. */
    pop = 'pop',
    /** Update specific array elements matching filter criteria. */
    set = 'set',
}

/**
 * Access control levels for API endpoints.
 */
export enum EAPIAccessType {
    /**
     * API is not accessible from outside.
     * Can only be invoked from custom API code and internal global "g" object.
     */
    NO_ACCESS = 'NO_ACCESS',

    /**
     * API is publicly accessible without authentication.
     * No token required to access this endpoint.
     */
    IS_PUBLIC = 'IS_PUBLIC',

    /**
     * API requires authentication token.
     * Token requirements depend on authTokenInfo configuration.
     */
    TOKEN_ACCESS = 'TOKEN_ACCESS',
}

export interface IAMGlobalSys {
    db: ICommonApisSchema;
    system: IAMGlobalSysSystem;
    cache: IAMGlobalSysCache;
}

export interface ICommonApisSchema {
    gen: ICommonApisGen;
    /**
     * => Returns [an array of objects].
     */
    getAll<T>(query: IApiParamsGetAll): Promise<T[] | null>;
    getAll<T>(query: IApiParamsGetAll, getFullResponse: boolean): Promise<IAPIResponse<T[] | null>>;

    getAllByStream<T>(query: IApiParamsGetAll, callback: (data: T) => void): Promise<void>;
    /**
     * => Returns [a single object].
     */
    getById<T>(query: IApiParamsGetById): Promise<T>;
    getById<T>(query: IApiParamsGetById, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a object] or [an array of objects].
     */
    saveSingleOrMultiple<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>): Promise<T | T[]>;
    saveSingleOrMultiple<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T | T[]>>;
    /**
     * => Returns [a object] or [an array of objects].
     */
    masterSave<T>(query: IApiParamsSave): Promise<T | T[]>;
    masterSave<T>(query: IApiParamsSave, getFullResponse: boolean): Promise<IAPIResponse<T | T[]>>;

    arrayOperations<T>(query: IArrayOperationBody & IAMGlobalBaseParams): Promise<T>;
    arrayOperations<T>(query: IArrayOperationBody & IAMGlobalBaseParams, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a single object].
     */
    updateById<T>(query: IApiParamsUpdate): Promise<T>;
    updateById<T>(query: IApiParamsUpdate, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [updatedRowsCount].
     */
    updateMany(query: IApiParamsUpdateMany): Promise<IUpdateManyAPIResponse>;
    updateMany(query: IApiParamsUpdateMany, getFullResponse: boolean): Promise<IAPIResponse<IUpdateManyAPIResponse>>;
    /**
     * => Returns [a single object].
     */
    replaceById<T>(query: IApiParamsUpdate): Promise<T>;
    replaceById<T>(query: IApiParamsUpdate, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a single object].
     */
    removeById<T>(query: IApiParamsRemove): Promise<T>;
    removeById<T>(query: IApiParamsRemove, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    removeByQuery<T>(query: Pick<IApiParamsQuery, 'instance' | 'database' | 'collection' | 'find' | 'headers'>): Promise<T>;
    removeByQuery<T>(query: Pick<IApiParamsQuery, 'instance' | 'database' | 'collection' | 'find' | 'headers'>, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [an array of objects].
     */
    query<T>(query: IApiParamsQuery): Promise<T[]>;
    query<T>(query: IApiParamsQuery, getFullResponse: boolean): Promise<IAPIResponse<T[]>>;

    queryByStream<T>(query: IApiParamsQueryStream, callback: (data: T) => void): Promise<void>;

    aggregate(query: IApiParamsAggregate): Promise<any>;
    aggregate(query: IApiParamsAggregate, getFullResponse: boolean): Promise<IAPIResponse<any>>;

    count(query: IApiParamsCount): Promise<number>;
    count(query: IApiParamsCount, getFullResponse: boolean): IAPIResponse<number>;

    distinct(query: Omit<IApiParamsDistinct, 'find'>): Promise<any[]>;
    distinct(query: Omit<IApiParamsDistinct, 'find'>, getFullResponse: boolean): Promise<IAPIResponse<any[]>>;

    distinctQuery(query: IApiParamsDistinct): Promise<any[]>;
    distinctQuery(query: IApiParamsDistinct, getFullResponse: boolean): Promise<IAPIResponse<any[]>>;
}

export interface ICommonApisGen {
    /**
     * => Returns [an array of objects].
     */
    getAllGen<T>(query: IApiParamsGetAll): Promise<T[] | null>;
    getAllGen<T>(query: IApiParamsGetAll, getFullResponse: boolean): Promise<IAPIResponse<T[] | null>>;

    getAllByStreamGen<T>(query: IApiParamsGetAll, callback: (data: T) => void): Promise<void>;
    /**
     * => Returns [a single object].
     */
    getByIdGen<T>(query: IApiParamsGetById): Promise<T>;
    getByIdGen<T>(query: IApiParamsGetById, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a object] or [an array of objects].
     */
    saveSingleOrMultipleGen<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>): Promise<T | T[]>;
    saveSingleOrMultipleGen<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T | T[]>>;
    /**
     * => Returns [a object] or [an array of objects].
     */
    masterSaveGen<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>): Promise<T | T[]>;
    masterSaveGen<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T | T[]>>;

    arrayOperationsGen<T>(query: IArrayOperationBody & IAMGlobalBaseParams): Promise<T>;
    arrayOperationsGen<T>(query: IArrayOperationBody & IAMGlobalBaseParams, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a single object].
     */
    updateByIdGen<T>(query: Omit<IApiParamsUpdate, 'skipConcurrencyControl'>): Promise<T>;
    updateByIdGen<T>(query: Omit<IApiParamsUpdate, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [updatedRowsCount].
     */
    updateManyGen(query: IApiParamsUpdateMany): Promise<IUpdateManyAPIResponse>;
    updateManyGen(query: IApiParamsUpdateMany, getFullResponse: boolean): Promise<IAPIResponse<IUpdateManyAPIResponse>>;
    /**
     * => Returns [a single object].
     */
    replaceByIdGen<T>(query: Omit<IApiParamsUpdate, 'skipConcurrencyControl'>): Promise<T>;
    replaceByIdGen<T>(query: Omit<IApiParamsUpdate, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a single object].
     */
    removeByIdGen<T>(query: IApiParamsRemove): Promise<T>;
    removeByIdGen<T>(query: IApiParamsRemove, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    removeByQueryGen<T>(query: Pick<IApiParamsQuery, 'instance' | 'database' | 'collection' | 'find'>): Promise<T>;
    removeByQueryGen<T>(query: Pick<IApiParamsQuery, 'instance' | 'database' | 'collection' | 'find'>, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [an array of objects].
     */
    queryGen<T>(query: IApiParamsQuery): Promise<T[]>;
    queryGen<T>(query: IApiParamsQuery, getFullResponse: boolean): Promise<IAPIResponse<T[]>>;

    queryByStreamGen<T>(query: IApiParamsQueryStream, callback: (data: T) => void): Promise<void>;

    aggregateGen(query: IApiParamsAggregate): Promise<any>;
    aggregateGen(query: IApiParamsAggregate, getFullResponse: boolean): Promise<IAPIResponse<any>>;

    countGen(query: IApiParamsCount): Promise<number>;
    countGen(query: IApiParamsCount, getFullResponse: boolean): IAPIResponse<number>;

    distinctGen(query: Omit<IApiParamsDistinct, 'find'>): Promise<any[]>;
    distinctGen(query: Omit<IApiParamsDistinct, 'find'>, getFullResponse: boolean): Promise<IAPIResponse<any[]>>;

    distinctQueryGen(query: IApiParamsDistinct): Promise<any[]>;
    distinctQueryGen(query: IApiParamsDistinct, getFullResponse: boolean): Promise<IAPIResponse<any[]>>;
}

export interface IAMGlobalSysSystem {
    encrypt(body: any): Promise<string>;
    encrypt(body: any, getFullResponse: boolean): Promise<string>;
    encrypt(body: any, algorithm: EEncryptionAlgorithm, pass: string): Promise<string>;
    encrypt(body: any, algorithm: EEncryptionAlgorithm, pass: string, getFullResponse: boolean): Promise<string>;

    decrypt(body: string): Promise<any>;
    decrypt(body: string, getFullResponse: boolean): Promise<string>;
    decrypt(body: string, algorithm: EEncryptionAlgorithm, pass: string): Promise<any>;
    decrypt(body: string, algorithm: EEncryptionAlgorithm, pass: string, getFullResponse: boolean): Promise<string>;

    hash(body: any): any;
    getSecret(name: string | string[], fromSecretName: string, getFullResponse: boolean): any;
    getSecret(name: string | string[], fromSecretName: string): any;
    getSecret(name: string | string[], getFullResponse: boolean): any;
    getSecret(name: string | string[]): any;
    getSecret(): any; // we can call it without any param also, in store and in tp it will return object of that part.
    callExternalApi<T>(data: ICallApiFromBackend | ICallApiFromBackend[] | ICallApiFromBackendProcess | ICallApiFromBackendProcess[] | (ICallApiFromBackend | ICallApiFromBackendProcess)[]): Promise<ICallExternalApiResp<T>>;
    callExternalApi(data: ICallApiFromBackend | ICallApiFromBackend[] | ICallApiFromBackendProcess | ICallApiFromBackendProcess[] | (ICallApiFromBackend | ICallApiFromBackendProcess)[]): Promise<ICallExternalApiResp<any>>;
    getToken(data: IAuthTokenInfo | IAuthTokenInfo[]): any;
    executeQuery(query: IExecuteQuery): any;
    /**
     * It should be used SQL based databases only.
     * In MongoDB You can just modify schema. but we can use for mongo also.
     */
    getTableMeta(data: Omit<IAMGlobalBaseParams, 'headers'>): any;
    emitEvent<D>(eventName: string, eventData?: D, executeListeners?: string[]): Promise<IEmitEvent<D>>;
    emitEventWS<D>(eventName: string, eventData?: D): Promise<void>;

    // data validation
    isValidDataForTable(data: IIsValidDataForTable): Promise<IResponseError[]>;
    isValidDataForTable(data: IIsValidDataForTable[]): Promise<IResponseError[][]>;
    isValidDataForTable(data: IIsValidDataForTable, getFullResponse: boolean): Promise<IResponseError[]>;
    isValidDataForTable(data: IIsValidDataForTable[], getFullResponse: boolean): Promise<IResponseError[][]>;

    isValidDataForCustomAPI(data: IIsValidDataForCustomAPI): Promise<IResponseError[]>;
    isValidDataForCustomAPI(data: IIsValidDataForCustomAPI[]): Promise<IResponseError[][]>;
    isValidDataForCustomAPI(data: IIsValidDataForCustomAPI, getFullResponse: boolean): Promise<IResponseError[]>;
    isValidDataForCustomAPI(data: IIsValidDataForCustomAPI[], getFullResponse: boolean): Promise<IResponseError[][]>;

    isValidDataForThirdPartyAPI(data: IIsValidDataForThirdPartyAPI): Promise<IResponseError[]>;
    isValidDataForThirdPartyAPI(data: IIsValidDataForThirdPartyAPI[]): Promise<IResponseError[][]>;
    isValidDataForThirdPartyAPI(data: IIsValidDataForThirdPartyAPI, getFullResponse: boolean): Promise<IResponseError[]>;
    isValidDataForThirdPartyAPI(data: IIsValidDataForThirdPartyAPI[], getFullResponse: boolean): Promise<IResponseError[][]>;

    multiTenantInstanceUpdated(data: IMultiTenantInstanceUpdated | IMultiTenantInstanceUpdated[]): Promise<IResponseError[]>;
    isValidConnectionString(data: IIsValidConnectionString | IIsValidConnectionString[]): Promise<IAPIResponseSmall<boolean> | IAPIResponseSmall<boolean>[]>;
}

/**
 * Supported database instance types.
 * Note: Duplicated in multiple locations ($$$$_8796864_Duplicate).
 */
export enum EInstanceType {
    /** MongoDB NoSQL database. */
    MONGO_DB = 'MONGO_DB',
    /** MySQL relational database. */
    MYSQL_DB = 'MYSQL_DB',
    /** MariaDB relational database. */
    MARIA_DB = 'MARIA_DB',
    /** Microsoft SQL Server database. */
    SQL_SERVER_DB = 'SQL_SERVER_DB',
    /** PostgreSQL relational database. */
    POSTGRE_SQL_DB = 'POSTGRE_SQL_DB',
    /** Oracle relational database. */
    ORACLE_DB = 'ORACLE_DB',
}

export interface ICallExternalApiResp<T> {
    statusCode: number;
    headers: any;
    body: T;
}

export interface IResetCacheApiFormat {
    name: string;
    tenantSecretPath?: string;
    tenantUsername?: string;
}

export interface IAMGlobalSysCache {
    getKey(name: string | string[]): any;
    setKey(name: string | ISetRedisInternalRequestObj[], value?: string, ttlSeconds?: number): any;
    removeKey(name: string | string[]): any;
    resetCacheDB(params: IResetRedisCacheDB): any;
    resetCacheCustomApis(name: string): any;
    resetCacheCustomApis(data: IResetCacheApiFormat): any;
    resetCacheSystemApis(name: string): any;
    resetCacheSystemApis(data: IResetCacheApiFormat): any;
    resetCacheThirdPartyApis(params: IResetRedisCacheTP): any;
}

export enum EEncryptionAlgorithm {
    AES = 'AES',
    RC4 = 'RC4',
    TRIPLEDES = 'TRIPLEDES',
}

export enum EHashingAlgorithms {
    SHA256 = 'SHA256',
}

export interface IThirdPartyAPIIdentity {
    apiBundleName: string; // npmPackageName // apiBundleName
    // developedByUsername: string;
    apiVersionName: string;
    name: string;
}

export interface ICollectionIdentity {
    instance: string;
    database?: string;
    collection?: string;
    table?: string;
    /**
     * If true, it will not throw cycle error.<br/>
     * true = Default in custom APIs, schedulers, third party APIs, migration scripts, test cases, because they can not call themselves.<br/>
     * false = Default in Events & pre hooks & post hooks.<br/>
     * If utility class is called from default true category like custom API, it is true, otherwise false.<br/>
     */
    noCycle?: boolean;

    /**
     * Default: true, If true, it will skip pre hook & post hook running.
     */
    skipHookRunning?: boolean;
}

export interface IAMGlobalBaseParams extends ICollectionIdentity {
    headers?: any;
}

export interface IApiParamsGetAll extends IAMGlobalBaseParams {
    queryParams?: IGetAllQueryParams;
}

export interface IGetAllQueryParams {
    find?: any;
    skip?: number;
    limit?: number;
    sort?: any;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;
    getTotalCount?: boolean;
    [key: string]: any;
}

export interface IApiParamsGetById extends IAMGlobalBaseParams {
    id: any;
    primaryKey?: string;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;
}

export interface IApiParamsSave extends IAMGlobalBaseParams {
    saveData?: any; // used to save data in db.

    /** Default true, if true, it will allow update by id & replace by id & master save without version field and it will not throw error when version is different. */
    skipConcurrencyControl?: boolean;
}

export interface IApiParamsQueryStream extends IAMGlobalBaseParams {
    find?: any;
    sort?: any;
    skip?: number;
    limit?: number;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;
    groupBy?: any; // it is used in mysql query
    updateData?: any;
}

export interface IApiParamsQuery extends IApiParamsQueryStream {
    getTotalCount?: boolean;
}

export interface IApiParamsCount extends IAMGlobalBaseParams {
    find?: any;
}

export interface IApiParamsUpdate extends IAMGlobalBaseParams {
    id?: any;
    updateData?: any; // It will be used for bulk update.
    primaryKey?: string;
    upsert?: boolean; // insert if item not available.
    returnDocument?: string; // return old doc if 'before', 'before' | 'after'
    select?: any; // to select which rows will return in response.
    deep?: IApiParamsDeepFormat[] | string[] | string;

    /** System will throw when record not found for the operation */
    throwErrorIfRecordNotFound?: boolean;

    /** Default true, if true, it will allow update by id & replace by id & master save without version field and it will not throw error when version is different. */
    skipConcurrencyControl?: boolean;
}

export interface IApiParamsUpdateMany extends IAMGlobalBaseParams {
    find: any;
    updateData: any;
}

export interface IApiParamsAggregate extends IAMGlobalBaseParams {
    aggregateQuery?: any; // It will be used for aggregate body
}

export interface IApiParamsRemove extends IAMGlobalBaseParams {
    id?: any;
    primaryKey?: string;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;

    /** System will throw when record not found for the operation */
    throwErrorIfRecordNotFound?: boolean;
}

export interface IApiParamsDistinct extends IAMGlobalBaseParams {
    distinctField: string;
    order?: 'asc' | 'desc' | any; // asc/desc/dsc , true/false, yes/no, 1/0
    find?: any; // not supported by mongoDB, and supported in SQL dbs.
}

export interface IExecuteQuery {
    instance: string;
    database?: string; // required for postgresql, mongodb only
    collection?: string; // required for mongodb only

    /**
     * You can give SQL query for SQL based databases.<br/>
     * MongoDB = You can give object which will be passed in "command" function.
     * ex: https://www.mongodb.com/docs/drivers/node/current/usage-examples/command/
     * Supported commands : https://www.mongodb.com/docs/v6.0/reference/command/
     */
    query: string | any;
    headers?: any;
}

export interface IEncryptDecryptDataRequest {
    data: string;
    algorithm?: EEncryptionAlgorithm;
    pass?: string;
}

export interface IDecryptDataFETransfer {
    dataEncFE: string;
}

export interface IDecryptDataFETransferPayload {
    data: any;
    createdAt: Date;
}

// it can be value or TTL
export interface ISetRedisInternalRequestObj {
    key: string;
    value?: string;
    ttl?: number; // in seconds
    NX?: boolean; // NX: true → ensures the key is set only if it doesn’t exist.
}

export interface IResetRedisCacheDB extends ICollectionIdentity {
}

export interface IResetRedisCacheTP {
    apiBundleName: string;
    apiVersionName?: string;
    tenantSecretPath?: string;
    tenantUsername?: string;
}

export interface IGetSecretInternalRequestBody {
    keys: string | string[];
    fromSecretName?: string;
    parentParams?: IAMGlobalBaseParams; // it will be present
}

export interface IEmitEvent<D> {
    name: string;
    eventData?: D;
    executeListeners?: string[];
    outputArr?: [{ listenerName: string; output: any; }];
    executedEvents?: IExecutedEvents;
}

export interface IEmitEventWS<D> {
    name: string;
    eventData?: D;
}

export interface IUpdateManyAPIResponse {
    /** When actual update operation happens, it has value greater than 0 */
    updatedRowsCount: number;
}

export interface IAPIResponse<T> {
    data?: T;
    totalCount?: number;
    encryptedData?: string;
    errors?: IResponseError[];
    logs?: any[];
    meta?: IAPIResponseMeta;
    stackTraceErrors?: any[];
    statusCode: EStatusCode;
    success: boolean;
    warnings?: IResponseError[];
}

export type IAPIResponseSmall<T> = Pick<IAPIResponse<T>, 'success' | 'data'> & { error?: any };

/**
 * WebSocket response format for all WS communications.
 * Provides typed responses for different WebSocket event types.
 */
export interface IWSResponse {
    /** Type of WebSocket event/response. */
    type: EWSObjectType;
    /** Typed response data based on event type. */
    response?: IWSRegisterResponse | IWSConnectedResponse | IWSUnregisterResponse | IWSNotificationResponse | IWSLocalClientDataResponse;
    /** Errors encountered during WebSocket operation. */
    errors?: IResponseError[];
}

/**
 * Response after registering WebSocket event listeners.
 * Indicates which event subscriptions succeeded or failed.
 */
export interface IWSRegisterResponse {
    /** Successfully registered event listeners. */
    validOnEvents: IWSRegisterOnEvent[];
    /** Failed event listener registrations. */
    invalidOnEvents: IWSRegisterOnEvent[];
}

/**
 * WebSocket connection status response.
 */
export interface IWSConnectedResponse {
    /** True if WebSocket connection is established. */
    connected?: boolean;
}

/**
 * Unregister event confirmation (same structure as register).
 */
export type IWSUnregisterResponse = IWSObject;

/**
 * Real-time notification response from WebSocket.
 * Triggered when subscribed events occur (database changes, API calls, etc.).
 */
export interface IWSNotificationResponse {
    /** Unique identifier of the registered event. */
    eventId: string;
    /** Type of event that triggered the notification. */
    eventType: ELocalClientSubEventType;
    /** Event payload data (structure depends on event type). */
    eventData: any;
}

/**
 * Local client data synchronization response.
 * Used for desktop/local client data exchange.
 */
export interface IWSLocalClientDataResponse {
    /** Synchronized data payload. */
    data: any;
}

export interface IAPIResponseMeta {
    executionTime?: string;
    executionTimeMS?: number;
    executionPlan?: any[]; // IMongodbExplainPlan[];
    apiAccessGroups?: IAPIAccessGroupMeta[];
    runBy?: ICodeRunByResponse[];
}

export interface ICodeRunByResponse {
    apiCategory: any; // EAPICategory enum value.
    serverId: string;
    processId: string;
    workerId: string;
    port: number;
    publishToRedis?: boolean; // true = if request received by redis.
    enableSeparateSandboxForThis: string;
    allowAllPackagesOfAdmin: boolean;
}

export interface IAPIAccessGroupMeta {
    groupId?: string;
    groupName?: string;
    hasAccess?: boolean;
}

export interface IDeleteAPIResponse {
    deletedRows: any[];
    deletedRowsCount: number;
    ids: any[];
}

export interface IExecutedEvents {
    eventNameArr: string[];
    eventNameMap: any;
}

export interface IIsValidDataForTable extends ICollectionIdentity {
    data: any;
    sendingTo?: 'SAVE' | 'UPDATE';
}

export type IIsValidDataForTable_KA = (keyof IIsValidDataForTable)[];

export enum ECustomAPIDataValidationType {
    BODY = 'BODY',
    QUERY_PARAMS = 'QUERY_PARAMS',
}

export interface IIsValidDataForCustomAPI {
    name: string;
    data: any;
    type: ECustomAPIDataValidationType;
}

export interface IIsValidDataForThirdPartyAPI extends IThirdPartyAPIIdentity {
    data: any;
    type: ECustomAPIDataValidationType;
    isArray?: boolean;
}

export interface IIsValidConnectionString {
    connectionString: string;
    instanceType: EInstanceType;

    // Oracle database fields.
    oracleDBUsername?: string;
    oracleDBPassword?: string;
    oracleDBPrivilege?: string;
}

export interface IMultiTenantInstanceUpdated {
    instanceName: string;
    username: string;
}

/**
 * WebSocket event categories for subscription.
 */
export enum EWSEventType {
    /** Database instance API events (CRUD operations). */
    INSTANCES = 'INSTANCES',
    /** Third-party API integration events. */
    THIRD_PARTY_APIS = 'THIRD_PARTY_APIS',
    /** Custom API endpoint events. */
    CUSTOM_APIS = 'CUSTOM_APIS',
    /** System-level API events. */
    SYSTEM_APIS = 'SYSTEM_APIS',
    /** Custom WebSocket events defined by users. */
    CUSTOM_WS_EVENTS = 'CUSTOM_WS_EVENTS',

    /** Local client synchronization events (desktop apps). */
    LOCAL_CLIENT_SYNC_EVENTS = 'LOCAL_CLIENT_SYNC_EVENTS',

    /** Browser client synchronization events. */
    BROWSER_CLIENT_SYNC_EVENTS = 'BROWSER_CLIENT_SYNC_EVENTS',
}

/**
 * WebSocket message/operation types.
 */
export enum EWSObjectType {
    /** Register new event listener. */
    REGISTER = 'REGISTER',
    /** Unregister existing event listener. */
    UNREGISTER = 'UNREGISTER',
    /** Connection established confirmation. */
    CONNECTED = 'CONNECTED',
    /** Unknown/unhandled message type. */
    UNKNOWN = 'UNKNOWN',
    /** Token validation request/response. */
    TOKEN_VALIDATION = 'TOKEN_VALIDATION',
    /** Event notification from server. */
    NOTIFICATION = 'NOTIFICATION',

    /** Local client data request/response. */
    LC_DATA_REQ_RES = 'LC_DATA_REQ_RES',

    /** Browser client data request/response. */
    BROWSER_DATA_REQ_RES = 'BROWSER_DATA_REQ_RES',
}

/**
 * Event sub-types for local and browser client synchronization.
 */
export enum ELocalClientSubEventType {
    /** Request all data from local client. */
    LC_SEND_ALL_DATA = 'LC_SEND_ALL_DATA',
    /** Database modification notification to local client. */
    LC_DATA_MODIFIED_IN_DATABASE = 'LC_DATA_MODIFIED_IN_DATABASE',
    /** Local file system change notification from client. */
    LC_FOLDER_CHANGED_ON_LOCAL_SYSTEM = 'LC_FOLDER_CHANGED_ON_LOCAL_SYSTEM',

    /** Database modification notification to browser client. */
    BROWSER_DATA_MODIFIED_IN_DATABASE = 'BROWSER_DATA_MODIFIED_IN_DATABASE',
    /** Git pull event notification to browser client. */
    BROWSER_GIT_PULL_HAPPENED = 'BROWSER_GIT_PULL_HAPPENED',
}

/**
 * WebSocket event subscription object.
 * Defines what events to listen for and how to handle them.
 */
export interface IWSObject {
    /** Globally unique identifier for this WebSocket client. */
    guid: string;
    /** Type of WebSocket operation (register, unregister, etc.). */
    objType: EWSObjectType;
    /** Array of events to subscribe to. */
    onEvents: IWSRegisterOnEvent[];
    /** Validated authentication tokens for API and AM users. */
    validatedTokens: {
        /** API user authentication object. */
        apiUser?: any; // IApiUser
        /** API Maker user authentication object. */
        amUser?: any; // IUser
    };
    /** Authentication object for sandbox requests. */
    auth: ISandboxReqAuthObj;
    /** Local client synchronization configuration (desktop apps). */
    localClientWSReqRes?: {
        /** Type of local client event. */
        eventType: ELocalClientSubEventType;
        /** Data about file system changes on local machine. */
        folderChangedOnLocalSystem: any;
        /** Git sync category. */
        category: any; // EGitSyncType
        /** If true, replaces all existing items in category with received items. */
        shouldReplaceAllItemsOfCategory?: boolean;
    }
}

/**
 * Partial version of IWSObject for flexible usage.
 */
export type IWSObject_P = Partial<IWSObject>;

/**
 * Configuration for a specific WebSocket event listener.
 * Defines which API events to subscribe to and what data to receive.
 */
export interface IWSRegisterOnEvent {
    /** Unique identifier for this WebSocket client (auto-assigned). */
    wsClientId?: string;
    /** Event registration ID (auto-generated by backend). */
    eventId?: string;
    /** WebSocket event record ID from IWebSocketEvents collection. */
    wsEventId?: string;
    /** Category of event to subscribe to. */
    eventType: EWSEventType;

    // Instance API filtering
    /** Database instance name. */
    instance?: string;
    /** Database name within instance. */
    database?: string;
    /** Collection name (MongoDB). */
    collection?: string;
    /** Table name (SQL databases). */
    table?: string;

    // Third-party API filtering
    /** API bundle/package name. */
    apiBundleName?: string;
    /** API version identifier. */
    apiVersion?: string;

    /** API endpoint name to monitor. */
    apiName: string;

    /** Filter condition - only receive events matching this criteria. */
    condition?: IWSCondition;
    /** Fields to include in event data (projection). */
    select?: any;
    /** If true, sends event data based on select; if false, omits eventData. */
    getEventData?: boolean;

    /** Event payload data (read-only, populated by server). */
    eventData?: any;
    /** API path from authenticated user token (auto-populated). */
    apiPath: string;
    /** Multi-tenant username (if applicable). */
    tenantUsername?: string;
}

/**
 * Partial version of IWSRegisterOnEvent for flexible usage.
 */
export type IWSRegisterOnEvent_P = Partial<IWSRegisterOnEvent>;

/**
 * Filter condition for WebSocket event subscriptions.
 * Only receive notifications when condition is met.
 */
export interface IWSCondition {
    /** Type of condition to evaluate. */
    conditionType: EWSConditionType;
    /** Condition criteria (structure depends on conditionType). */
    criteria: any;
}

/**
 * Types of conditions that can be applied to WebSocket event filtering.
 */
export enum EWSConditionType {
    /** Filter based on API response data. */
    RESPONSE = 'RESPONSE',
}

export interface ITestCaseSuccess {
    name?: string;
    testCasePass: true;
    smallTestCases?: ITestCaseResult[];
}

export interface ITestCaseFail {
    name?: string;
    testCasePass: false;
    message?: string;
    actual?: any; // variable value.
    expected?: any; // variable value should be this expected value.
    smallTestCases?: ITestCaseResult[];
    stack?: any;
    errors?: any;
}

export type ITestCaseResult = ITestCaseSuccess | ITestCaseFail; // _id is test case _id.

export interface ITestCaseSandboxCode {
    name: string;
    code: Function;

    // calculated fields while running
    smallTestCasePass?: boolean;
    error?: any; // it can be array of errors or single error. When coming from system API calls, it can be array.
}

export type ITestCaseSandboxCode_P = Partial<ITestCaseSandboxCode>;

export enum EFilesVariables {
    files = 'files',
    files1 = 'files1',
    files2 = 'files2',
    files3 = 'files3',
    files4 = 'files4',
    files5 = 'files5',
    files6 = 'files6',
    files7 = 'files7',
    files8 = 'files8',
    files9 = 'files9',
    files10 = 'files10',
    files11 = 'files11',
    files12 = 'files12',
    files13 = 'files13',
    files14 = 'files14',
    files15 = 'files15',
    files16 = 'files16',
    files17 = 'files17',
    files18 = 'files18',
    files19 = 'files19',
    files20 = 'files20',
    files21 = 'files21',
    files22 = 'files22',
    files23 = 'files23',
    files24 = 'files24',
    files25 = 'files25',
    files26 = 'files26',
    files27 = 'files27',
    files28 = 'files28',
    files29 = 'files29',
    files30 = 'files30',
    files31 = 'files31',
    files32 = 'files32',
    files33 = 'files33',
    files34 = 'files34',
    files35 = 'files35',
    files36 = 'files36',
    files37 = 'files37',
    files38 = 'files38',
    files39 = 'files39',
    files40 = 'files40',
    files41 = 'files41',
    files42 = 'files42',
    files43 = 'files43',
    files44 = 'files44',
    files45 = 'files45',
    files46 = 'files46',
    files47 = 'files47',
    files48 = 'files48',
    files49 = 'files49',
    files50 = 'files50',
}

export enum EGitSyncMode {
    SYNC_ALL = 'SYNC_ALL',
    SYNC_WITHOUT_SECRET = 'SYNC_WITHOUT_SECRET',
}

export interface IDeployUsersCodeQueryParams {
    token: string;
    secret: string;
    branch: string;
    runMigrationScripts?: 'false' | 'true';
    syncMode?: EGitSyncMode;
}

// ==== DB Master configurations Start ====

export interface IUIMakerURLQueryParams {
    /** If you provide id in URL, it will open that Id in edit mode. */
    id?: any;

    /** Default edit, It will open form in edit or view mode based on passed value. */
    'form-open-mode'?: EDBMasterGridOperationsOrder | null;

    /** name of ui page */
    'db-master-name'?: string;

    /** admin user path */
    'admin-path'?: string;

    /** true | false // If passed, master will wait until parent is done with setting its data. */
    'wait-for-parent-ready'?: string;

    /** Default: false, If true, it will print debugging logs in console */
    'show-logs'?: string;

    /** You can pass theme in URL also */
    theme?: any;
}

/**
 * Available PrimeNG themes for DB Master UI.
 * Each theme provides consistent styling across all components.
 *
 * **Theme Categories:**
 * - Bootstrap 4: Traditional Bootstrap-based themes
 * - Material Design (MD/MDC): Google Material Design themes
 * - Lara: Modern, clean PrimeNG themes (recommended)
 * - Arya: Dark mode themes with vibrant accents
 * - Saga/Vela: Classic PrimeNG themes
 * - Fluent: Microsoft Fluent Design inspired
 * - Specialized: Soho, Viva, Mira, Nano, Nova, Luna, Rhea
 */
export enum EDBMasterTheme {
    // Bootstrap 4 Themes
    BOOTSTRAP4_LIGHT_BLUE = 'bootstrap4-light-blue',
    BOOTSTRAP4_LIGHT_PURPLE = 'bootstrap4-light-purple',
    BOOTSTRAP4_DARK_BLUE = 'bootstrap4-dark-blue',
    BOOTSTRAP4_DARK_PURPLE = 'bootstrap4-dark-purple',

    // Material Design (Classic)
    MD_LIGHT_INDIGO = 'md-light-indigo',
    MD_LIGHT_DEEPPURPLE = 'md-light-deeppurple',
    MD_DARK_INDIGO = 'md-dark-indigo',
    MD_DARK_DEEPPURPLE = 'md-dark-deeppurple',

    // Material Design Components
    MDC_LIGHT_INDIGO = 'mdc-light-indigo',
    MDC_LIGHT_DEEPPURPLE = 'mdc-light-deeppurple',
    MDC_DARK_INDIGO = 'mdc-dark-indigo',
    MDC_DARK_DEEPPURPLE = 'mdc-dark-deeppurple',

    // Fluent Design
    FLUENT_LIGHT = 'fluent-light',

    // Lara Themes (Modern, Recommended)
    LARA_LIGHT_BLUE = 'lara-light-blue',
    LARA_LIGHT_INDIGO = 'lara-light-indigo',
    LARA_LIGHT_PURPLE = 'lara-light-purple',
    LARA_LIGHT_TEAL = 'lara-light-teal',
    LARA_DARK_BLUE = 'lara-dark-blue',
    LARA_DARK_INDIGO = 'lara-dark-indigo',
    LARA_DARK_PURPLE = 'lara-dark-purple',
    LARA_DARK_TEAL = 'lara-dark-teal',

    // Soho Themes
    SOHO_LIGHT = 'soho-light',
    SOHO_DARK = 'soho-dark',

    // Viva Themes
    VIVA_LIGHT = 'viva-light',
    VIVA_DARK = 'viva-dark',

    // Specialized Themes
    MIRA = 'mira',
    NANO = 'nano',

    // Saga Themes (Classic Light)
    SAGA_BLUE = 'saga-blue',
    SAGA_GREEN = 'saga-green',
    SAGA_ORANGE = 'saga-orange',
    SAGA_PURPLE = 'saga-purple',

    // Vela Themes (Classic Dark)
    VELA_BLUE = 'vela-blue',
    VELA_GREEN = 'vela-green',
    VELA_ORANGE = 'vela-orange',
    VELA_PURPLE = 'vela-purple',

    // Arya Themes (Modern Dark)
    ARYA_BLUE = 'arya-blue',
    ARYA_GREEN = 'arya-green',
    ARYA_ORANGE = 'arya-orange',
    ARYA_PURPLE = 'arya-purple',

    // Nova Themes
    NOVA = 'nova',
    NOVA_ALT = 'nova-alt',
    NOVA_ACCENT = 'nova-accent',

    // Luna Themes
    LUNA_AMBER = 'luna-amber',
    LUNA_BLUE = 'luna-blue',
    LUNA_GREEN = 'luna-green',
    LUNA_PINK = 'luna-pink',

    // Rhea Theme
    RHEA = 'rhea',
}

/**
 * Grid export format options.
 * Controls which export buttons are displayed in the toolbar.
 */
export enum EDBMasterGridExport {
    /** Export all grid data to CSV file. */
    CSV = 'CSV',
    /** Export only selected rows to CSV file. */
    CSV_SELECTED = 'CSV Selected',
    /** Export all grid data to PDF file. */
    PDF = 'PDF',
    /** Export only selected rows to PDF file. */
    PDF_SELECTED = 'PDF Selected',
}

/**
 * Data import format options.
 * Controls which import methods are available.
 */
export enum EDBMasterDataImport {
    /** Import data from CSV file with column mapping. */
    CSV = 'CSV',
}

/**
 * Complete configuration for Database Master UI pages.
 * Defines the appearance, behavior, and functionality of auto-generated CRUD interfaces.
 */
export interface IDBMasterConfig {
    /** Theme for the UI interface. */
    theme?: EDBMasterTheme;

    // Multi-tenant architecture fields
    /** Username for multi-tenant database access. */
    tenantUsername?: string;

    /**
     * Screen name used throughout the UI for user-friendly messages.
     * Provides context in success/error messages and form headers.
     * @example "Person", "Contact Details", "Product"
     * @usage "Add ${screenName}", "${screenName} saved successfully"
     */
    screenName?: string;

    /**
     * Append additional properties to the parent schema.
     * Useful for extending existing schemas without modifying the original definition.
     */
    schema?: {
        /** Target instance name. */
        instanceName: string;
        /** Target database name. */
        databaseName: string;
        /** Target collection/table name. */
        collectionName: string;
        /** Additional schema properties to merge. */
        properties: ISchemaType;
    }

    /**
     * Display theme selector control.
     * @default false
     */
    showThemeSelector?: boolean;

    /**
     * Timezone for date/time display and database queries.
     * All dates are converted to this timezone before display and database operations.
     * @default Browser timezone
     * @see {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones Timezone List}
     */
    dateTimeZone?: string;

    /**
     * Default date/time format for grid display and calendar controls.
     * Uses date-fns format syntax, automatically converted for PrimeNG calendar.
     *
     * Note: PrimeNG calendar doesn't natively support time formats,
     * but time portions are automatically appended when needed.
     *
     * @default 'dd-MM-yyyy hh:mm:ss a'
     * @see {@link https://date-fns.org/docs/format date-fns format documentation}
     */
    dateTimeFormat?: string;

    /**
     * Configuration for CRUD operations and toolbar buttons.
     */
    operations?: {
        /** Add button configuration. */
        add?: IDBMasterConfigOperation;
        /**
         * Hide confirmation dialog after successful add operation.
         * @default false
         */
        hideAddConfirmation?: boolean;
        /**
         * Hide the "Delete All" button from the toolbar.
         * @default false
         */
        hideDeleteAllButton?: boolean;
        /** Hide confirmation dialog before deleting all records. */
        hideDeleteAllConfirmation?: boolean;

        /** Visual styling for the "Delete All" button. */
        deleteAllButtonSettings?: {
            /**
             * Apply raised/elevated button style.
             * @default true
             */
            raised?: boolean;

            /**
             * PrimeNG icon class.
             * @default 'pi pi-trash'
             */
            icon?: string;

            /** Space-separated CSS class names. */
            cssClass?: string;

            /** Inline style object (Angular style binding format). */
            style?: any;

            /** Button color scheme. */
            severity?: uiMakerComponentSeverity;
        }

        /**
         * Show grid refresh button.
         * @default false
         */
        showRefreshButton?: boolean;

        /** Visual styling for the refresh button. */
        refreshButtonSettings?: {
            /**
             * Apply raised/elevated button style.
             * @default true
             */
            raised?: boolean;

            /**
             * PrimeNG icon class.
             * @default 'pi pi-sync'
             */
            icon?: string;

            /** Space-separated CSS class names. */
            cssClass?: string;

            /** Inline style object (Angular style binding format). */
            style?: any;

            /** Button color scheme. */
            severity?: uiMakerComponentSeverity;
        }

        /**
         * Order of toolbar operations.
         * Determines the visual arrangement of buttons and controls in the toolbar.
         * @default All operations in standard order
         */
        operationsOrder?: (
            EDBMasterOperationsOrder.custom_actions
            | EDBMasterOperationsOrder.delete_all
            | EDBMasterOperationsOrder.add
            | EDBMasterOperationsOrder.refresh
            | EDBMasterOperationsOrder.export
            | EDBMasterOperationsOrder.export_csv_single
            | EDBMasterOperationsOrder.import
            | EDBMasterOperationsOrder.global_search
            | EDBMasterOperationsOrder.column_selector
            | EDBMasterOperationsOrder.theme_selector)[];

        /** Custom action buttons in the toolbar. */
        customActionButtons?: IDBMasterTopLevelCustomActionButton[];

        /** Data import configuration from CSV files. */
        importData?: IDBMasterImportData;

        /** Data export configuration to CSV/PDF formats. */
        exportData?: {
            /**
             * Show export button in toolbar.
             * @default false
             */
            showExportButton?: boolean;

            /**
             * PrimeNG icon class.
             * @default 'pi pi-download'
             */
            icon?: string;

            /**
             * Apply raised/elevated button style.
             * @default true
             */
            raised?: boolean;

            /** Space-separated CSS class names. */
            cssClass?: string;

            /** Button color scheme. */
            severity?: uiMakerComponentSeverity;

            /**
             * Tooltip text on hover.
             * @default 'Export data'
             */
            tooltip?: string;

            /** Inline style object (Angular style binding format). */
            style?: any;

            /** CSV export settings. */
            csv?: {
                /**
                 * Enable CSV export.
                 * @default false
                 */
                enable?: boolean;

                /**
                 * Menu label for full export.
                 * @default 'CSV'
                 */
                labelCSV?: string;

                /**
                 * Menu label for selected rows export.
                 * @default 'CSV Selected'
                 */
                labelCSVSelected?: string;

                /**
                 * Fields to include in export.
                 * Can include hidden or calculated fields not visible in the grid.
                 */
                exportFields?: Pick<IDBMasterConfigGridField, 'path' | 'header'>[];

                /** Suggested filename for the downloaded file. */
                exportFileName?: string;
            },
            /** PDF export settings. */
            pdf?: {
                /**
                 * Enable PDF export.
                 * @default false
                 */
                enable?: boolean;

                /**
                 * Menu label for full export.
                 * @default 'PDF'
                 */
                labelPDF?: string;

                /**
                 * Menu label for selected rows export.
                 * @default 'PDF Selected'
                 */
                labelPDFSelected?: string;

                /**
                 * Fields to include in export.
                 * Can include hidden or calculated fields not visible in the grid.
                 */
                exportFields?: Pick<IDBMasterConfigGridField, 'path' | 'header'>[];

                /** Suggested filename for the downloaded file. */
                exportFileName?: string;

                /** Title text displayed in the PDF document. */
                pdfContentTitle?: string;
            }
        }

        /**
         * Show single-record CSV export button.
         * @default false
         */
        showExportCSVSingleButton?: boolean;

        /** Visual styling for single CSV export button. */
        showExportCSVSingleButtonSettings?: {
            /**
             * Apply raised/elevated button style.
             * @default true
             */
            raised?: boolean;

            /**
             * PrimeNG icon class.
             * @default 'pi pi-sync'
             */
            icon?: string;

            /** Space-separated CSS class names. */
            cssClass?: string;

            /** Inline style object (Angular style binding format). */
            style?: any;

            /** Button color scheme. */
            severity?: uiMakerComponentSeverity;
        }
    };
    /**
     * External JavaScript and CSS library CDN URLs.
     * Libraries are loaded in the order specified.
     */
    externalLibs?: {
        /** CSS file URLs to load. */
        css?: string[],
        /** JavaScript file URLs to load. */
        js?: string[],
    },
    /**
     * Load predefined UI Maker style packages.
     * These are pre-configured style sets provided by the UI Maker system.
     */
    loadUiMakerStyleNames?: string[],

    /**
     * Inline CSS code blocks injected into the page.
     * Each block is added to the page's <head> section.
     */
    cssCode?: {
        /** Where to inject the CSS code. */
        runOn: 'header',
        /** CSS code to inject. */
        code: string,
    }[],

    /**
     * Custom JavaScript code execution configuration.
     * Enables advanced customization of UI behavior and data processing.
     */
    jsCode?: {
        /**
         * Execution context for the code:
         *
         * - `oncePageLoad`: Runs once on page load, appended to page script tag.
         *   Config and global data are NOT available.
         *
         * - `oncePageLoadWithContext`: Runs once on page load with full context.
         *   Available: (config, globalData, utils, queryParams)
         *
         * - `gridRender`: Executes every time grid receives data.
         *   Available: (gridEvent, gridData, globalData, utils, queryParams)
         *
         * - `modifyGridRequest`: Modify API request before fetching grid data.
         *   Available: (gridEvent, reqBody: IQueryFormat, globalData, utils, queryParams)
         *
         * - `preSaveAndEdit`: Execute before save/edit/import operations.
         *   Modify data before database operations.
         *   Available: (reqBody, globalData, utils, queryParams, mode: 'save'|'edit'|'import')
         *
         * - `beforeSaveModalOpen`: Modify data before save modal appears.
         *   Available: (formData, globalData, utils, queryParams)
         *
         * - `beforeEditModalOpen`: Modify data before edit modal appears.
         *   Available: (formData, globalData, utils, queryParams)
         */
        appendTo: EDBMasterConfigAppendTo,
        /**
         * JavaScript code or function to execute.
         *
         * Can be a string or function that returns a value.
         *
         * @example
         * // Async promise for long-running tasks
         * new Promise(async (resolve, reject) => {
         *     await new Promise(r => setTimeout(r, 3000));
         *     gridData[0].name = 'Sample data';
         *     resolve();
         * });
         *
         * @example
         * // Direct data modification
         * gridData[0].name = 'Sample data';
         *
         * @example
         * // Return function
         * (function setData() {
         *     gridData[0].name = 'Sample data';
         * });
         */
        code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
    }[],
    /**
     * Grid (data table) configuration and behavior.
     */
    grid?: {
        /** Grid header/title text. */
        header?: string;

        /**
         * Template for pagination info display.
         * Variables: {first}, {last}, {totalRecords}
         * @example "Showing {first} to {last} of {totalRecords} entries"
         */
        currentPageReportTemplate?: string;

        /**
         * Show column visibility selector.
         * @default false
         */
        showColumnSelector?: boolean;

        /**
         * Minimum width for the grid.
         * @default '50rem'
         */
        minWidth?: string;

        /**
         * Responsive breakpoint for mobile view.
         * @default '40rem'
         */
        breakpoint?: string;

        /**
         * Field path containing array data for nested grids.
         * Required only for nested grid configurations.
         */
        dataFieldPath?: string;

        /**
         * Row-level operation configurations (edit, delete, view, custom actions).
         */
        operations?: {
            /** Delete operation configuration and API overrides. */
            delete?: Omit<IDBMasterConfigOperation, 'label'> & {
                /** Override delete many API call configuration. */
                apiCallOverridesDeleteMany?: IDBMasterAPICallOverrides;
            };
            /** Edit operation configuration and API overrides. */
            edit?: Omit<IDBMasterConfigOperation, 'label'> & {
                /** Override get by ID API call configuration. */
                apiCallOverridesGetById?: IDBMasterAPICallOverrides;
            };
            /** View operation configuration and API overrides. */
            view?: Omit<IDBMasterConfigOperation, 'label'> & {
                /** Override get by ID API call configuration. */
                apiCallOverridesGetById?: IDBMasterAPICallOverrides;
            };

            /** Hide confirmation dialog before deleting a record. */
            hideDeleteConfirmation?: boolean;
            /** Hide confirmation dialog before editing a record. */
            hideEditConfirmation?: boolean;
            /**
             * Hide success message after bulk delete operations.
             * When true, you must provide success feedback manually.
             * @default false
             */
            hideDeleteManySuccessMessage?: boolean;

            /**
             * Disable double-click to edit functionality.
             * @default false
             */
            disableDoubleClickForEdit?: boolean;
            /**
             * Disable delete button click functionality.
             * @default false
             */
            disableDeleteButtonClickForDelete?: boolean;

            /**
             * Order of action buttons in the grid row.
             * Maximum 3 operations: delete, edit, view, custom.
             */
            gridOperationsOrder?: (EDBMasterGridOperationsOrder.delete | EDBMasterGridOperationsOrder.edit | EDBMasterGridOperationsOrder.view | EDBMasterGridOperationsOrder.custom)[];

            /**
             * Order of column types in the grid.
             * Maximum 3 columns: checkbox, actions, dbFields.
             */
            gridColumnsOrder?: (EDBMasterGridColumnsOrder.checkbox | EDBMasterGridColumnsOrder.actions | EDBMasterGridColumnsOrder.dbFields)[];

            /** Width of the actions column. */
            actionColumnWidth?: string;

            /** Custom action buttons for each grid row. */
            customActionButtons?: IDBMasterCustomActionButton[];
        };

        /**
         * Column definitions for the grid.
         * When empty, automatically generates columns for all schema fields (except MongoDB _id).
         */
        fields?: IDBMasterConfigGridField[],

        /**
         * Field selection for API queries.
         * Supports MongoDB/API Maker select syntax.
         * @default All fields selected
         * @note Not applicable for nested grids
         * @example { name: 1, email: 1, password: -1 }
         */
        selectFieldsForQuery?: {
            [field: string]: 1 | -1
        };

        /**
         * Grid sorting mode.
         * - `single`: Sort by one column at a time
         * - `multiple`: Sort by multiple columns (use Ctrl/Cmd + click)
         * @default 'single'
         */
        sortMode?: 'single' | 'multiple';

        /**
         * Default sorting configuration.
         * Columns are sorted in this order when the grid loads.
         * Note: Fields must have `enableSorting: true` to work.
         * @example [{ field: 'name', order: 1 }, { field: 'createdAt', order: -1 }]
         */
        multiSortMeta?: { field: string; order: -1 | 1 }[];

        /**
         * Pagination configuration for the grid.
         */
        pagination?: {
            /**
             * Enable pagination controls.
             * @default false
             */
            showPagination?: boolean;

            /**
             * Enable server-side pagination.
             * When true, only the current page's data is fetched from the server.
             * @default false
             * @note Does not work for nested grids
             */
            serverSidePagination?: boolean;

            /**
             * Number of rows per page.
             * @default 10
             */
            rowsPerPage?: number;

            /**
             * Available options for rows per page dropdown.
             * @default [10, 20, 50, 100, 500, 1000]
             */
            rowsPerPageOptions?: number[];
        }

        /**
         * Row grouping configuration.
         */
        grouping?: {
            /**
             * Group display mode.
             * Note: 'rowspan' mode is not supported.
             * @default 'subheader'
             */
            // rowGroupMode: 'subheader';

            /** Column name to group rows by. */
            groupRowsBy: string;

            /** Inline style object for group headers (Angular style binding format). */
            headerStyle?: any;

            /** CSS class names for group headers (space-separated). */
            headerCssClass?: string,

            /** Inline style object for group footers (Angular style binding format). */
            footerStyle?: any;

            /** CSS class names for group footers (space-separated). */
            footerCssClass?: string,

            /** Property path to display in group footers. */
            footerColumnPath?: string,
        }

        /**
         * Row selection configuration.
         */
        selection?: {
            /**
             * Selection mode.
             * @default 'multiple'
             */
            mode: 'single' | 'multiple';

            /**
             * Primary key field name for identifying rows.
             * @default Automatically determined from schema
             */
            dataKey?: string;

            /**
             * Require Ctrl/Cmd key for row selection.
             * When true, prevents accidental selection changes.
             * @default true
             */
            metaKeySelection?: boolean;

            /**
             * Show checkboxes for row selection.
             * Only works with mode='multiple'.
             * @default false
             */
            checkboxSelection?: boolean;
        }

        /**
         * Filtering configuration for the grid.
         */
        filter?: {
            /**
             * Enable global search input field.
             * Searches across multiple fields simultaneously.
             * @default false
             */
            showGlobalSearch?: boolean;

            /**
             * Fields to include in global search.
             * Supports nested field paths (e.g., 'country.name').
             * String fields use "contains" matching, number fields use exact match.
             * @example ['name', 'email', 'address.city']
             */
            globalSearchFields?: string[];

            /**
             * Enable per-column filter inputs.
             * @default false
             */
            rowFilter?: boolean;
        }

        /**
         * Override default API behavior for grid data operations.
         * Allows custom endpoints and request/response transformations.
         */
        apiCallOverrides?: IDBMasterAPICallOverrides;
    };
    /**
     * Form dialog configuration for add/edit/view operations.
     */
    form?: {
        /** Space-separated CSS class names for the form dialog. */
        cssClass?: string,

        /** Inline style object for the form dialog (Angular style binding format). */
        style?: any;

        /**
         * Allow dialog to be dragged by header.
         * Only applicable for top-level form modals.
         * @default false
         */
        draggable?: boolean;

        /**
         * Enable fullscreen toggle button.
         * @default true
         */
        maximizable?: boolean;

        /**
         * Form dialog width.
         * @example '90vw', '800px'
         */
        width?: string;

        /**
         * Hide the close (X) button in dialog header.
         * @default false
         */
        hideCloseButton?: boolean;

        /**
         * Label for the save button.
         * @default 'Save'
         */
        labelOfSaveButton?: string;

        /**
         * Label for the update button in edit mode.
         * @default 'Update'
         */
        labelOfUpdateButton?: string;

        /**
         * Label for the cancel/close button.
         * @default 'Cancel'
         */
        labelOfCancelButton?: string;

        /**
         * Display errors from unmapped fields in a table.
         * When multiple errors occur for fields not in the form,
         * they're shown in a table format. Single errors appear as notifications.
         * @default true
         */
        showOtherFieldErrors?: boolean;

        /**
         * Form field definitions organized in rows.
         * Each array represents a row of fields in the form layout.
         */
        fields?: IDBMasterConfigFormField[][];
    };

}

export enum EDBMasterOperationsOrder {
    custom_actions = 'custom_actions',
    delete_all = 'delete_all',
    add = 'add',
    refresh = 'refresh',
    export = 'export',
    export_csv_single = 'export_csv_single',
    import = 'import',
    global_search = 'global_search',
    column_selector = 'column_selector',
    theme_selector = 'theme_selector',
}

export enum EDBMasterGridOperationsOrder {
    delete = 'delete',
    edit = 'edit',
    view = 'view',
    custom = 'custom',
}

export enum EDBMasterGridColumnsOrder {
    checkbox = 'checkbox',
    actions = 'actions',
    dbFields = 'dbFields',
}

export interface IDBMasterImportData {
    enable: boolean;

    /** Default : pi pi-file-import */
    icon?: string;

    /** default : true */
    raised?: boolean;

    /** comma separated CSS classes */
    cssClass?: string;

    severity?: uiMakerComponentSeverity;

    /** default : Export data */
    tooltip?: string;

    /** Give style object in angular style. */
    style?: any;

    /** width of grid. */
    gridWidth?: string;

    fieldMappings: IDBMasterImportGridColumn[];

    /** By default it can use save API. */
    apiCallOverrides?: IDBMasterAPICallOverrides;
}

export interface IDBMasterImportGridColumn {
    header: string;

    /** CSV field map */
    sourceField: string;

    /** It will be database field, csv data will be stored into this field after conversion. */
    targetField: string;

    /** CSV data will be converted to this type. */
    convertTargetFieldToType: EType;

    /** Default: ISO date format, date-fns format, Dates from CSV will be parsed using this format. */
    dateParseFormat?: string;

    /** Dates will be converted into this timezone before sending to database query. */
    dateTimeZone?: string;

    /** Dates will be converted to this format to display in UI.<br/> */
    dateFormatUIDisplay?: string;

    /** Dates will be converted to this format to display in UI.<br/> */
    dateTimeZoneUIDisplay?: string;

    // calculated property
    filterType?: EDBMasterConfigFilterType;

    /** width of grid column */
    width?: string;
}

/**
 * Custom action button configuration for grid rows.
 * Creates clickable buttons in grid rows for custom operations.
 *
 * **Common Use Cases:**
 * - Approve/Reject workflows
 * - Send email/SMS notifications
 * - Export individual records
 * - Trigger external API calls
 * - Navigate to related pages
 *
 * @example
 * // Approve button with confirmation
 * {
 *     actionName: 'approve',
 *     htmlCode: '<i class="pi pi-check"></i> Approve',
 *     raised: true,
 *     confirmationMessageScript: "`Approve ${selectedGridItems.name}?`",
 *     jsCode: [{
 *         appendTo: 'click',
 *         code: async ($scope) => {
 *             const response = await fetch('/api/approve', {
 *                 method: 'POST',
 *                 body: JSON.stringify({ id: $scope.selectedGridItems._id })
 *             });
 *             if (response.ok) {
 *                 $scope.utils.operations.refreshGrid();
 *                 $scope.utils.messageService.showSuccessToast('Approved!');
 *             }
 *         }
 *     }]
 * }
 */
export interface IDBMasterCustomActionButton {
    /**
     * Unique identifier for this action.
     * Used by parent to identify which button was clicked.
     * Also used to hide button via row property: `____hide_{actionName}`
     * @example 'approve', 'reject', 'sendEmail', 'export'
     */
    actionName: string;

    /**
     * CSS classes for button styling.
     * Use PrimeIcons for icons.
     * @example 'pi pi-check', 'pi pi-times custom-btn'
     * @see {@link https://primeng.org/icons PrimeNG Icons}
     */
    cssClass?: string,

    /**
     * Inline styles for the button.
     * Angular style binding format.
     */
    style?: any;

    /**
     * Add shadow/elevation to button.
     * @default true
     */
    raised?: boolean;

    /**
     * JavaScript expression for confirmation message.
     * If provided, shows confirmation dialog before executing action.
     *
     * **Available Variables:**
     * - `selectedGridItems`: Row object (single) or array (if header action)
     *
     * @example
     * "`Do you want to approve ${selectedGridItems.length} items?`"
     * @example
     * "`Delete '${selectedGridItems.name}'?`"
     */
    confirmationMessageScript?: string;

    /**
     * Custom HTML for button content.
     * Overrides default button rendering.
     * @example '<i class="pi pi-send"></i> Send Email'
     */
    htmlCode?: string;

    /**
     * Custom JavaScript handlers for button click.
     */
    jsCode?: {
        /**
         * Event to attach code to (currently only 'click').
         */
        appendTo: EDBMasterCustomActionButtonAppendTo,
        /**
         * JavaScript code or function executed on button click.
         *
         * **Available Variables:**
         * - `globalData`: User-provided global data
         * - `utils`: Utility functions (operations, messageService, etc.)
         * - `queryParams`: URL query parameters
         * - `config`: DB Master configuration
         * - `gridData`: All grid data array
         * - `selectedGridItems`: Selected row(s)
         * - `event`: Native click event
         *
         * @example
         * ```javascript
         * async ($scope) => {
         *     const result = await customOperation($scope.selectedGridItems);
         *     $scope.utils.messageService.showSuccessToast('Done!');
         *     $scope.utils.operations.refreshGrid();
         * }
         * ```
         */
        code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
    }[],
}

/**
 * Button severity/variant styles.
 * Defines the visual appearance and semantic meaning of buttons.
 */
type uiMakerComponentSeverity =
/** High contrast style. */ 'contrast' |
    /** Danger/destructive action (red). */ 'danger' |
    /** Help/informational (purple). */ 'help' |
    /** Informational (blue). */ 'info' |
    /** Primary action (brand color). */ 'primary' |
    /** Secondary action (gray). */ 'secondary' |
    /** Success/positive action (green). */ 'success' |
    /** Warning/caution (yellow/orange). */ 'warning';

/**
 * Top-level custom action button (displayed in toolbar).
 * Extends IDBMasterCustomActionButton for grid-level actions.
 */
export interface IDBMasterTopLevelCustomActionButton extends Omit<IDBMasterCustomActionButton, 'cssClass'> {
    /**
     * CSS classes for the button.
     * Space-separated class names.
     */
    cssClass?: string,

    /** Give label to button */
    label?: string;

    /** Default: info */
    severity?: uiMakerComponentSeverity;

    /** ex : pi pi-check https://primeng.org/icons */
    icon?: string;

    /** Default: true, if false it will be enabled even if no row selected in grid. */
    isDependentOnGridSelection?: boolean;
}

export interface IDBMasterConfigGridFilterOfField {
    matchMode: EDBMasterMatchMode;
    value: string;
}

export interface IDBMasterConfigOperation {
    enable: boolean;

    /** default : true */
    raised?: boolean;

    /** Gives label to Add button which is visible on top of the grid. Applicable for add button only. */
    label?: string;

    /** Applicable for add button only. */
    cssClass?: string;

    /** Give style object in angular style. */
    style?: any;

    severity?: uiMakerComponentSeverity;

    /** ex : pi pi-plus https://primeng.org/icons */
    icon?: string;

    apiCallOverrides?: IDBMasterAPICallOverrides;
}

/**
 * Confirmation dialog configuration.
 * Customizes the appearance and behavior of confirmation prompts.
 * Used by confirmation dialog generators in EDBMasterConfigAppendTo.
 *
 * @example
 * // Basic delete confirmation
 * {
 *     header: 'Confirm Delete',
 *     message: 'Are you sure you want to delete this record?',
 *     icon: 'pi pi-exclamation-triangle',
 *     acceptLabel: 'Yes, Delete',
 *     rejectLabel: 'Cancel',
 *     acceptButtonStyleClass: 'p-button-danger',
 *     rejectButtonStyleClass: 'p-button-text'
 * }
 *
 * @example
 * // Custom save confirmation with default focus
 * {
 *     header: 'Save Changes?',
 *     message: 'Do you want to save the changes to this record?',
 *     icon: 'pi pi-question-circle',
 *     acceptIcon: 'pi pi-check',
 *     rejectIcon: 'pi pi-times',
 *     defaultFocus: 'reject',
 *     blockScroll: true
 * }
 */
export interface IConfirmDialogSettings {
    /**
     * Message text displayed in the dialog body.
     * Can include HTML formatting.
     */
    message?: string;
    /**
     * Icon displayed at the top of the dialog.
     * Use PrimeIcons class names.
     * @example 'pi pi-exclamation-triangle', 'pi pi-question-circle'
     */
    icon?: string;
    /**
     * Dialog header/title text.
     * @example 'Confirm Delete', 'Warning', 'Save Changes?'
     */
    header?: string;
    /**
     * Label text for the accept/confirm button.
     * @default 'Yes'
     */
    acceptLabel?: string;
    /**
     * Label text for the reject/cancel button.
     * @default 'No'
     */
    rejectLabel?: string;
    /**
     * Icon displayed on the accept button.
     * @example 'pi pi-check'
     */
    acceptIcon?: string;
    /**
     * Icon displayed on the reject button.
     * @example 'pi pi-times'
     */
    rejectIcon?: string;
    /**
     * Show or hide the accept button.
     * @default true
     */
    acceptVisible?: boolean;
    /**
     * Show or hide the reject button.
     * @default true
     */
    rejectVisible?: boolean;
    /**
     * Prevent page scrolling when dialog is open.
     * @default true
     */
    blockScroll?: boolean;
    /**
     * Allow closing dialog with Escape key.
     * @default true
     */
    closeOnEscape?: boolean;
    /**
     * Allow closing dialog by clicking outside/overlay.
     * @default false
     */
    dismissableMask?: boolean;
    /**
     * Element to focus when dialog opens.
     * @values 'accept' | 'reject' | 'close' | 'none'
     * @default 'accept'
     */
    defaultFocus?: string;
    /**
     * CSS classes for the accept button.
     * @example 'p-button-success', 'p-button-danger p-button-raised'
     */
    acceptButtonStyleClass?: string;
    /**
     * CSS classes for the reject button.
     * @example 'p-button-text', 'p-button-outlined'
     */
    rejectButtonStyleClass?: string;
}

/**
 * Custom API endpoint override configuration.
 * Replaces default CRUD APIs with custom endpoints and logic.
 *
 * **Use Cases:**
 * - Integrate with external REST APIs
 * - Add custom authentication headers
 * - Transform request/response data
 * - Implement complex business logic
 *
 * @example
 * // Custom save API with authentication
 * apiCallOverrides: {
 *     url: 'https://api.example.com/users',
 *     method: 'POST',
 *     headers: { 'Authorization': 'Bearer token123' },
 *     codeBeforeAPICall: `
 *         $scope.reqBody.createdAt = new Date();
 *         $scope.headers['X-Custom-Header'] = 'value';
 *     `,
 *     codeAfterAPICall: `
 *         if ($scope.apiResponse.success) {
 *             $scope.utils.messageService.showSuccessToast('User created!');
 *         }
 *     `
 * }
 *
 * @example
 * // External API with query parameters
 * apiCallOverrides: {
 *     url: 'https://api.example.com/products',
 *     method: 'GET',
 *     queryParams: { category: 'electronics', limit: 50 },
 *     pkField: 'productId'
 * }
 */
export interface IDBMasterAPICallOverrides {
    /** Custom API endpoint URL (absolute or relative). */
    url: string;
    /** HTTP headers for the request. */
    headers?: any;
    /** HTTP method for the request. */
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
    /** Request body data. */
    body?: any;

    /**
     * Query parameters appended to URL.
     * Automatically converted to query string format.
     * @example { page: 1, limit: 50, status: 'active' } → ?page=1&limit=50&status=active
     */
    queryParams?: any;

    /**
     * Primary key field name for current collection/table.
     * @default '_id' for MongoDB
     * @example 'id', 'userId', 'productId'
     */
    pkField?: string;

    /**
     * JavaScript code executed before API call.
     *
     * **Available Variables:**
     * - `config`: IDBMasterConfig - DB Master configuration
     * - `formData`: any - Form data object (not available for grid calls)
     * - `allDropdownDataMap`: { [path: string]: any[] } - Dropdown data (not available for grid)
     * - `apiResponse`: any - Will be populated after API call
     * - `globalData`: any - User-provided global data
     * - `headers`: any - Mutable request headers
     * - `reqBody`: any - Mutable request body
     * - `utils`: any - Utility functions
     * - `queryParams`: any - URL query parameters
     * - `mode`: 'save' | 'edit' | 'view' | 'import' | null
     *
     * @example
     * `$scope.headers['Authorization'] = 'Bearer ' + $scope.globalData.token;`
     */
    codeBeforeAPICall?: string;

    /**
     * JavaScript code executed after API call completes.
     *
     * **Available Variables:**
     * - `config`: IDBMasterConfig - DB Master configuration
     * - `formData`: any - Form data object (not available for grid calls)
     * - `allDropdownDataMap`: { [path: string]: any[] } - Dropdown data (not available for grid)
     * - `apiResponse`: any - Response from API call
     * - `globalData`: any - User-provided global data
     * - `headers`: any - Request headers used
     * - `reqBody`: any - Request body sent
     * - `utils`: any - Utility functions
     * - `queryParams`: any - URL query parameters
     * - `mode`: 'save' | 'edit' | 'view' | 'import' | null
     *
     * @example
     * ```javascript
     * if (!$scope.apiResponse.success) {
     *     $scope.utils.messageService.showErrorToast($scope.apiResponse.error);
     * }
     * ```
     */
    codeAfterAPICall?: string;
}

/**
 * Filter match modes for grid column filtering.
 * Determines how filter values are compared against data.
 *
 * **Categories:**
 * - **String Matching**: contains, notContains, startsWith, endsWith, equals, notEquals
 * - **Numeric Comparison**: lt, lte, gt, gte, equals, notEquals
 * - **Date Comparison**: dateIs, dateIsNot, dateBefore, dateAfter
 */
export enum EDBMasterMatchMode {
    /** String contains substring (case-insensitive). */
    contains = 'contains',
    /** String does not contain substring. */
    notContains = 'notContains',
    /** String starts with prefix. */
    startsWith = 'startsWith',
    /** String ends with suffix. */
    endsWith = 'endsWith',
    /** Value exactly equals filter value. */
    equals = 'equals',
    /** Value does not equal filter value. */
    notEquals = 'notEquals',

    /** Less than (numeric/date). */
    lt = 'lt',
    /** Less than or equal (numeric/date). */
    lte = 'lte',
    /** Greater than (numeric/date). */
    gt = 'gt',
    /** Greater than or equal (numeric/date). */
    gte = 'gte',

    /** Date exactly matches (ignoring time). */
    dateIs = 'dateIs',
    /** Date does not match (ignoring time). */
    dateIsNot = 'dateIsNot',
    /** Date is before specified date. */
    dateBefore = 'dateBefore',
    /** Date is after specified date. */
    dateAfter = 'dateAfter',
}

/**
 * Grid column configuration for table display.
 * Defines how each column appears and behaves in the data grid.
 */
export interface IDBMasterConfigGridField {
    /**
     * Column data type.
     * Auto-detected from schema, but can be explicitly specified.
     */
    type?: EType;

    /**
     * Column header text displayed at the top of the column.
     * @example 'User Name', 'Created Date', 'Status'
     */
    header: string;

    /**
     * Database field path to display in this column.
     * Supports nested object paths using dot notation.
     * @example 'name', 'user.profile.firstName', 'address.city'
     */
    path?: string;

    /**
     * Alternative field to display instead of path field value.
     * Useful for showing formatted or related data.
     * @example path='userId', displayField='user.fullName'
     */
    displayField?: string;

    /**
     * Placeholder text shown in column header filter input.
     * @example 'Search by name...', 'Filter status'
     */
    placeHolderOfFilterInHeader?: string;

    /**
     * Hide the filter input in column header.
     * @default false
     */
    hideFilter?: boolean;

    /**
     * Automatically format date values using dateTimeFormat.
     * @default false
     */
    autoFormatDate?: boolean;

    /**
     * Timezone for date conversion in database queries.
     * Converts displayed dates to specified timezone before filtering.
     * @example 'UTC', 'America/New_York', 'Asia/Kolkata'
     */
    dateTimeZone?: string;

    /**
     * Date display format using date-fns format tokens.
     * @default 'dd-MM-yyyy hh:mm:ss a'
     * @see {@link https://date-fns.org/docs/format date-fns format documentation}
     * @example 'yyyy-MM-dd', 'MM/dd/yyyy HH:mm', 'PPpp'
     */
    dateTimeFormat?: string;

    /**
     * Date filter format for PrimeNG calendar component.
     * @example 'dd/mm/yy', 'mm-dd-yy'
     */
    dateTimeFormatFilter?: string;

    /**
     * Enable sorting for this column.
     * Clicking column header will sort data.
     * @default false
     */
    enableSorting?: boolean;

    /**
     * Data source for column values (for reference fields).
     * Use 'db_data' to resolve IDs to display values.
     */
    dataSource?: 'db_data';

    /**
     * Database lookup configuration for reference fields.
     * Resolves foreign key IDs to display meaningful values.
     */
    dbData?: {
        /** Database instance name. */
        instance?: string;
        /** Database name. */
        database?: string;
        /** Collection name (MongoDB). */
        collection?: string;
        /** Primary key field name in referenced collection. */
        pkField?: string;
        /** Field to display from referenced document. */
        displayField: string;
        /**
         * Fields to select from referenced collection.
         * Must include displayField.
         * @example { name: 1, email: 1 }
         */
        select?: any;
    };

    /**
     * Column width with CSS units.
     * @example '200px', '15%', '10rem'
     */
    width?: string;

    /**
     * Inline styles for column header cell.
     * Angular style binding format.
     */
    headerStyle?: any;

    /**
     * CSS classes for column header cell.
     * Space-separated class names.
     */
    headerCssClass?: string,

    /**
     * Inline styles for data cells in this column.
     * Applied to every row's cell in this column.
     */
    dataCellStyle?: any;

    /**
     * CSS classes for data cells in this column.
     * Space-separated class names.
     */
    dataCellCssClass?: string,

    /**
     * Column visibility and export status.
     * Controls initial visibility in grid and export operations.
     */
    visibilityStatus?: EDBMasterConfigGridColumnVisibilityStatus;
}

/**
 * Extended grid column configuration for export functionality.
 * Internal use only - includes computed properties for PrimeNG grid operations.
 */
export interface IDBMasterConfigGridFieldExport extends IDBMasterConfigGridField {
    /**
     * Field identifier for PrimeNG export.
     * Required for CSV/PDF export operations.
     */
    field?: string;

    /**
     * Filter input type for column filtering.
     * Auto-computed based on schema type.
     */
    filterType?: EDBMasterConfigFilterType;

    /**
     * Default filter match mode for this column.
     * Determines how filter values are compared.
     */
    matchModeForFilterInColumn?: EDBMasterMatchMode;
}

/**
 * Column filter input types.
 * Determines the type of filter control displayed in column headers.
 */
export enum EDBMasterConfigFilterType {
    /** Text input filter for string fields. */
    text = 'text',
    /** Number input filter for numeric fields. */
    numeric = 'numeric',
    /** Checkbox filter for boolean fields. */
    boolean = 'boolean',
    /** Date picker filter for date/datetime fields. */
    date = 'date',
}

/**
 * Grid column visibility options.
 * Controls initial display state and export behavior.
 */
export enum EDBMasterConfigGridColumnVisibilityStatus {
    /**
     * Column is visible by default in grid and exports.
     * Default state for all columns.
     */
    VISIBLE = 'VISIBLE',

    /**
     * Column is hidden by default but available.
     * Users can show it via column selector dropdown.
     */
    INVISIBLE = 'INVISIBLE',
}

/**
 * Form field configuration for UI controls.
 * Defines the appearance, behavior, and validation of individual form inputs.
 */
export interface IDBMasterConfigFormField {
    /**
     * Unique identifier for programmatic element access.
     * Useful for dynamic field manipulation.
     */
    hiddenId?: string;
    /** Display label for the form field. */
    label?: string;

    /**
     * Help text displayed below the control.
     * Supports HTML formatting for rich content.
     */
    helpText?: string;

    /**
     * Database field path where the control value is stored.
     * Supports nested paths using dot notation.
     * @example 'name', 'address.city', 'user.contact.email'
     */
    path?: string;

    /** Type of UI control to render. */
    control?: EDBMasterFormControl;

    /**
     * CSS classes for the parent div wrapping the control.
     * @default 'col-lg mt-4 col-md-{calculated based on columns.length}'
     */
    cssClassDiv?: string;

    /**
     * Auto-focus this control when form opens.
     * @default false
     */
    autofocus?: boolean;

    /**
     * Disable the control or use expression to conditionally disable.
     * When a string is provided, it's evaluated as JavaScript.
     * @example true | false | "formData.type === 'readonly'"
     */
    disabled?: boolean | string;

    /**
     * Control visibility or use expression to conditionally show/hide.
     * When a string is provided, it's evaluated as JavaScript.
     * @default true
     * @example true | false | "formData.userRole === 'admin'"
     */
    visible?: boolean | string;

    /**
     * Nested form fields for complex layouts.
     * Enables hierarchical form structures within this field.
     */
    fields?: IDBMasterConfigFormField[][];

    /** Validation rules for this field. */
    validations?: Pick<IPropertyValidation, 'required'> & {
        /**
         * Dynamic required validation function.
         * Evaluated when form data changes to determine if field is required.
         * Note: When present, this takes precedence over static 'required' property.
         * @example "formData.type === 'individual' ? true : false"
         */
        requiredFun?: string;
    };
    /** Custom validation error messages. */
    validationErrors?: {
        /** Custom error message for required field validation. */
        required?: string;
    };
    // genericConfig : end

    // gridSettings : start
    gridSettings?: Omit<IDBMasterConfig, 'schema'>;
    // gridSettings : end

    // Textarea control configuration
    /**
     * Multi-line text input configuration.
     */
    textAreaSettings?: {
        /** Inline style object (Angular style binding format). */
        style?: any;

        /** Placeholder text displayed when empty. */
        placeholder?: string;
        /** Initial number of visible text rows. */
        rows?: number;
        /**
         * Automatically adjust height based on content.
         * @default false
         */
        autoResize?: boolean;

        /** Maximum character length allowed. */
        maxLength?: number;

        /** Tooltip text displayed on hover. */
        tooltip?: string;

        /**
         * Tooltip position relative to the element.
         * @default 'top'
         */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        /** CSS class for tooltip styling. */
        tooltipStyleClass?: string;

        /** Custom event handlers and behavior scripts. */
        jsCode?: {
            /**
             * Event type or lifecycle hook for code execution.
             * Available variables in scope:
             * - formData: Complete form object
             * - column: This field's configuration
             * - allDropdownDataMap: Map of all dropdown data by path
             * - globalData: User-provided global context
             * - utils: Common utility functions
             * - queryParams: URL query parameters
             * - config: Form field configuration
             * - event: Native event object
             */
            appendTo: EDBMasterTextAreaAppendTo,
            /**
             * JavaScript code or function to execute.
             * @example
             * // Async operation
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     formData.description = 'Updated';
             *     resolve();
             * });
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };

    // editorSettings : start
    editorSettings?: {
        /** Give style object in angular style. */
        style?: any;

        placeholder?: string;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /** Only those controls and formats will be allowed
         * ex: ['background', 'bold', 'color', 'font', 'code', 'italic', 'link', 'size', 'strike', 'script', 'underline', 'blockquote', 'header', 'indent', 'list', 'align', 'direction', 'code-block', 'image', 'video', 'clean']
         * */
        formats?: string[];

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterEditorAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // editorSettings : end

    /**
     * Text input control configuration.
     * Single-line text entry with validation and autocomplete support.
     *
     * **Features:**
     * - Character length limits (min/max)
     * - Autocomplete on/off control
     * - Spellcheck toggle
     * - Tooltip support
     * - Custom event handlers
     *
     * @example
     * // Basic text input with length limit
     * inputTextSettings: {
     *     placeholder: 'Enter your name',
     *     maxLength: 100,
     *     autocomplete: 'off'
     * }
     *
     * @example
     * // Text input with validation and tooltip
     * inputTextSettings: {
     *     minLength: 3,
     *     maxLength: 50,
     *     tooltip: 'Username must be 3-50 characters',
     *     tooltipPosition: 'top',
     *     validationErrors: {
     *         minLength: 'Username must be at least 3 characters'
     *     }
     * }
     */
    // inputTextSettings : start
    inputTextSettings?: {
        /** Give style object in angular style. */
        style?: any;

        placeholder?: string;

        /** Default is off */
        autocomplete?: 'on' | 'off' | undefined;

        /** Default is false */
        spellcheck?: 'true' | 'false' | undefined;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Minimum number of character allows in the input field. */
        minLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterInputTextAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],

        validationErrors?: {
            minLength?: string;
        };
    };
    // inputTextSettings : end

    /**
     * Number input control configuration.
     * Numeric entry with spinner buttons, formatting, and validation.
     *
     * **Features:**
     * - Min/max range validation
     * - Step increment/decrement
     * - Decimal precision control (minFractionDigits)
     * - Locale-based formatting
     * - Currency mode with ISO 4217 codes
     * - Prefix/suffix symbols
     * - Grouping separators (thousands, lakhs, crores)
     * - Spinner button layouts
     *
     * @see {@link https://primeng.org/inputnumber PrimeNG InputNumber Documentation}
     *
     * @example
     * // Basic number input with range and step
     * inputNumberSettings: {
     *     min: 0,
     *     max: 100,
     *     step: 5,
     *     showButtons: true,
     *     buttonLayout: 'stacked'
     * }
     *
     * @example
     * // Currency input with formatting
     * inputNumberSettings: {
     *     mode: 'currency',
     *     currency: 'USD',
     *     locale: 'en-US',
     *     minFractionDigits: 2,
     *     useGrouping: true
     * }
     *
     * @example
     * // Percentage input
     * inputNumberSettings: {
     *     suffix: '%',
     *     min: 0,
     *     max: 100,
     *     step: 0.1,
     *     minFractionDigits: 1
     * }
     *
     * @example
     * // Decimal number with custom locale
     * inputNumberSettings: {
     *     mode: 'decimal',
     *     locale: 'de-DE',
     *     minFractionDigits: 2,
     *     useGrouping: true,
     *     showButtons: true,
     *     buttonLayout: 'horizontal'
     * }
     */
    // inputNumberSettings : start
    /** Doc : https://primeng.org/inputnumber */
    inputNumberSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        min?: number;
        max?: number;
        minFractionDigits?: number;
        mode?: 'decimal' | 'currency' | '';

        /** The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided. */
        currency?: string;

        /** Default : 'en-US' */
        locale?: string;
        prefix?: string;
        suffix?: string;

        // buttons
        showButtons?: boolean;

        /** Default : stacked */
        buttonLayout?: 'stacked' | 'horizontal' | 'vertical';
        step?: number;

        /** Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. */
        useGrouping?: boolean;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Minimum number of character allows in the input field. */
        minLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterInputNumberAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],

        validationErrors?: {
            minLength?: string;
        };
    };
    // inputNumberSettings : end

    /**
     * Input mask control configuration.
     * Format text input with predefined patterns (phone, SSN, date, etc.).
     *
     * **Mask Patterns:**
     * - **a**: Alphabetic character (A-Z, a-z)
     * - **9**: Numeric character (0-9)
     * - **\***: Alphanumeric character (A-Z, a-z, 0-9)
     * - **?**: Marks everything after as optional
     * - Formatting chars: `( ) - / . , :`
     *
     * @example
     * // Phone number mask
     * inputMaskSettings: {
     *     mask: '(999) 999-9999',
     *     placeholder: '(123) 456-7890',
     *     autoClear: true
     * }
     *
     * @example
     * // SSN mask
     * inputMaskSettings: {
     *     mask: '999-99-9999',
     *     slotChar: 'mm/dd/yyyy'
     * }
     *
     * @example
     * // Optional extension
     * inputMaskSettings: {
     *     mask: '(999) 999-9999? x99999',
     *     placeholder: '(123) 456-7890 x12345'
     * }
     *
     * @example
     * // Date mask
     * inputMaskSettings: {
     *     mask: '99/99/9999',
     *     placeholder: 'mm/dd/yyyy',
     *     slotChar: 'mm/dd/yyyy'
     * }
     */
    // inputMaskSettings : start
    inputMaskSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** Ex : mask="99-999999", mask="(999) 999-9999? x99999"  <br/>
         * Mask format can be a combination of the following definitions; <br/>
         * a for alphabetic characters, <br/>
         * 9 for numeric characters and  <br/>
         * * for alphanumeric characters. <br/>
         * In addition, formatting characters like ( , ) , - are also accepted. <br/>
         *
         * ? is used to mark anything after the question mark optional. <br/>
         * */
        mask?: string;

        /** Advisory information to display on input. */
        placeholder?: string;

        /** Ex : slotChar="mm/dd/yyyy" <br/>
         * Default placeholder for a mask is underscore that can be customized using slotChar property.
         *  */
        slotChar?: string;

        /** Default : true, Clears the incomplete value on blur. */
        autoClear?: boolean;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterInputMaskAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // inputMaskSettings : end

    /**
     * OTP (One-Time Password) input control configuration.
     * Multi-character input for verification codes and OTPs.
     *
     * **Features:**
     * - Fixed-length character inputs
     * - Auto-focus navigation between fields
     * - Integer-only mode
     * - Masked display for security
     * - Customizable width
     *
     * @example
     * // 6-digit OTP input
     * inputOtpSettings: {
     *     length: 6,
     *     integerOnly: true,
     *     mask: true
     * }
     *
     * @example
     * // 4-character code (alphanumeric)
     * inputOtpSettings: {
     *     length: 4,
     *     integerOnly: false,
     *     uiControlWidth: '250px'
     * }
     */
    // inputOtpSettings : start
    inputOtpSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** Enable the mask option to hide the values in the input fields. */
        mask?: boolean;

        /** When integerOnly is present, only integers can be accepted as input. */
        integerOnly?: boolean;

        /** Default : 300px; */
        uiControlWidth?: string;

        /** Number of characters to initiate. */
        length?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;
    };
    // inputOtpSettings : end

    /**
     * Password input control configuration.
     * Secure password entry with strength meter and visibility toggle.
     *
     * **Features:**
     * - Masked character display
     * - Toggle visibility button
     * - Password strength feedback
     * - Custom validation prompts
     *
     * @example
     * // Basic password input
     * inputPasswordSettings: {
     *     placeholder: 'Enter password',
     *     toggleMask: true
     * }
     *
     * @example
     * // Password with strength meter
     * inputPasswordSettings: {
     *     placeholder: 'Create a strong password',
     *     toggleMask: true,
     *     feedback: true,
     *     promptLabel: 'Enter a password',
     *     weakLabel: 'Weak',
     *     mediumLabel: 'Medium',
     *     strongLabel: 'Strong'
     * }
     */
    // inputPasswordSettings : start
    inputPasswordSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterInputPasswordAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // inputPasswordSettings : end

    /**
     * Checkbox control configuration.
     * Binary selection control for true/false or yes/no values.
     *
     * **Features:**
     * - Boolean value binding
     * - Custom event handlers (onChange)
     * - Tooltip support
     * - Custom styling
     *
     * @example
     * // Basic checkbox
     * checkboxSettings: {
     *     tooltip: 'Check to enable notifications'
     * }
     *
     * @example
     * // Checkbox with change handler
     * checkboxSettings: {
     *     jsCode: [{
     *         appendTo: 'onChange',
     *         code: ($scope) => {
     *             if ($scope.formData.agreeToTerms) {
     *                 $scope.utils.messageService.showInfoToast('Thank you for agreeing!');
     *             }
     *         }
     *     }]
     * }
     */
    // checkboxSettings : start
    checkboxSettings?: {
        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterCheckboxAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // checkboxSettings : end

    /**
     * Rating control configuration.
     * Star-based rating input with customizable icons and count.
     *
     * **Features:**
     * - Configurable number of stars
     * - Cancel button to clear rating
     * - Custom icon classes and HTML
     * - Separate styles for on/off/cancel states
     * - Event handlers for rating changes
     *
     * @example
     * // Basic 5-star rating
     * ratingSettings: {
     *     stars: 5,
     *     cancel: true
     * }
     *
     * @example
     * // Custom icon rating (hearts)
     * ratingSettings: {
     *     stars: 5,
     *     iconOnClass: 'pi pi-heart-fill',
     *     iconOffClass: 'pi pi-heart',
     *     iconCancelClass: 'pi pi-ban',
     *     cancel: true
     * }
     *
     * @example
     * // 10-star rating with custom HTML
     * ratingSettings: {
     *     stars: 10,
     *     onIconHTML: '<i class="fas fa-star" style="color: gold;"></i>',
     *     offIconHTML: '<i class="far fa-star" style="color: gray;"></i>',
     *     cancel: false
     * }
     */
    // ratingSettings : start
    ratingSettings?: {
        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /** Default : true, When specified a cancel icon is displayed to allow removing the value. */
        cancel?: boolean;

        /** Style class of the on icon. */
        iconOnClass?: string;

        /** Inline style of the on icon. */
        iconOnStyle?: any;

        /** Style class of the off icon. */
        iconOffClass?: string;

        /** Inline style of the off icon. */
        iconOffStyle?: any;

        /** Style class of the cancel icon. */
        iconCancelClass?: string;

        /** Inline style of the cancel icon. */
        iconCancelStyle?: any;

        /** Number of stars. */
        stars?: number;

        /** cancel rating custom HTML */
        cancelIconHTML?: string;
        onIconHTML?: string;
        offIconHTML?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterRatingAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // ratingSettings : end

    /**
     * Radio button control configuration.
     * Single selection from a list of mutually exclusive options.
     *
     * **Features:**
     * - Inline or vertical layout
     * - Center alignment option
     * - Custom label-value pairs
     * - Event handlers for selection changes
     *
     * @example
     * // Inline radio buttons
     * radioSettings: {
     *     displayType: 'inline',
     *     options: [
     *         { label: 'Active', value: 'active' },
     *         { label: 'Inactive', value: 'inactive' },
     *         { label: 'Pending', value: 'pending' }
     *     ]
     * }
     *
     * @example
     * // Vertical radio buttons centered
     * radioSettings: {
     *     displayType: 'new_line',
     *     displayInCenter: true,
     *     options: [
     *         { label: 'Yes', value: true },
     *         { label: 'No', value: false }
     *     ]
     * }
     */
    // radioSettings : start
    radioSettings?: {
        displayType?: 'inline' | 'new_line';
        displayInCenter?: boolean;
        options: { label: string; value: any }[];

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterRadioAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // radioSettings : end

    /**
     * Date picker control configuration.
     * Date and time selection with calendar popup.
     * Stores value as JavaScript Date object.
     *
     * **Features:**
     * - Date-only, time-only, or date-time modes
     * - 12/24 hour format
     * - Min/max date constraints
     * - Custom date format display
     * - Seconds display toggle
     * - Inline calendar option
     *
     * @example
     * // Basic date picker
     * datePickerSettings: {
     *     placeholder: 'Select a date',
     *     dateTimeFormat: 'dd-MM-yyyy'
     * }
     *
     * @example
     * // Date and time picker with 12-hour format
     * datePickerSettings: {
     *     showTime: true,
     *     hourFormat: '12',
     *     dateTimeFormat: 'dd-MM-yyyy hh:mm a'
     * }
     *
     * @example
     * // Time-only picker with seconds
     * datePickerSettings: {
     *     timeOnly: true,
     *     hourFormat: '24',
     *     showSeconds: true,
     *     dateTimeFormat: 'HH:mm:ss'
     * }
     *
     * @example
     * // Date picker with range constraints
     * datePickerSettings: {
     *     minDate: new Date(2020, 0, 1),
     *     maxDate: new Date(),
     *     dateTimeFormat: 'dd/MM/yyyy'
     * }
     */
    // datePickerSettings : start
    /** It's value will be Date object. */
    datePickerSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        showSeconds?: boolean;
        showTime?: boolean;

        /** Default : 24 */
        hourFormat?: '12' | '24';

        /** ex: dd-MM-yyyy hh:mm:ss a */
        dateTimeFormat?: string;

        /** Whether to display timepicker only. Use hourFormat 12 to display AM/PM in UI. */
        timeOnly?: boolean;

        /** The minimum selectable date. */
        minDate?: Date;

        /** The maximum selectable date. */
        maxDate?: Date;

        /**
         * Default : date
         * Update dateTimeFormat for 'month'(MM-yyyy) & 'year'(yyyy) values.
         */
        view?: 'date' | 'month' | 'year';

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterDatePickerAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // datePickerSettings : end

    /**
     * Color picker control configuration.
     * Interactive color selection with multiple format support.
     *
     * **Features:**
     * - Multiple color formats (hex, rgb, hsb)
     * - Visual color palette
     * - Manual color input
     * - Color preview
     *
     * @example
     * // Hex color picker
     * colorPickerSettings: {
     *     format: 'hex'
     * }
     *
     * @example
     * // RGB color picker with tooltip
     * colorPickerSettings: {
     *     format: 'rgb',
     *     tooltip: 'Select a color',
     *     tooltipPosition: 'top'
     * }
     */
    // colorPickerSettings : start
    colorPickerSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        format?: 'hex' | 'rgb' | 'hsb';

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterColorPickerAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // colorPickerSettings : end

    /**
     * Dropdown (select) control configuration.
     * Supports static data, database queries, and custom API calls.
     */
    dropdownSettings?: {
        /** Inline style object (Angular style binding format). */
        style?: any;

        /** Space-separated CSS class names. */
        cssClass?: string,

        /** Placeholder text displayed when no selection is made. */
        placeholder?: string;
        /**
         * Show clear button to reset selection.
         * @default false
         */
        showClear?: boolean;
        /**
         * Data source type for dropdown options.
         * - `static_data`: Use predefined array of options
         * - `db_data`: Query database for options
         * - `api_call`: Call custom API endpoint
         */
        dataSource: 'static_data' | 'db_data' | 'api_call';

        /**
         * Static dropdown options.
         * Used when dataSource is 'static_data'.
         * @example [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }]
         */
        staticData?: any[];

        /**
         * Database query configuration for dropdown options.
         * Can inherit values from schema if field has database relationship defined.
         */
        dbData?: Partial<Pick<ICollectionIdentity, 'instance' | 'database' | 'collection' | 'table'>
            & Pick<IQueryFormat, 'find' | 'select' | 'limit' | 'deep' | 'sort'>>;

        /**
         * Property name to display in dropdown.
         * @default 'label'
         */
        optionLabel?: string;

        /**
         * Property name to use as option value.
         * @default 'value'
         */
        optionValue?: string;

        /**
         * Enable dropdown filtering.
         * @default false
         */
        filter?: boolean;

        /**
         * Fields to search when filtering.
         * Supports multiple fields (comma-separated, no spaces).
         * @example 'name', 'name,email,phone'
         */
        filterBy?: string;

        /**
         * Filter matching strategy.
         * @default 'contains'
         */
        filterMatchMode?: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';

        /**
         * Reload dropdown data when form opens.
         * Ensures options are always up-to-date.
         * @default false
         */
        alwaysGetLatestDataOnFormOpen?: boolean;

        /**
         * Enable virtual scrolling for large datasets.
         * Improves performance when dealing with thousands of options.
         * @default false
         */
        virtualScroll?: boolean;

        /**
         * Dependent dropdown cascade.
         * When this dropdown value changes, reload these other dropdowns.
         * @example ['city', 'area'] - Reload city and area dropdowns
         */
        reloadDropdownsOfPath?: string[];

        /**
         * Required field dependencies.
         * Dropdown only loads data when these fields have values.
         * @example ['country', 'state'] - Only load if country and state are selected
         */
        isDependentOnPath?: string[];

        /** Tooltip text displayed on hover. */
        tooltip?: string;

        /** Tooltip position relative to the element. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        /** CSS class for tooltip styling. */
        tooltipStyleClass?: string;

        /** Custom event handlers and data transformation scripts. */
        jsCode?: {
            /**
             * Event type or lifecycle hook:
             * - modifyDropdownRequest: Before API call
             * - onceDropdownDataLoaded: After data loaded
             * - onChange: When selection changes
             *
             * Available variables:
             * - reqBody: Query object for modification
             * - formData: Complete form data
             * - dropdownData: Loaded options array
             * - reloadDropdownsOfPath: Array to trigger dependent reloads
             */
            appendTo: EDBMasterDropdownAppendTo,
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),

        }[],

        /**
         * Nested form configuration for adding new options.
         * Opens a modal to create new records that can be immediately selected.
         */
        addNewFormConfig?: IDBMasterConfig;

        /**
         * Custom API endpoint configuration.
         * Override default query API with custom endpoint and logic.
         */
        apiCallOverrides?: IDBMasterAPICallOverrides;
    };

    /**
     * Autocomplete control configuration.
     * Search and select from a list of options with type-ahead functionality.
     *
     * **Data Sources:**
     * - **static_data**: Predefined options array
     * - **db_data**: Options from database collection/table
     * - **api_call**: Custom API endpoint for dynamic data
     *
     * **Key Features:**
     * - Real-time search filtering
     * - Dropdown on arrow click
     * - Clear button support
     * - Lazy loading with virtual scrolling
     * - Min search length threshold
     * - Dependent field reloading
     *
     * @example
     * // Basic autocomplete with static data
     * autocompleteSettings: {
     *     dataSource: 'static_data',
     *     staticData: countries,
     *     optionLabel: 'name',
     *     showClear: true
     * }
     *
     * @example
     * // Database autocomplete with search filtering
     * autocompleteSettings: {
     *     dataSource: 'db_data',
     *     dbData: {
     *         collection: 'users',
     *         select: { fullName: 1, email: 1 },
     *         limit: 50
     *     },
     *     optionLabel: 'fullName',
     *     filterBy: 'fullName,email',
     *     minLengthForSearch: 2
     * }
     *
     * @example
     * // Cascading autocomplete with dependencies
     * autocompleteSettings: {
     *     dataSource: 'db_data',
     *     dbData: { collection: 'cities' },
     *     isDependentOnPath: ['countryId', 'stateId'],
     *     reloadDropdownsOfPath: ['districtId'],
     *     dropdown: true
     * }
     */
    // autocompleteSettings : start
    autocompleteSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        showClear?: boolean;

        /** Minimum number of characters to initiate a search. */
        minLengthForSearch?: number;

        /** Delay between keystrokes to wait before sending a query. */
        delay?: number;

        /** When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions. */
        forceSelection?: number;

        dataSource: 'static_data' | 'db_data' | 'api_call'; // custom_code = We can call any API in that.

        /** it will use used when dataSource is 'static_data'. */
        staticData?: any[]; // { label: string; value: any; }[] works default.

        /**
         * it can pickup IDB values from schema also.
         */
        dbData?: Partial<Pick<ICollectionIdentity, 'instance' | 'database' | 'collection' | 'table'>
            & Pick<IQueryFormat, 'find' | 'select' | 'limit' | 'deep' | 'sort'>>;

        /** Default : label */
        optionLabel?: string;

        /** Default : value */
        // optionValue?: string;

        /** one field or multiple comma separated fields are supported without any space in between. */
        filterBy?: string;
        filterMatchMode?: 'contains' | 'startsWith' | 'endsWith';

        /** Default : false, if true it will get latest data when form opens for add/edit operation. */
        alwaysGetLatestDataOnFormOpen?: boolean;

        /** Default : false, Make it true to handle huge amount of data. */
        virtualScroll?: boolean;

        /** on value change of current dropdown | auto complete | multi select, it will change values of these dropdowns | auto completes | multi selects and reload them. */
        reloadDropdownsOfPath?: string[];

        /** API call will happen when these values of path are present in formData */
        isDependentOnPath?: string[];

        /** Displays a button next to the input field when enabled. */
        dropdown?: boolean;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        addNewFormConfig?: IDBMasterConfig;

        apiCallOverrides?: IDBMasterAPICallOverrides;

        jsCode?: {
            /**
             * modifyDropdownRequest = It will run before hitting API call. So we can do whatever we want.<br/>
             * onceDropdownDataLoaded = Execute code when dropdown data is loaded.<br/>
             *
             * Available variables:<br/>
             * reqBody: IQueryFormat | any. Useful to modify apiCallOverrides also,<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * dropdownData: any[] = Latest loaded dropdown data<br/>
             * reloadDropdownsOfPath: string[] = Add path to this variable to reload its dropdown data.<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent.<br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             */
            appendTo: EDBMasterAutoCompleteAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),

        }[],

    };
    // autocompleteSettings : end

    /**
     * Multiselect control configuration.
     * Select multiple values from a list with chip-based display.
     *
     * **Data Sources:**
     * - **static_data**: Predefined options array
     * - **db_data**: Options from database collection/table
     * - **api_call**: Custom API endpoint for dynamic data
     *
     * **Key Features:**
     * - Multiple selection with checkboxes
     * - Selected items displayed as chips or comma-separated
     * - Searchable dropdown with filtering
     * - Select all / deselect all toggle
     * - Virtual scrolling for large datasets
     * - Selection limits and label overflow handling
     * - Option grouping support
     *
     * @example
     * // Basic multiselect with static data
     * multiselectSettings: {
     *     dataSource: 'static_data',
     *     staticData: skills,
     *     optionLabel: 'name',
     *     optionValue: 'id',
     *     display: 'chip',
     *     filter: true
     * }
     *
     * @example
     * // Database multiselect with selection limits
     * multiselectSettings: {
     *     dataSource: 'db_data',
     *     dbData: { collection: 'permissions' },
     *     optionLabel: 'name',
     *     display: 'chip',
     *     selectionLimit: 5,
     *     maxSelectedLabels: 3,
     *     selectedItemsLabel: '{0} permissions selected',
     *     showToggleAll: true
     * }
     *
     * @example
     * // Grouped multiselect options
     * multiselectSettings: {
     *     dataSource: 'static_data',
     *     staticData: groupedCities,
     *     optionLabel: 'name',
     *     optionGroupLabel: 'state',
     *     optionGroupChildren: 'cities',
     *     display: 'chip'
     * }
     */
    // multiselectSettings : start
    multiselectSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        showClear?: boolean;

        /** Minimum number of characters to initiate a search. */
        minLength?: number;

        /** Delay between keystrokes to wait before sending a query. */
        delay?: number;

        dataSource: 'static_data' | 'db_data' | 'api_call'; // custom_code = We can call any API in that.

        /** it will use used when dataSource is 'static_data'. */
        staticData?: any[]; // { label: string; value: any; }[] works default.

        /**
         * it can pickup IDB values from schema also.
         */
        dbData?: Partial<Pick<ICollectionIdentity, 'instance' | 'database' | 'collection' | 'table'>
            & Pick<IQueryFormat, 'find' | 'select' | 'limit' | 'deep' | 'sort'>>;

        /** Default : label */
        optionLabel?: string;

        /** Default : value */
        optionValue?: string;

        /** Whether to show the header. */
        showHeader?: boolean;

        /** Enable filter */
        filter?: boolean;

        /** one field or multiple comma separated fields are supported without any space in between. */
        filterBy?: string;

        /** Default: 'contains', Defines how the items are filtered.  */
        filterMatchMode?: 'endsWith' | 'startsWith' | 'contains' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';

        /** Default : false, if true it will get latest data when form opens for add/edit operation. */
        alwaysGetLatestDataOnFormOpen?: boolean;

        /** Default : false, Make it true to handle huge amount of data. */
        virtualScroll?: boolean;

        /** Decides how many selected item labels to show at most. */
        maxSelectedLabels?: number;

        /** Decides how many items can be selected at most. */
        selectionLimit?: number;

        /** Ex: "{0} items selected", Label to display after exceeding max selected labels. defaults "ellipsis" keyword to indicate a text-overflow. */
        selectedItemsLabel?: string;

        /** Whether to show the checkbox at header to toggle all items at once. */
        showToggleAll?: boolean;

        /** Name of the disabled field of an option. */
        optionDisabled?: string;

        /** Name of the label field of an option group. */
        optionGroupLabel?: string;

        /** Name of the options field of an option group. */
        optionGroupChildren?: string;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /**
         * Defines how the selected items are displayed.
         * @group Props
         */
        display: 'comma' | 'chip';

        /** on value change of current dropdown | auto complete | multi select, it will change values of these dropdowns | auto completes | multi selects and reload them. */
        reloadDropdownsOfPath?: string[];

        /** API call will happen when these values of path are present in formData */
        isDependentOnPath?: string[];

        addNewFormConfig?: IDBMasterConfig;

        apiCallOverrides?: IDBMasterAPICallOverrides;

        jsCode?: {
            /**
             * modifyDropdownRequest = It will run before hitting API call. So we can do whatever we want.<br/>
             * onceDropdownDataLoaded = Execute code when dropdown data is loaded.<br/>
             *
             * Available variables:<br/>
             * reqBody: IQueryFormat | any. Useful to modify apiCallOverrides also,<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * dropdownData: any[] = Latest loaded dropdown data<br/>
             * reloadDropdownsOfPath: string[] = Add path to this variable to reload its dropdown data.<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent.<br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             */
            appendTo: EDBMasterMultiSelectAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),

        }[],

    };
    // multiselectSettings : end

    /**
     * File upload control configuration.
     * Upload single or multiple files with validation and preview.
     *
     * **Key Features:**
     * - Single or multiple file selection
     * - File type restrictions (accept)
     * - File size validation
     * - File count limits
     * - Auto-upload or manual upload
     * - Upload/download/remove API integration
     *
     * **API Requirements:**
     * - Upload API should accept files in "files" form data field
     * - Upload API must return: `[{ originalName: string, uploadPath: string }]`
     * - Download API should return file content in base64 format
     *
     * @example
     * // Single image upload
     * fileUploadSettings: {
     *     uploadApiUrl: '/api/upload',
     *     downloadApiUrl: '/api/download',
     *     removeApiUrl: '/api/remove',
     *     accept: 'image/*',
     *     maxFileSize: 5000000, // 5MB
     *     multiple: false,
     *     auto: true
     * }
     *
     * @example
     * // Multiple document upload with limit
     * fileUploadSettings: {
     *     uploadApiUrl: '/api/upload-docs',
     *     accept: '.pdf,.doc,.docx',
     *     multiple: true,
     *     fileLimit: 5,
     *     maxFileSize: 10000000, // 10MB
     *     auto: false
     * }
     */
    // fileUploadSettings : start
    fileUploadSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** Default : false, When enabled, upload begins automatically after selection is completed. */
        auto?: boolean;

        /**
         * API URL which will be used to upload files.<br/>
         * API should return array of objects in below format.<br/>
         * You can have other properties and below properties are required.
         * [{
         *     originalName: string,
         *     uploadPath: string,
         * }]
         * API Maker's custom API will accept files in "files" form data field.
         *
         * */
        uploadApiUrl: string;
        /** API URL which returns content of file in base64 format. */
        downloadApiUrl?: string;
        removeApiUrl?: string;

        /** Allow to select multiple files or not */
        multiple?: boolean;

        /** ex : image/* */
        accept?: string;

        /** Maximum file size allowed in bytes. Default : 10000000 (10MB) */
        maxFileSize?: number;

        /** Maximum number of files that can be uploaded. */
        fileLimit?: number;

        /** Internal use property to show/hide upload button on UI control. */
        _showUploadButton?: boolean;

        /** internal use only */
        _fileSelectEvent?: any;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;
    };
    // fileUploadSettings : end

    /**
     * Divider control configuration.
     * Visual separator for form sections with optional text label.
     *
     * **Key Features:**
     * - Horizontal or vertical orientation
     * - Text alignment options
     * - Custom styling support
     * - Content types (solid line, dashed, dotted)
     *
     * @example
     * // Simple horizontal divider
     * dividerSettings: {
     *     layout: 'horizontal',
     *     type: 'solid'
     * }
     *
     * @example
     * // Divider with centered label
     * dividerSettings: {
     *     layout: 'horizontal',
     *     align: 'center',
     *     type: 'dashed'
     * }
     * // Use 'label' property in parent field to display text
     */
    // dividerSettings : start
    dividerSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        align?: 'center' | 'left' | 'right' | 'bottom' | 'top';
        type?: 'dashed' | 'dotted' | 'solid';
        dividerText?: string;
    };
    // dividerSettings : end

    /**
     * Accordion control configuration.
     * Collapsible panels for organizing form fields into sections.
     *
     * **Features:**
     * - Single or multiple panel expansion
     * - Default active panel selection
     * - Nested form fields within each panel
     * - Custom header styling and HTML
     * - Disabled panel support
     * - Event handlers for panel changes
     *
     * @example
     * // Single-panel accordion
     * accordionSettings: {
     *     defaultIndex: 0,
     *     multiple: false,
     *     tabs: [
     *         {
     *             header: 'Personal Information',
     *             fields: [[nameField], [emailField]]
     *         },
     *         {
     *             header: 'Address Details',
     *             fields: [[addressField], [cityField]]
     *         }
     *     ]
     * }
     *
     * @example
     * // Multiple panels with custom styling
     * accordionSettings: {
     *     defaultIndex: 0,
     *     multiple: true,
     *     activeIndex: [0, 1],
     *     tabs: [
     *         {
     *             header: '<i class="pi pi-user"></i> Profile',
     *             headerCssClass: 'custom-header',
     *             fields: [[profileFields]]
     *         },
     *         {
     *             header: 'Settings',
     *             disabled: true,
     *             fields: [[settingsFields]]
     *         }
     *     ]
     * }
     */
    // accordionSettings : start
    accordionSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** Index of the active tab or an array of indexes in multiple mode. */
        activeIndex?: number | number[];

        /** Default : 0, When form opens, this will be applied. */
        defaultIndex?: number;

        multiple?: boolean;
        tabs: {
            /** Give style object in angular style. */
            style?: any;

            /** Tab header, HTML is supported. */
            header: string;

            /** Give style object in angular style. */
            headerStyle?: any;

            /** You can provide single or multiple classes. */
            headerCssClass?: string,

            disabled?: boolean | string;
            fields: IDBMasterConfigFormField[][];
        }[];

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterAccordionAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // accordionSettings : end

    /**
     * Tab view control configuration.
     * Tabbed interface for organizing form fields into separate views.
     *
     * **Features:**
     * - Multiple tabs with individual form fields
     * - Default active tab selection
     * - Programmatic tab switching
     * - Custom tab header styling and HTML
     * - Disabled tab support
     * - Event handlers for tab changes
     *
     * @example
     * // Basic tab view
     * tabViewSettings: {
     *     defaultIndex: 0,
     *     tabs: [
     *         {
     *             header: 'General',
     *             fields: [[nameField], [descriptionField]]
     *         },
     *         {
     *             header: 'Advanced',
     *             fields: [[advancedField1], [advancedField2]]
     *         }
     *     ]
     * }
     *
     * @example
     * // Tabs with icons and custom styling
     * tabViewSettings: {
     *     activeIndex: 1,
     *     tabs: [
     *         {
     *             header: '<i class="pi pi-home"></i> Home',
     *             headerCssClass: 'tab-home',
     *             fields: [[homeFields]]
     *         },
     *         {
     *             header: '<i class="pi pi-cog"></i> Settings',
     *             disabled: false,
     *             fields: [[settingsFields]]
     *         },
     *         {
     *             header: 'Admin',
     *             disabled: true,
     *             fields: [[adminFields]]
     *         }
     *     ]
     * }
     */
    // tabViewSettings : start
    tabViewSettings?: {
        /** Index of the active tab to change selected tab programmatically. */
        activeIndex?: number;

        /** Default : 0, When form opens, this will be applied. */
        defaultIndex?: number;

        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        tabs: {
            /** Give style object in angular style. */
            style?: any;

            /** Tab header, HTML is supported. */
            header: string;

            /** Give style object in angular style. */
            headerStyle?: any;

            /** You can provide single or multiple classes. */
            headerCssClass?: string,

            disabled?: boolean;
            fields: IDBMasterConfigFormField[][];
        }[];

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterTabViewAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // tabViewSettings : end

    /**
     * Button control configuration.
     * Clickable button with icon, loading state, and style variants.
     *
     * **Features:**
     * - Icon support with positioning (left/right/top/bottom)
     * - Loading state with custom icon
     * - Multiple severity levels (primary, success, info, warning, danger)
     * - Style variants (raised, rounded, text, outlined, link)
     * - Badge support
     * - Size options (small, large)
     * - Custom click handlers
     *
     * @example
     * // Basic button
     * buttonSettings: {
     *     label: 'Submit',
     *     severity: 'primary',
     *     icon: 'pi pi-check'
     * }
     *
     * @example
     * // Loading button
     * buttonSettings: {
     *     label: 'Processing...',
     *     loading: true,
     *     loadingIcon: 'pi pi-spin pi-spinner',
     *     severity: 'info'
     * }
     *
     * @example
     * // Outlined button with badge
     * buttonSettings: {
     *     label: 'Notifications',
     *     icon: 'pi pi-bell',
     *     outlined: true,
     *     badge: '5',
     *     badgeClass: 'p-badge-danger'
     * }
     *
     * @example
     * // Rounded icon button
     * buttonSettings: {
     *     label: '',
     *     icon: 'pi pi-plus',
     *     rounded: true,
     *     raised: true,
     *     severity: 'success',
     *     size: 'large'
     * }
     */
    // buttonSettings : start
    buttonSettings?: {
        /** button label text */
        label: string;

        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** Add a link style to the button. */
        link?: boolean;

        /** ex: pi pi-check , give icon to button */
        icon?: string,

        /** default : left */
        iconPos?: 'left' | 'right' | 'top' | 'bottom';

        /** Whether the button is in loading state. */
        loading?: boolean;

        /** Icon to display in loading state. */
        loadingIcon?: string;

        /** Defines the style of the button. */
        severity?: uiMakerComponentSeverity | null | undefined;

        /** Add a shadow to indicate elevation. */
        raised?: boolean;

        /** Add a circular border radius to the button. */
        rounded?: boolean;

        /** Add a textual class to the button without a background initially. */
        text?: boolean;

        /** Add a border class without a background initially. */
        outlined?: boolean;

        /** Value of the badge. */
        badge?: string;

        /** Style class of the badge. */
        badgeClass?: string;

        /** Style class of the badge. */
        size?: 'small' | 'large' | undefined | null;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterButtonAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // buttonSettings : end

    /**
     * Image display control configuration.
     * Display images with preview functionality and custom styling.
     *
     * **Features:**
     * - Image source URL
     * - Width/height control
     * - Preview mode with fullscreen
     * - Alt text for accessibility
     * - Custom parent container styling
     * - Tooltip support
     *
     * @example
     * // Basic image display
     * imageSettings: {
     *     src: '/assets/logo.png',
     *     width: '200px',
     *     height: 'auto',
     *     alt: 'Company Logo'
     * }
     *
     * @example
     * // Image with preview
     * imageSettings: {
     *     src: '/uploads/product-thumb.jpg',
     *     previewImageSrc: '/uploads/product-full.jpg',
     *     preview: true,
     *     width: '100px',
     *     height: '100px'
     * }
     *
     * @example
     * // Dynamic image from form data
     * imageSettings: {
     *     src: '', // Set via jsCode
     *     preview: true,
     *     jsCode: [{
     *         appendTo: 'onInit',
     *         code: ($scope) => {
     *             $scope.column.imageSettings.src = $scope.formData.profilePicture;
     *         }
     *     }]
     * }
     */
    // imageSettings : start
    imageSettings?: {
        src: string;

        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** it will be assigned to span which is parent of image tag. */
        imageParentSpanClass?: string,

        /** Attribute of the image element. */
        width?: string;

        /** Attribute of the image element. */
        height?: string;

        /** Attribute of the preview image element. */
        alt?: string;

        /** Controls the preview functionality. */
        preview?: boolean;

        /** The source path for the preview image. */
        previewImageSrc?: string;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterImageAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // imageSettings : end

    /**
     * Custom HTML control configuration.
     * Render arbitrary HTML content within the form.
     *
     * **Use Cases:**
     * - Custom formatted text and headings
     * - Embedded widgets or iframes
     * - Custom styling and layout elements
     * - Rich content display
     *
     * ⚠️ **Security Warning:**
     * HTML content is sanitized to prevent XSS attacks.
     * Some tags and attributes may be stripped.
     *
     * @example
     * // Custom heading
     * customHTMLSettings: {
     *     htmlCode: '<h3 style="color: blue;">Section Title</h3>'
     * }
     *
     * @example
     * // Information box
     * customHTMLSettings: {
     *     htmlCode: `
     *         <div class="alert alert-info">
     *             <strong>Note:</strong> Please review all fields carefully.
     *         </div>
     *     `
     * }
     */
    // customHTMLSettings : start
    customHTMLSettings?: {
        htmlCode: string;
    };
    // customHTMLSettings : end

    /**
     * Knob control configuration.
     * Circular dial input for numeric value selection.
     *
     * **Features:**
     * - Min/max range
     * - Step increment
     * - Custom colors (value, range, text)
     * - Adjustable size and stroke width
     * - Value template formatting
     * - Rotary interaction
     *
     * @example
     * // Volume knob (0-100)
     * knobSettings: {
     *     min: 0,
     *     max: 100,
     *     step: 1,
     *     size: 150,
     *     valueColor: '#3b82f6',
     *     valueTemplate: '{value}%'
     * }
     *
     * @example
     * // Temperature knob with custom colors
     * knobSettings: {
     *     min: -10,
     *     max: 50,
     *     step: 0.5,
     *     valueColor: '#ef4444',
     *     rangeColor: '#d1d5db',
     *     textColor: '#1f2937',
     *     valueTemplate: '{value}°C',
     *     size: 200,
     *     strokeWidth: 12
     * }
     */
    // knobSettings : start
    knobSettings?: {
        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /** Style class of the component. */
        cssClass?: string | undefined;

        /** Inline style of the component. */
        style?: any;

        /** Background of the value. */
        valueColor?: string | undefined;

        /** Background color of the range. */
        rangeColor?: string;

        /** Color of the value text. */
        textColor?: string;

        /** Template string of the value. */
        valueTemplate?: string;

        /** Size of the component in pixels. */
        size?: number;

        /** Step factor to increment/decrement the value. */
        step?: number;

        /** Minimum boundary value. */
        min?: number;

        /** Maximum boundary value. */
        max?: number;

        /** Width of the knob stroke. */
        strokeWidth?: number;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterKnobAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string | (($scope: IDBMasterUIPageUtilsScope) => any),
        }[],
    };
    // knobSettings : end

// genericConfig : start
}

// genericConfig : end

/**
 * Validation rules for schema properties and form fields.
 * Define constraints that values must satisfy before being saved.
 */
export interface IPropertyValidation {
    /**
     * Field is mandatory and must have a non-null, non-empty value.
     * Applicable to all data types.
     */
    required?: boolean;
    /**
     * Minimum allowed value.
     * Applicable to: number, date
     */
    min?: number;
    /**
     * Maximum allowed value.
     * Applicable to: number, date
     */
    max?: number;
    /**
     * Minimum string/array length.
     * Applicable to: string, array
     */
    minLength?: number;
    /**
     * Maximum string/array length.
     * Applicable to: string, array
     */
    maxLength?: number;
    /**
     * Value must be unique across all records.
     * @deprecated API Maker maintains uniqueness internally.
     * Avoid using on tables with frequent updates due to performance impact.
     */
    unique?: boolean;
    /**
     * Validate email address format.
     * Applicable to: string
     */
    email?: boolean;
    /**
     * Custom validation function.
     * Return true if valid, false or error message if invalid.
     */
    validatorFun?: Function;

    /**
     * Enumeration constraint - value must be from this array.
     * @example ['active', 'inactive', 'pending']
     */
    enum?: any[];
}

// dropdownSettings : start
export enum EDBMasterDropdownAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    modifyDropdownRequest = 'modifyDropdownRequest',
    onceDropdownDataLoaded = 'onceDropdownDataLoaded',
    onChange = 'onChange',
}

// dropdownSettings : end

// autocompleteSettings : start
export enum EDBMasterAutoCompleteAppendTo {
    onSelect = 'onSelect',
    visible = 'visible',
    disabled = 'disabled',
    modifyAutoCompleteRequest = 'modifyAutoCompleteRequest',
    onceAutoCompleteDataLoaded = 'onceAutoCompleteDataLoaded',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
    onShow = 'onShow',
    onHide = 'onHide',
    onClear = 'onClear',
    onDropdownClick = 'onDropdownClick',
}

// autocompleteSettings : end

// multiselectSettings : start
export enum EDBMasterMultiSelectAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    modifyMultiSelectRequest = 'modifyMultiSelectRequest',
    onceMultiSelectDataLoaded = 'onceMultiSelectDataLoaded',
    onChange = 'onChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
    onClear = 'onClear',
    onSelectAllChange = 'onSelectAllChange',
}

// multiselectSettings : end

// inputTextSettings : start
export enum EDBMasterInputTextAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// inputTextSettings : end

// inputOtpSettings : start
export enum EDBMasterInputOtpAppendTo {
    visible = 'visible',
    disabled = 'disabled',
}

// inputOtpSettings : end

// buttonSettings : start
export enum EDBMasterButtonAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    click = 'click',
}

// buttonSettings : end

// imageSettings : start
export enum EDBMasterImageAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    click = 'click',
}

// imageSettings : end

// inputNumberSettings : start
export enum EDBMasterInputNumberAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// inputNumberSettings : end

// tabViewSettings : start
export enum EDBMasterTabViewAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    activeIndexChange = 'activeIndexChange',
}

// tabViewSettings : end

// dividerSettings : start
export enum EDBMasterDividerAppendTo {
    visible = 'visible',
}

// dividerSettings : end

// accordionSettings : start
export enum EDBMasterAccordionAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    activeIndexChange = 'activeIndexChange',
}

// accordionSettings : end

// customHTMLSettings : start
export enum EDBMasterCustomHtmlAppendTo {
    visible = 'visible',
}

// customHTMLSettings : end

// inputMaskSettings : start
export enum EDBMasterInputMaskAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',

    /** If you are trying to modify model value in blur it will not work. It is old bug in PrimeNG. Use complete method instead. */
    blur = 'blur',
    complete = 'complete',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// inputMaskSettings : end

// inputPasswordSettings : start
export enum EDBMasterInputPasswordAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// inputPasswordSettings : end

// textAreaSettings : start
export enum EDBMasterTextAreaAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// textAreaSettings : end

// editorSettings : start
export enum EDBMasterEditorAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    onTextChange = 'onTextChange',
    onInit = 'onInit',
    onSelectionChange = 'onSelectionChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// editorSettings : end

// checkboxSettings : start
export enum EDBMasterCheckboxAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
}

// checkboxSettings : end

// ratingSettings : start
export enum EDBMasterRatingAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    onRate = 'onRate',
    onCancel = 'onCancel',
    onFocus = 'onFocus',
    onBlur = 'onBlur',
}

// ratingSettings : end

// knobSettings : start
export enum EDBMasterKnobAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
}

// knobSettings : end

// radioSettings : start
export enum EDBMasterRadioAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
}

// radioSettings : end

// colorPickerSettings : start
export enum EDBMasterColorPickerAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
}

// colorPickerSettings : end

// datePickerSettings : start
export enum EDBMasterDatePickerAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
}

// datePickerSettings : end

// fileUploadSettings : start
export enum EDBMasterFileUploadAppendTo {
    visible = 'visible',
    disabled = 'disabled',
}

// fileUploadSettings : end

// gridSettings : start
export enum EDBMasterGridAppendTo {
    visible = 'visible',
    disabled = 'disabled',
}

// gridSettings : end

/**
 * Custom code execution hooks for DB Master lifecycle events.
 * Defines when and where custom JavaScript code runs in the application.
 */
export enum EDBMasterConfigAppendTo {
    /**
     * Execute once on initial page load.
     * Appends script to page <script> tag.
     * ⚠️ Note: config and globalData are NOT available in this hook.
     */
    oncePageLoad = 'oncePageLoad',

    /**
     * Execute once on page load with full context.
     * Available: config, globalData, utils, queryParams
     * Use this for initialization that needs access to configuration.
     */
    oncePageLoadWithContext = 'oncePageLoadWithContext',

    /**
     * Execute every time grid renders data.
     * Available: gridEvent, gridData, globalData, utils, queryParams
     * Use for dynamic row styling or data transformation.
     */
    gridRender = 'gridRender',

    /**
     * Modify grid API request before execution.
     * Available: gridEvent, reqBody (IQueryFormat), globalData, utils, queryParams
     * Use to add custom filters or modify query parameters.
     */
    modifyGridRequest = 'modifyGridRequest',

    /**
     * Execute once after initial grid data load.
     * Available: gridData, globalData, utils, queryParams
     */
    onceGridDataLoaded = 'onceGridDataLoaded',

    /**
     * Execute before save/edit operations.
     * Modify data before saving, updating, or importing.
     * Available: reqBody (any | any[]), globalData, utils, queryParams, mode ('save' | 'edit' | 'import')
     */
    preSaveAndEdit = 'preSaveAndEdit',

    /**
     * Execute before save form dialog opens.
     * Pre-populate or transform form data for new records.
     * Available: formData, globalData, utils, queryParams
     */
    beforeSaveModalOpen = 'beforeSaveModalOpen',

    /**
     * Execute before edit form dialog opens.
     * Transform loaded data before displaying in edit form.
     * Available: formData, globalData, utils, queryParams
     */
    beforeEditModalOpen = 'beforeEditModalOpen',

    /**
     * Execute before view form dialog opens.
     * Transform data before displaying in read-only view.
     * Available: formData, globalData, utils, queryParams
     */
    beforeViewModalOpen = 'beforeViewModalOpen',

    /**
     * Execute when user changes column visibility.
     * React to column show/hide events.
     */
    columnSelectionChanged = 'columnSelectionChanged',

    /**
     * Generate custom delete confirmation dialog.
     * Must return IConfirmDialogSettings object.
     */
    deleteConfirmationDialogGenerator = 'deleteConfirmationDialogGenerator',

    /**
     * Generate custom delete-all confirmation dialog.
     * Must return IConfirmDialogSettings object.
     */
    deleteAllConfirmationDialogGenerator = 'deleteAllConfirmationDialogGenerator',

    /**
     * Generate custom edit confirmation dialog.
     * Must return IConfirmDialogSettings object.
     */
    editConfirmationDialogGenerator = 'editConfirmationDialogGenerator',

    /**
     * Generate custom save confirmation dialog.
     * Must return IConfirmDialogSettings object.
     */
    saveConfirmationDialogGenerator = 'saveConfirmationDialogGenerator',

    /**
     * Process grid data before CSV export.
     * Modify gridData for export (does not affect displayed data).
     * Available: gridData (mutable copy), globalData, utils, queryParams
     */
    processDataBeforeExport = 'processDataBeforeExport',

    /**
     * Process grid data before PDF export.
     * Modify gridData for PDF generation (does not affect displayed data).
     *
     * Available: gridData (mutable copy), jsPdfDoc, globalData, utils, queryParams
     *
     * **jsPdfDoc**: Pre-created jsPDF instance. You can customize or replace it.
     *
     * @example
     * // Customize PDF document
     * const { jsPDF } = window.jspdf;
     * const doc = new jsPDF({
     *     orientation: 'landscape',
     *     format: 'a4'
     * });
     * $scope.jsPdfDoc = doc;
     * $scope.jsPdfDoc.text("Custom Report Title", 14, 15);
     */
    processDataBeforePDFExport = 'processDataBeforePDFExport',
}

/**
 * Available form control types for UI generation.
 * Each control type has specific settings and behavior.
 */
export enum EDBMasterFormControl {
    /** Single-line text input. */
    input = 'input',
    /** Numeric input with spinner buttons and formatting. */
    inputNumber = 'inputNumber',
    /** Text input with pattern-based masking (phone, SSN, etc.). */
    inputMask = 'inputMask',
    /** One-time password multi-character input. */
    inputOtp = 'inputOtp',
    /** Password input with visibility toggle and strength meter. */
    password = 'password',
    /** Date and/or time picker with calendar popup. */
    date_picker = 'date_picker',
    /** Multi-line text input. */
    textarea = 'textarea',
    /** Rich text WYSIWYG editor. */
    editor = 'editor',
    /** Binary checkbox (true/false). */
    checkbox = 'checkbox',
    /** Radio button group for single selection. */
    radio = 'radio',
    /** Color picker with multiple format support. */
    color_picker = 'color_picker',
    /** Dropdown select with single selection. */
    dropdown = 'dropdown',
    /** Autocomplete with type-ahead search. */
    auto_complete = 'auto_complete',
    /** Multi-select dropdown with chip display. */
    multi_select = 'multi_select',
    /** File upload with validation. */
    file_upload = 'file_upload',
    /** Nested data grid for one-to-many relationships. */
    grid = 'grid',
    /** Visual separator line. */
    divider = 'divider',
    /** Star-based rating input. */
    rating = 'rating',
    /** Circular dial for numeric input. */
    knob = 'knob',

    /** Collapsible accordion panels (field container). */
    accordion = 'accordion',
    /** Tabbed view for organizing fields (field container). */
    tab_view = 'tab_view',

    /** Clickable button with custom actions. */
    button = 'button',
    /** Image display with preview. */
    image = 'image',
    /** Custom HTML content. */
    customHTML = 'customHTML',
}

export enum EDBMasterCustomActionButtonAppendTo {
    click = 'click',
}

// genericConfig : end

export interface IDBMasterMessageFromIframeToParent {
    fromDBMaster: string;
    eventType: IDBMasterEventFromIframeToParent;
    eventData: any;
}

export interface IDBMasterMessageFromParentToIframe {
    eventType: IDBMasterEventFromParentToIframe;
    eventData: any;
}

/**
 * Events sent from DB Master iframe to parent window.
 * Used for iframe-parent communication when DB Master UI is embedded.
 */
export enum IDBMasterEventFromIframeToParent {
    /** DB Master UI has fully loaded and is ready. */
    PAGE_READY = 'PAGE_READY',
    /** New record was successfully saved. */
    RECORD_SAVED = 'RECORD_SAVED',
    /** Multiple records were imported successfully. */
    RECORDS_IMPORTED = 'RECORDS_IMPORTED',
    /** Existing record was updated. */
    RECORD_UPDATED = 'RECORD_UPDATED',
    /** Single record was deleted. */
    RECORD_DELETED = 'RECORD_DELETED',
    /** Multiple records were deleted. */
    MANY_RECORD_DELETED = 'MANY_RECORD_DELETED',
    /** Grid data was exported (CSV/PDF). */
    GRID_EXPORTED = 'GRID_EXPORTED',
    /** Grid data was manually refreshed. */
    GRID_REFRESHED = 'GRID_REFRESHED',
    /** User clicked the "Add New" button. */
    ADD_NEW_BUTTON_CLICKED = 'ADD_NEW_BUTTON_CLICKED',
    /** User clicked the "Close" button. */
    CLOSE_BUTTON_CLICKED = 'CLOSE_BUTTON_CLICKED',
    /** User clicked a custom action button. */
    CUSTOM_ACTION_BUTTON_CLICKED = 'CUSTOM_ACTION_BUTTON_CLICKED',
    /** New record saved via dropdown "Add New" dialog. */
    DROPDOWN_ADD_NEW_RECORD_SAVED = 'DROPDOWN_ADD_NEW_RECORD_SAVED',
    /** User double-clicked a grid row. */
    DOUBLE_CLICK_GRID_EVENT = 'DOUBLE_CLICK_GRID_EVENT',
    /** User clicked a grid row. */
    CLICK_GRID_EVENT = 'CLICK_GRID_EVENT',
}

/**
 * Commands sent from parent window to DB Master iframe.
 * Allows parent to control embedded DB Master UI behavior.
 */
export enum IDBMasterEventFromParentToIframe {
    /**
     * Programmatically trigger "Add New" button click.
     * Opens add form dialog.
     */
    TRIGGER_ADD_NEW_BUTTON_CLICK = 'TRIGGER_ADD_NEW_BUTTON_CLICK',

    /**
     * Programmatically trigger grid refresh.
     * Reloads grid data from server.
     */
    TRIGGER_REFRESH_BUTTON_CLICK = 'TRIGGER_REFRESH_BUTTON_CLICK',

    /**
     * Inject query conditions into grid data fetch.
     * eventData: Object merged into find query.
     * @example { status: 'active', companyId: '123' }
     */
    DATA_TO_APPEND_IN_GRID_LOAD_FIND_QUERY = 'DATA_TO_APPEND_IN_GRID_LOAD_FIND_QUERY',

    /**
     * Inject additional data into save API payload.
     * eventData: Object merged into new record data.
     * @example { createdBy: 'parentApp', tenantId: '456' }
     */
    DATA_TO_APPEND_IN_RECORD_SAVE_API_PAYLOAD = 'DATA_TO_APPEND_IN_RECORD_SAVE_API_PAYLOAD',

    /**
     * Inject additional data into update API payload.
     * eventData: Object merged into update record data.
     * @example { modifiedBy: 'parentApp' }
     */
    DATA_TO_APPEND_IN_RECORD_UPDATE_API_PAYLOAD = 'DATA_TO_APPEND_IN_RECORD_UPDATE_API_PAYLOAD',

    /**
     * Set global data accessible in custom scripts.
     * eventData: Object available as $scope.globalData in all hooks.
     * @example { userRole: 'admin', permissions: [...] }
     */
    SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT = 'SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT',

    /**
     * Signal that parent has finished initialization.
     * Send this after all data injection messages are sent.
     */
    PARENT_READY = 'PARENT_READY',
}

/**
 * Scope object ($scope) available in custom JavaScript code execution contexts.
 * Provides access to form data, utilities, and system functions.
 */
export interface IDBMasterUIPageUtilsScope {
    /** User-provided global data passed from parent via SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event. */
    globalData: any;
    /** Utility functions and helper methods for common operations. */
    utils: {
        /** Current database schema definition. */
        schema: any;
        /** Database master configuration object. */
        dbMaser: any;
        /** Map of field paths to error messages. */
        errorsMap: { [path: string]: string };
        /** Toast notification service for user feedback. */
        messageService: {
            /** Display error notification. */
            showErrorToast(msg: string, otherProps?: any): void;
            /** Display success notification. */
            showSuccessToast(msg: string, otherProps?: any): void;
            /** Display information notification. */
            showInfoToast(msg: string, otherProps?: any): void;
            /** Display warning notification. */
            showWarningToast(msg: string, otherProps?: any): void;
        }

        /** Grid and form operation triggers. */
        operations: {
            /** Reload grid data from the server. */
            refreshGrid(): Promise<void>;

            /** Open form dialog in add mode. */
            openFormInAddMode(): Promise<void>;

            /**
             * Open form dialog in edit mode with existing record.
             * @param id Record identifier to edit
             */
            openFormInEditMode(id: any): Promise<void>;

            /**
             * Open form dialog in view-only mode.
             * @param id Record identifier to view
             */
            openFormInViewMode(id: any): Promise<void>;

            /**
             * Delete record without confirmation dialog.
             * @param id Record identifier to delete
             */
            deleteRecord(id: any): Promise<void>;
        }

        /**
         * Flatten nested form field structure into a single array.
         * Excludes fields from nested grid controls (which have separate forms).
         * Only includes fields with a path property.
         * Excludes accordion and tab control fields from nested grids.
         */
        getFlatArrayOfAllFormFields(
            fields: IDBMasterConfigFormField[][]
        ): Promise<IDBMasterConfigFormField[]>;

        /**
         * Flatten nested form field structure including grid control fields.
         * Includes all fields from accordions, tabs, and nested grids.
         */
        getFlatArrayOfAllFormFieldsIncludingGridFields(
            fields: IDBMasterConfigFormField[][]
        ): Promise<IDBMasterConfigFormField[]>;

        /**
         * Find form field by path or hiddenId.
         * Searches through all fields including grid controls.
         * @param pathOrHiddenId Field path or unique hidden identifier
         */
        findFormElement(pathOrHiddenId: string): IDBMasterConfigFormField | undefined;

        /**
         * Find all form fields of a specific control type.
         * @param control Control type to search for
         */
        findFormElementOfControl(control: EDBMasterFormControl): IDBMasterConfigFormField[];

        /**
         * Find grid column configuration by field path.
         * @param path Column field path
         */
        findGridElement(path: string): IDBMasterConfigGridField | undefined;

        /**
         * Set filter value and trigger automatic filtering.
         * @param path Column field path
         * @param value Filter value to apply
         */
        setValueInFilterOfTopGrid(path: string, value: any): void;

        /**
         * Convert array of objects to CSV string format.
         * @param dataArr Array of objects to convert
         * @param papaUnparseOptions PapaParse configuration options
         * @see {@link https://www.papaparse.com/docs#unparse-config-default PapaParse Documentation}
         */
        convertArrayToCSV(dataArr: any[], papaUnparseOptions?: any): string;

        /**
         * Trigger file download in the browser.
         * @param fileContent File content as string
         * @param filename Suggested filename with extension
         * @param fileType MIME type (e.g., 'text/csv', 'application/json')
         */
        download(fileContent: string, filename: string, fileType: string): void;

        /**
         * Update object properties without changing reference.
         * Clears all existing properties and assigns new ones.
         * Essential for $scope updates to trigger change detection.
         * @example
         * const newData = await apiCall();
         * utils.setDataInObject($scope.apiResponse, newData);
         */
        setDataInObject(oldObject: any, newObject: any): void;

        /**
         * Update array contents without changing reference.
         * Removes all existing elements and adds new ones.
         * Essential for $scope updates to trigger change detection.
         * @example
         * const newItems = await fetchItems();
         * utils.setDataInArray($scope.gridData, newItems);
         */
        setDataInArray(oldArray: any[], newArray: any[]): void;

        /**
         * Sanitize HTML content to prevent XSS attacks.
         * @param value HTML string to sanitize
         * @param type Sanitization type ('html' or 'url')
         */
        sanitizeHtml(value: string | undefined, type?: 'html' | 'url'): any;
    };
    /** URL query parameters from the page URL. */
    queryParams: any;
    /** User-defined utility functions and helpers. */
    userUtils: { [utilName: string]: any };
    /** Native browser event object (when applicable). */
    event: any | null;
    /** Database Master configuration object. */
    config: IDBMasterConfig | null;
    /** Current form field configuration. */
    column: IDBMasterConfigFormField | null;

    /**
     * Parent and grandparent form data context.
     * Changes to these objects automatically update their respective UIs.
     * Useful for validation and cross-form logic.
     */
    parentFormData: any | null;
    /** Current form data object. */
    formData: any | null;
    /** Map of all loaded dropdown data indexed by field path. */
    allDropdownDataMap: { [path: string]: any[] } | null;
    /** Request body for API calls (available in API-related hooks). */
    reqBody: any | null;
    /** Grid data array (available in grid-related hooks). */
    gridData: any[] | null;
    /** Dropdown options array (available in dropdown-related hooks). */
    dropdownData: any[] | null;
    /**
     * Array of field paths to reload.
     * Add paths to trigger dependent dropdown/autocomplete/multiselect reloads.
     */
    reloadDropdownsOfPath: string[] | null;
    /**
     * Current operation mode.
     * @values 'save' | 'edit' | 'view' | 'import'
     */
    mode: 'save' | 'edit' | 'view' | 'import' | null,
    /** API response object (available in post-API hooks). */
    apiResponse: any | null;
    /** HTTP headers for API requests. */
    headers: any | null;
    /** Selected grid items (single object or array depending on selection mode). */
    selectedGridItems: any | null;

    /**
     * Get by ID API response.
     * Available in: EDBMasterConfigAppendTo.beforeSaveModalOpen
     */
    getByIdResp: any | null;
    /** Environment configuration with backend host and port. */
    env: {
        /** Backend server URL with port. */
        BE_HOST_PORT: string,
    },

    /**
     * jsPDF document instance for PDF generation.
     * Available in PDF export hooks.
     *
     * @example
     * const { jsPDF } = window.jspdf;
     * const doc = new jsPDF({
     *     orientation: 'landscape',
     *     format: 'a4'
     * });
     * $scope.jsPdfDoc = doc;
     * $scope.jsPdfDoc.text("Custom PDF Title", 14, 15);
     */
    jsPdfDoc?: any;
}

/**
 * Special properties that can be added to grid row data to control button visibility.
 * Add these properties to individual row objects to conditionally hide action buttons.
 *
 * @example
 * // Hide delete button for a specific row
 * rowData.____hide_delete_button = true;
 *
 * @example
 * // Hide custom action named 'approve'
 * rowData.____hide_approve = true;
 */
export enum EDBMasterSpecialRowProperties {
    /**
     * When truthy, hides the delete button for this specific row.
     * Useful for protecting certain records from deletion.
     */
    ____hide_delete_button = '____hide_delete_button',

    /**
     * When truthy, hides the edit button for this specific row.
     * Useful for read-only records or locked entries.
     */
    ____hide_edit_button = '____hide_edit_button',

    /**
     * When truthy, hides the view button for this specific row.
     * Useful for restricting access to certain record details.
     */
    ____hide_view_button = '____hide_view_button',
}

// ==== DB Master configurations End ====
