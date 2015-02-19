# grunt-markade

> A Markade build step for grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-markade --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-markade');
```

## The "markade" task

### Overview
In your project's Gruntfile, add a section named `markade` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  markade: {
    your_target: {
      options: {
        "template": "template.jade"
      },
      files: {
        'output.html': "data.md"
      }
    },
  },
});
```

### Options

#### options.template
Type: `String`
Default value: `empty.jade`

A file path to the Jade template. If none is specified it simply parses out all Markdown content.


### Usage Examples

#### Default Options
In this example, the default options are used to compile a Markade file.
So if `file.md` has content `**bold** text` then `default.html` would be `<b>bold</b> text`.

```js
grunt.initConfig({
  markade: {
    options: {},
    files: {
      'dest/default.html': ["src/file.md"],
    },
  },
});
```

#### Template

Add a `template` option to parse the data through the Jade template.

```js
grunt.initConfig({
  markade: {
    options: {
      template: 'templates/layout.jade'
    },
    files: {
      'index.html': 'index.md'
    },
  },
});
```

#### Directory

You can compile all files in a directory.

```js
grunt.initConfig({
  markade: {
    options: {
      template: 'templates/layout.jade'
    },
    files: {
      'public': ['index.md', 'about.md', 'contact.md']
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).