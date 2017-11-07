// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
    
      // ===========================================================================
      // CONFIGURE GRUNT ===========================================================
      // ===========================================================================
      grunt.initConfig({
    
        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
    
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },

            build: ['Gruntfile.js', 'src/js/**/*.js']
        },

        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/all.min.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        'bower_components/angularMultipleSelect/build/multiple-select.js',
                        'src/js/**/*.js',
                    ]
                }
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/all.min.css' : [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
                        'bower_components/font-awesome/css/font-awesome.css',
                        'bower_components/angularMultipleSelect/build/multiple-select.css',
                        'css/**/*.css',
                    ]
                }
            }
        },

        watch: {
            stylesheets: {
                files: ['src/less/**/*.css'],
                tasks: ['cssmin']
            },
            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['jshint', 'uglify']
            }
        },

        copy: {
            main: {
                files: [
                    {
                    expand: true,
                    src: ['bower_components/font-awesome/fonts/*', 'bower_components/bootstrap/fonts/*'],
                    dest: 'dist/fonts/',
                    flatten: true},
                    {
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.html',
                    dest: 'dist/',
                    flatten: false
                    },
                ]
              }
        }

      });
    
      // ===========================================================================
      // LOAD GRUNT PLUGINS ========================================================
      // ===========================================================================
      // we can only load these if they are in our package.json
      // make sure you have run npm install so our app can find these
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-copy');

      grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'copy']);
    
    };