/*******************************
 *           Set-up
 *******************************/

var
  gulp   = require('gulp'),

  // read user config to know what task to load
  config = require('./semantic/dist/tasks/config/user')
;


/*******************************
 *            Tasks
 *******************************/

require('./semantic/dist/tasks/collections/build')(gulp);
require('./semantic/dist/tasks/collections/various')(gulp);
require('./semantic/dist/tasks/collections/install')(gulp);

gulp.task('default', gulp.series('watch'));

/*--------------
      Docs
---------------*/

require('./semantic/dist/tasks/collections/docs')(gulp);

/*--------------
      RTL
---------------*/

if (config.rtl) {
  require('./semantic/dist/tasks/collections/rtl')(gulp);
}
