import { env as loadEnv } from 'custom-env';
import { z } from 'zod/v4';

/* Schema and type for environment variables */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_STAGE: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().positive().default(3000),
  DATABASE_UR: z.string().startsWith('postgresql://'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20),
});
type Env = z.infer<typeof envSchema>;

/* boolean flags for environment */
process.env['APP_STAGE'] = process.env['APP_STAGE'] ?? 'development';
const isProduction = process.env['APP_STAGE'] === 'production';
const isDevelopment = process.env['APP_STAGE'] === 'development';
const isStage = process.env['APP_STAGE'] === 'stage';

/* load environment variables */
if (isDevelopment) {
  loadEnv();
} else if (isStage) {
  loadEnv('stage');
}

/* validate environment variables */
let env: Env;
try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Invalid environment variables:');
    console.error(JSON.stringify(error.flatten((issue) => issue.message).fieldErrors, null, 2));

    error.issues.forEach((err) => {
      const path = err.path.join('.');
      console.log(`${path}: ${err.message}`);
    });
    process.exit(1);
  }

  throw error;
}

export { isDevelopment, isProduction, isStage, env };
export type { Env };
