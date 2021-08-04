class UsersController < ApplicationController
    def hives
        user = User.find(params[:user_id])
        hives = user.hives
        render json: hives
    end 
end
