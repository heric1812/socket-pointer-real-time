module.exports = {
  apps: [
    {
      name: 'mes_socket',
      script: './index.js',
      instances: 1,
      autorestart: true,
      watch: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'development',
        PORT: '3400',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '3400',
      },
    },
    // {
    //   script: 'index.js',
    //   watch: '.',
    // },
    // {
    //   script: './service-worker/',
    //   watch: ['./service-worker'],
    // },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
}
