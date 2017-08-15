# View Middleman configurations:
# http://localhost:4567/__middleman/config/

# require "helpers/view_helpers.rb"
# helpers ViewHelpers


# Configure assets directories
# ----------------------------------------------
set :css_dir, 'assets/styles'
set :js_dir, 'assets/scripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'
set :partials_dir, 'partials/'


# Slim HTML
# ----------------------------------------------
require 'slim'

# i18n
# ----------------------------------------------
# activate :i18n, :mount_at_root => :'zh-tw'

# JP lorem
# FROM https://github.com/tanalab2/middleman-ya_lorem_ja
# ----------------------------------------------
# activate :ya_lorem_ja

# Development-specific configuration
# ----------------------------------------------
configure :development do

  # activate :directory_indexes

  set :debug_assets, true

  # Output a pretty html
  ::Slim::Engine.set_options :pretty => true

end


# Build-specific configuration
# ----------------------------------------------
configure :build do

  # compass_config do |config|
  #   config.output_style = :compressed
  #   config.line_comments = false
  # end

  # Output a pretty html
  ::Slim::Engine.set_options :pretty => true
  
  # Use relative URLs
  # activate :directory_indexes
  activate :relative_assets
  
  # Activate gzip
  # activate :gzip

  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Add asset fingerprinting to avoid cache issues
  # activate :asset_hash

  # Enable cache buster
  # activate :cache_buster

  # Activate autoprefixer
  # activate :autoprefixer do |config|
  # config.browsers = ['last 4 versions', 'Explorer >= 9']
  # end

  # ignore file
  ignore "sass/*"
  ignore "images/*"
  ignore "javascript/*"
  ignore "archive/*"
  ignore "*.yml"
  

end

activate :external_pipeline,
  name: :gulp,
  command: build? ? './node_modules/gulp/bin/gulp.js build' : './node_modules/gulp/bin/gulp.js watch',
  source: ".tmp/dist",
  latency: 1
