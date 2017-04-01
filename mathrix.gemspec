Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "mathrix/rails/version"

Gem::Specification.new do |s|
  s.name        = "mathrix-rails"
  s.version     = Mathrix::Rails::VERSION
  s.authors       = ["rplaurindo"]
  s.email         = ["rafaelplaurindo@gmail.com"]
  s.homepage      = "https://rubygems.org/gems/mathrix-rails"
  s.summary       = %q{Summary of OffMaths}
  s.description   = %q{Description of Mathrix.}
  s.license       = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

end
