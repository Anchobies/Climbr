class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:signup, :login]

    def signup 
        user = User.create(email: signup_params[:email], password: signup_params[:password], full_name: signup_params[:full_name].capitalize, username: signup_params[:username])
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def login
        user = User.find_by(username: login_params[:username])
        if user &.authenticate(login_params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: ["Invalid email or password"] }, status: :unauthorized
        end
    end

    def destroy 
        session.delete :user_id
        head :no_content
    end

    private

    def signup_params
        params.permit(:email, :password, :full_name, :username)
    end

    def login_params 
        params.permit(:username, :password)
    end
end
