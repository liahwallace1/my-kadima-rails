class LocationsController < ApplicationController
  def index
    @locations = Location.all.order(:name)
    respond_to do |f|
      f.html
      f.json {render json: @locations}
    end
  end

  def show
    set_location
    respond_to do |f|
      f.html
      f.json {render json: @location}
    end
  end

  def new
    @location = Location.new
    respond_to do |f|
      f.html
      f.json {render json: Location.new}
    end
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      # redirect_to location_path(@location), notice: "Location successfully created."
      render json: @location, status: 201
    else
      flash[:error] = @location.errors.full_messages.uniq.join('; ')
      render :new
    end
  end

  def edit
    set_location
    respond_to do |f|
      f.html
      f.json {render json: @location}
    end
  end

  def update
    set_location
    @location.update(location_params)
    # redirect_to location_path(@location), notice: "Location successfully updated."
    render json: @location, status: 201
  end

  def destroy
    set_location
    @location.destroy
    redirect_to locations_path
  end

  private

  def set_location
    @location ||= Location.find_by_id(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :city, :state, :lighting, :turf)
  end

end
