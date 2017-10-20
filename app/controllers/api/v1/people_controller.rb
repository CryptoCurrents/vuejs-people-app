class Api::V1::PeopleController < ApplicationController
  def index
    @people = Person.all
  end

  def create
    @person = Person.new(
                         name: params[:name],
                         bio: params[:bio]
                        )
    @person.save
    render :show
  end
end
