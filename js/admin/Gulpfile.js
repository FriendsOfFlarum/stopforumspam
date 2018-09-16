var gulp = require('flarum-gulp');

gulp({
  modules: {
    'reflar/stopforumspam': [
      'src/**/*.js',
    ]
  }
});
