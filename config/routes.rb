Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :steams, only: [] do
        collection do
          get :vanity
          get :summary
          get :games
          get :achievements
        end
      end
    end
  end

  root 'home#index'
end
