class Movie < ApplicationRecord
    validates :title, :summary, :year, :genre, presence: :true    
end
