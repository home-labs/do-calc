Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "mathrix/rails/version"

Gem::Specification.new do |s|
  s.name        = "mathrix_rails"
  s.version     = Mathrix::Rails::VERSION
  s.authors       = ["rplaurindo"]
  s.email         = ["rafaelplaurindo@gmail.com"]
  s.homepage      = "https://rubygems.org/gems/mathrix_rails"
  s.summary       = %q{Summary of OffMaths}
  s.description   = %q{Description of Mathrix.}
  s.license       = "MIT"

  s.files         = `git ls-files -z`.split("\x0")
  s.executables   = s.files.grep(%r{^bin/}) { |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_runtime_dependency 'do-rails', '~> 0.0.10', '>= 0.0.10'

end
