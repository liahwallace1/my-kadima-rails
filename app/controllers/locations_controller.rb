class LocationsController < ApplicationController
  def index
    @locations = Location.all
  end

  def show
    set_location
  end

  def new
    @location = Location.new
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      redirect_to location_path(@location)
    else
      flash[:message] = @location.errors.full_messages.uniq.join(', ')
      render :new
    end
  end

  def edit
    set_location
  end

  def update
    set_location
    @location.update(location_params)
    redirect_to location_path(@location)
  end

  private

  def set_location
    @location ||= Location.find_by_id(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :city, :state, :lighting, :turf)
  end

end
