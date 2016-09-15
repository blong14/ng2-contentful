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

const gitignore = require('gitignore-to-glob')();
gitignore.push();

const paths = {
  ts: gitignore.concat('**/*.ts')
};

// Code linting
const tslint = require('gulp-tslint');

gulp.task('tslint', () => {
  paths.ts.push('!**/*.d.ts');

  gulp.src(paths.ts)
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: true,
      summarizeFailureOutput: true,
      reportLimit: 50
    }))
  }
);


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

