class UsersController < ApplicationController
    def index 
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:user_id])
        # relationship1 = Relationship.find_by(sender_id: session[:user_id], receiver_id: user.id)
        # relationship2 = Relationship.find_by(receiver_id: session[:user_id], sender_id: user.id)
        # if !relationship1
        #     relationship1 = Relationship.create(sender_id: session[:user_id], receiver_id: user.id, friends: false)
        # end
        # if !relationship2
        #     relationship2 = Relationship.create(receiver_id: session[:user_id], sender_id: user.id, friends: false)
        # end
        # render json: {user: user, friends: relationship1.friends}
        render json: user
    end

    def updated
        user = User.find(params[:user_id])
        user.update(user_params)
        render json: user
    end

    private

    def user_params
        params.permit(:user_id, :username, :email, :full_name)
    end
end
