module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['build'],
            dev: {
                src: ['build/app.js', 'build/<%= pkg.name %>.css', 'build/<%= pkg.name %>.js']
            },
            prod: ['dist']
        },

        browserify: {
            vendor: {
                src: ['app/requires/*.js'],
                dest: 'build/vendor.js',
                options: {
                    shim: {
                        jquery: {
                            path: './app/requires/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: './app/requires/underscore.js',
                            exports: '_'
                        },
                        backbone: {
                            path: './app/requires/backbone.js',
                            exports: 'Backbone',
                            depends: {
                                jquery: 'jquery',
                                underscore: 'underscore'
                            }
                        },
                        'backbone.marionette': {
                            path: './app/requires/backbone.marionette.js',
                            exports: 'Marionette',
                            depends: {
                                backbone: 'Backbone'
                            }
                        },
                        'backbone.stickit': {
                            path: './app/requires/backbone.stickit.js',
                            exports: 'Stickit',
                            depends: {
                                backbone: 'Backbone'
                            }
                        }
                    }
                }
            },
            app: {
                files: {
                    'build/app.js': ['app/src/main.js']
                },
                options: {
                    external: ['jquery', 'underscore', 'backbone', 'backbone.marionette', 'handlebars.runtime']
                }
            }
        },

        less: {
            transpile: {
                files: {
                    'build/assets/css/style.css': [
                        'app/assets/css/*.css',
                        'app/assets/less/main.less'
                    ]
                }
            }
        },

        concat: {
            'build/<%= pkg.name %>.js': ['build/vendor.js', 'build/app.js']
        },

        // CSS minification.
        cssmin: {
            minify: {
                src: ['build/<%= pkg.name %>.css'],
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },

        // Javascript minification.
        uglify: {
            compile: {
                options: {
                    compress: true,
                    verbose: true
                },
                files: [{
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'dist/js/<%= pkg.name %>.js'
                }]
            }
        },

        // for changes to the front-end code
        watch: {
            scripts: {
                files: ['app/src/**/*.js'],
                tasks: ['clean:dev', 'browserify:app', 'concat']
            },
            less: {
                files: ['app/assets/**/*.less'],
                tasks: ['less:transpile']
            }
        },

        // for changes to the node code
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    nodeArgs: ['--debug'],
                    watchedFolders: ['controllers', 'server'],
                    env: {
                        PORT: '8080'
                    }
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'watch:scripts', 'watch:less'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        copy: {
            vendor: {
                files: [{
                    flatten: true,
                    expand: true,
                    src: [
                        './node_modules/jquery/dist/jquery.js',
                        './node_modules/underscore/underscore.js',
                        './node_modules/backbone/backbone.js',
                        './node_modules/backbone.marionette/lib/backbone.marionette.js',
                        './node_modules/backbone.stickit/backbone.stickit.js'
                    ],
                    dest: './app/requires/'
                }]
            },
            dev: {
                files: [{
                    flatten: true,
                    expand: true,
                    src: './app/assets/images/*',
                    dest: './build/assets/images/'
                }]
            },
            prod: {
                files: [{
                    src: ['client/img/*'],
                    dest: 'dist/img/'
                }]
            }
        },


        jshint: {
            options : {
                jshintrc: './.jshintrc'
            },
            all: ['Gruntfile.js', 'client/src/**/*.js', 'client/spec/**/*.js'],
            dev: ['client/src/**/*.js'],
            test: ['client/spec/**/*.js']
        }
    });

    grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);

    grunt.registerTask('build:dev', ['clean:dev', 'browserify:vendor', 'browserify:app', 'jshint', 'less:transpile', 'copy:dev']);

    grunt.registerTask('build:prod', ['clean:prod', 'browserify:vendor', 'browserify:app', 'jshint', 'less:transpile', 'concat', 'cssmin', 'uglify']);

    grunt.registerTask('heroku', ['init:dev', 'build:dev']);

    grunt.registerTask('server', ['build:dev', 'concurrent:dev']);

};
