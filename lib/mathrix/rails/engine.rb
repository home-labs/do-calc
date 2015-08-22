module Mathrix
  module Rails
    class Engine < ::Rails::Engine
      isolate_namespace Mathrix::Rails
    end
  end
end
