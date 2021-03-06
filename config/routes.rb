Rails.application.routes.draw do
  get '/' => 'people#index'

  namespace :api do
      namespace :v1 do
        get '/people' => 'people#index'
        post '/people' => 'people#create'
        delete '/people/:id' => 'people#destroy'
      end
  end  
end
