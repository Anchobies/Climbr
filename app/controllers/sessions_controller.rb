class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:signup, :login]

    def signup 
        user = User.create(signup_params)
        if user.valid?
            session[:user_id] ||= user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def login
        user = User.find_by(username: login_params[:username])
        if user &.authenticate(login_params[:password])
            session[:user_id] ||= user.id
            render json: user, status: :ok
        else
            render json: { errors: ["Invalid email or password"] }, status: :unauthorized
        end
    end

    private

    def signup_params
        params.permit(:email, :password, :first_name, :last_name, :username)
    end

    def login_params 
        params.permit(:username, :password)
    end
end
