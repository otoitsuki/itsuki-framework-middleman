require 'slim'

###
# Page options, layouts, aliases and proxies
###

# Configure assets directories
# ----------------------------------------------
set :css_dir, 'assets/styles'
set :js_dir, 'assets/scripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'
set :partials_dir, 'partials/'

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end

# Helpers
# require "helpers/tools"
# helpers Tools

activate :external_pipeline,
  name: :gulp,
  command: build? ? './node_modules/gulp/bin/gulp.js build' : './node_modules/gulp/bin/gulp.js watch',
  source: ".tmp/dist",
  latency: 1
