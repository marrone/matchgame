# Require any additional compass plugins here.
require "susy"

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "build/css"
sass_dir = "assets/sass"
images_dir = "build/img"
javascripts_dir = "build/js"

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
asset_cache_buster :none

preferred_syntax = :scss

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false # by Compass.app 

# You can select your preferred output style here (can be overridden via the command line):
output_style = :compact # by Compass.app 


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
