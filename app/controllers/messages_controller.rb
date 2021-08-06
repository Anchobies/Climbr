class MessagesController < ApplicationController
    def create 
        relationship = Relationship.find_by(sender_id: session[:user_id], receiver_id: message_params[:receiver_id])
        if relationship.nil?
            relationship = Relationship.create(sender_id: session[:user_id], receiver_id: message_params[:receiver_id], friends: false)
        end

        chat = Chat.find_by(relationship_id: relationship.id, hive_id: message_params[:hive_id])
        if chat.nil?
            chat = Chat.create(relationship_id: relationship.id, hive_id: message_params[:hive_id])
        end

        message = Message.create(comment: message_params[:comment], img_url: message_params[:img_url], chat_id: chat.id)
        if message.valid?
            render json: message, status: :created
        else
            render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def sent
        messages = Message.all.select do |message|
            message.chat.relationship.sender_id == session[:user_id] && 
            message.chat.relationship.receiver_id.to_s == params[:receiver_id]
        end
        render json: messages
    end

    def received
        messages = Message.all.select do |message|
            message.chat.relationship.receiver_id == session[:user_id]
        end
        render json: messages, include: '**'
    end

    private

    def message_params
        params.require(:message).permit(:comment, :img_url, :receiver_id, :hive_id)
    end
end
