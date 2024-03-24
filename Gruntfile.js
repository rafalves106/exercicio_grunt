module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        /* Configurando Plugin */
        less: {
            /* Ambiente de Desenvolvimento - Meu PC */
            development: {
                files: {
                    /* Transformação do arquivo less para css */
                    './dev/styles/main.css': './src/styles/main.less'
                }
            },
            
            /* Ambiente de Produção - Usuário Final */
            production: {
                options: {
                    compress: true,
                },
                    files: {
                        /* Transformação do arquivo less para css minificado */
                        './dist/styles/main.min.css': './src/styles/main.less'
                    }
                }
            },

            /* Configurando Plugin */
            concurrent: {

                /* Tarefas que serão paralelas*/
                target: ['less']
            },

            /* Configurando Plugin */
            watch: {
                less: {
                    files: ['src/styles/**/*.less'],
                    tasks: ['less:development']
                },
                html: {
                    files: ['src/index.html'],
                    tasks: ['replace:dev']
                }
            },
            
            
            clean: ['prebuild'],
            uglify: {
                target: {
                    files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                    }
                }
            },
            

            htmlmin: {
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true,
                    },
                    files: {
                        'prebuild/index.html': 'src/index.html'
                    }
                }
            },


            replace: {
                dev: {
                    options: {
                        patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/main.css'
                            },
                            {
                                match: 'ENDERECO_DO_JS',
                                replacement: '../src/scripts/main.js'
                            }
                        ]
                    },
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: ['src/index.html'],
                            dest: 'dev/'
                        }
                    ]
                },
                dist: {
                    options: {
                        patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/main.min.css'
                            },
                            {
                                match: 'ENDERECO_DO_JS',
                                replacement: './scripts/main.min.js'
                            }
                        ]
                    },
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: ['prebuild/index.html'],
                            dest: 'dist/'
                        }
                    ]
                }
            },

            
        })
    
    /* Carregando Plugin */
    grunt.loadNpmTasks('grunt-contrib-less');
    
    /* Carregando Plugin */
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    /* Carregando Plugin */
    grunt.loadNpmTasks('grunt-contrib-uglify')

    /* Carregando Plugin */
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    /* Carregando Plugin */
    grunt.loadNpmTasks('grunt-contrib-clean');

    /* Carregando Plugin */
    grunt.loadNpmTasks('grunt-replace');

    

    /* Registrando Tarefa do Plugin */
    grunt.registerTask('default', ['watch']);

    /* Registrando Tarefa do Plugin */
    grunt.registerTask('build', ['less:production', 'clean', 'htmlmin:dist', 'replace:dist', 'uglify']);
}