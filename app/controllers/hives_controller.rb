class HivesController < ApplicationController
    def index 
        hives = Hive.all
        render json: hives
    end

    def show
        hives = @current_user.hives
        render json: hives
    end 

    def create 
        if Hive.find_by(name: hive_params[:name])
            render json: { errors: ["A hive with that name already exists."] } and return
        elsif params[:hive][:bees].size < 3 
            render json: { errors: ["You must have at least 3 bees to create a hive."] } and return
        end

        for bee in params[:hive][:bees] do
            user = User.find_by(username: bee)
            if !user
                render json: { errors: ["Please provide a valid username"] } and return
            end
        end
        
        hive = Hive.create(hive_params)
        if hive.valid?
            for bee in params[:hive][:bees] do
                user = User.find_by(username: bee)
                Bee.create(user_id: user.id, hive_id: hive.id)
            end

            render json: hive, status: :created
        else
            render json: { errors: hive.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        hive = Hive.find(params[:hive_id])
        if hive.name != hive_params[:name]
            if Hive.find_by(name: hive_params[:name])
                render json: { errors: ["A hive with that name already exists."] } and return
            end
        end
        hive.update(hive_params)
        if hive.valid?
            render json: hive
        else
            render json: { errors: hive.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def hive_params
        params.require(:hive).permit(:name, :queen_bee_id)
    end
end
