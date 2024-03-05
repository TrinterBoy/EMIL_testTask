import 'dotenv/config';
import { Accident, Contract, User } from '../../../../libs/global/src/shared/models';

type Config = {
  dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

class AppConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): AppConfig {
    for (const k of keys) this.getValue(k, true);
    return this;
  }

  public getHost(): string {
    return this.getValue('HOST') || '0.0.0.0';
  }

  public getPort(): string | number {
    return this.getValue('PORT');
  }

  public getAppSecret(): string | undefined {
    return this.getValue('APP_SECRET', true);
  }

  public getJwtExpired(): string | undefined {
    return this.getValue('JWT_EXPIRED', true);
  }

  public getPostgresConnection(): Config {
    return {
      dialect: 'postgres',
      host: this.getValue('POSTGRES_HOST', true),
      port: +this.getValue('POSTGRES_PORT', true),
      username: this.getValue('POSTGRES_USERNAME', true),
      password: this.getValue('POSTGRES_PASSWORD', true),
      database: this.getValue('POSTGRES_DATABASE', true),
    };
  }
}

const appConfig = new AppConfig(process.env).ensureValues([
  'PORT',
  'APP_SECRET',
  'JWT_EXPIRED',
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USERNAME',
  'POSTGRES_DATABASE',
  'POSTGRES_PASSWORD',
]);

const models = [User, Contract, Accident];

export { appConfig, models };
