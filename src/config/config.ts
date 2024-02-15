import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => ({
  name: 'ms-gateway',
  description: 'Microservice Gateway',
  version: '0.0.1',
  keywords: ['gateway', 'microservices', 'connected-bar', 'raspberry-pi'],
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  environment: process.env.ENV_NAME,
});
