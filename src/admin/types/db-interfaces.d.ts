export namespace Bata {
export namespace bata_db {
export interface IPublicEmailConfig {
    id?: number;
    configuration_name: string;
    email_engine: string;
    username: string;
    password: string;
    smtp_host: string;
    port: number;
    from_email: string;
    use_tls?: boolean;
    use_ssl?: boolean;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
export type IPublicEmailConfig_P = Partial<IPublicEmailConfig>;
export type IPublicEmailConfig_S = { [Property in keyof IPublicEmailConfig_P]: 1 | -1 };
} }
export namespace Bata {
export namespace bata_db {
export interface IPublicUsers {
    id?: number;
    username: string;
    password: string;
    email?: string;
    user_type?: string;
    unit_id?: number;
    active?: boolean;
    created_at?: Date;
}
export type IPublicUsers_P = Partial<IPublicUsers>;
export type IPublicUsers_S = { [Property in keyof IPublicUsers_P]: 1 | -1 };
} }