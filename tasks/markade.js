/*
 * grunt-markade
 * https://github.com/illyism/grunt-markade
 *
 * Copyright (c) 2015 Ilias Ismanalijev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('markade', 'A Markade build step for grunt', function() {

    var markade = require("markade");

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      log: 'log',
    });

    var template = "| !{html}";
    if (options.template) {
      try {
        template = grunt.file.read(options.template);
      } catch(err) {
        console.error("No options.template");
      }
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });


      var files = src.map(function(file) {
        return {
          src: file,
          dest: f.dest
        };
      });

      if (!grunt.file.isMatch({ matchBase: true }, "*.html", f.dest)) {
        files = grunt.file.expandMapping(src, f.dest, {
          flatten: true,
          ext: ".html"
        });
      }


      files.map(function(file) {
        file.data = grunt.file.read(file.src);
        return file;
      }).forEach(function(f) {
        markade(f.data, template, function(err, html) {
          if (err) {
            console.error("Markade err", err);
          }

          grunt.file.write(f.dest, html);
          grunt.log.writeln('File "' + f.dest + '" created.');
        });
      });      
    });
  });

};
