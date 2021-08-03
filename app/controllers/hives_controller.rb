class HivesController < ApplicationController
    def index
        @hives = Hive.all
        render json: @hives
    end

    def create 
        byebug
        hive = Hive.create(hive_params)
        if hive.valid?
            for bee in params[:hive][:bees] do
                user = User.find_by(username: bee)
                if user
                    newBee = Bee.create(user_id: user.id, hive_id: hive.id)
                else
                    render json: { error: "User #{bee} does not exist" }, status: :not_found
                end
            end

            render json: hive, status: :created
        else
            render json: { errors: hive.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def hive_params
        params.require(:hive).permit(:name, :queen_bee_id)
    end
end
