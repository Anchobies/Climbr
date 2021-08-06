class BeesController < ApplicationController
    def show
        bee = Bee.find(params[:bee_id])
        render json: {user: bee.user, hive_name: bee.hive.name}
    end

    def hive
        hive = Hive.find(params[:hive_id])
        render json: hive.bees
    end

    def create
        user = User.find_by(username: params[:username])  
        if !user
            render json: {errors: ["User not found"]}, status: 404 and return
        end
        bee = Bee.create(user_id: user.id, hive_id: params[:hive_id])
        if bee.valid?
            render json: bee, status: 201
        else
            render json: {errors: bee.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        bee = Bee.find(params[:bee_id])
        if bee.hive.bees.size < 4
            render json: { errors: ["A hive must have at least 3 bees"] } and return
        end
        bee.destroy
        render json: bee, status: 200
    end
end
