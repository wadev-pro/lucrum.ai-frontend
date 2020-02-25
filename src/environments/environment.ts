// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  name: 'localhost',
  apiUrl: 'https://staging-dashboard-api.lucrum.ai/api',
  actionApiUrl: 'https://api.lucrum.ai/api',
  actionApiUser: 'superadmin@boomsauce.media',
  actionApiPassword: '@boomsaucemedia123',
  billingApiUrl: 'https://billing-dashboard-api.lucrum.ai',
  stripePublishableKey: 'pk_test_I76aJlT9M1En5ZiWviiE8bJZ00uOvdfsYs' // test key
};
