'use strict';

const fse = require('fs-extra');
const gulp = require('gulp');
const jeditor = require("gulp-json-editor");

const config = {
  distDir: 'dist/ng2-contentful'
};

gulp.task('clean', (done) => {
  fse.remove(config.distDir, done);
});


gulp.task('copy:package.json', () => {
  return gulp.src('./package.json')
    // remove dev dependencies
    .pipe(jeditor((json) => {
      json.devDependencies = {};
      json.scripts = {};
      return json;
    }))
    .pipe(
      gulp.dest(config.distDir)
    );
});

