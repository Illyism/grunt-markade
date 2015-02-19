/*
 * grunt-markade
 * https://github.com/illyism/grunt-markade
 *
 * Copyright (c) 2015 Ilias Ismanalijev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    markade: {
      default_options: {
        options: {
          "template": "test/templates/test.jade"
        },
        files: {
          './tmp/': "test/fixtures/*.md"
        }
      },
      custom_options: {
        options: {
          "log": "info"
        },
        files: {
          'tmp/custom_options.html': "test/fixtures/testing.md"
        }
      },
      with_layout: {
        options: {
          "template": "test/templates/index.jade",
          "jade": {
            "pretty": true
          }
        },
        files: {
          "tmp/with_layout.html": "test/fixtures/testing.md"
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'markade', 'nodeunit']);

  grunt.registerTask('build', ['clean', 'markade']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
