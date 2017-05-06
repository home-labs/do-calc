$:.push File.expand_path("../lib", __FILE__)

require "mathrix/rails/version"

Gem::Specification.new do |s|
  s.name        = "mathrix-rails"
  s.version     = Mathrix::Rails::VERSION
  s.authors     = ["rplaurindo"]
  s.email       = ["rafaelplaurindo@gmail.com"]
  s.homepage    = "https://rubygems.org/gems/mathrix-rails"
  s.summary     = %q{Summary of Mathrix}
  s.description = %q{Complementary mathematical methods.}
  s.license     = "MIT"

  s.files       = Dir["{bin,config,lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "README.md", "mathrix.gemspec"]

  s.add_dependency 'esphinx-rails', '~> 0.3'

end
