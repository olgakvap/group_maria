module.exports = {
  //require: ['@babel/register', 'specs/seeds.js'],
  require: ['test/helpers/seed.js'],
  spec: 'test/api/**/*.spec.js',
  // exclude: 'specs/signin/registration.spec.js',
  timeout: 10000,
};
