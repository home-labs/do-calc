Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "jmaths/rails/version"

Gem::Specification.new do |s|
  s.name        = "jmaths_rails"
  s.version     = Do::Maths::Rails::VERSION
  s.authors       = ["Rafael Laurindo"]
  s.email         = ["rafaelplaurindo@gmail.com"]
  s.homepage      = "https://rubygems.org/gems/jmaths_rails"
  s.summary       = %q{Summary of JMaths}
  s.description   = %q{It's a lib that abstracts some methods to facilitate the use of Javascript and complementary the jQuery.}
  s.license       = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  JMATHS_REQUIREMENTS = {
    :"jquery-rails" => '>= 3.0.0'
  }

  JMATHS_REQUIREMENTS.each do |p, v|
    s.add_runtime_dependency p, v
  end

  # s.add_dependency "rails", "~> 4.2.0"

  # s.add_development_dependency "sqlite3"
end
