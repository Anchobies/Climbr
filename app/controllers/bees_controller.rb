class BeesController < ApplicationController
    def show
        bee = Bee.find(params[:bee_id])
        render json: bee.user
    end

    def hive
        hive = Hive.find(params[:hive_id])
        render json: hive.bees
    end
end
