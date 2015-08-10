module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    /**
     * Get package meta data
     */
    pkg: grunt.file.readJSON('package.json'),
    /**
     * Set project object
     */
    project: {
      app: 'app',
      assets: '<%= project.app %>/assets',
      src: '<%= project.assets %>/src',
      css: [
        '<%= project.src %>/sass/base.scss'
      ],
      js: [
        '<%= project.src %>/js/*.js'
      ]
    },
    /**
     * Project banner
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' */\n'
    },
    /**
     * Sass
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          banner: '<%= tag.banner %>',
          compass: true
        },
        files: {
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
        }
      }
    },
    /**
     * Jasmine
     */
    jasmine : {
      // Your project's source files
      src : '<%= project.assets %>/js/*.js',
      // Your Jasmine spec files
      specs : 'specs/spec.js',
      // Your spec helper files
      helpers : 'specs/helper.js'
    },
    /**
     * Uglify
     */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    /**
     * Watch
     */
    watch: {
      sass: {
        files: '<%= project.src %>/sass/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      },
      scripts: {
        files: '<%= project.src %>/js/{,*/}*.js',
        tasks: ['uglify']
      }
    }
    
  });

  /**
   * Load All Grunt plugins
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'jasmine',
    'uglify',
    'watch'
  ]);

};