module LocationHelper

  def state_array
    %w(AK AL AR AZ CA CO CT DC DE FL GA HI IA ID IL IN KS KY LA MA MD ME MI MN MO MS MT NC ND NE NH NJ NM NV NY OH OK OR PA RI SC SD TN TX UT VA VT WA WI WV WY)
  end

  def turf_options
    %w(clay concrete grass sand other)
  end

  def edit_message(location)
    if location.city.blank? || location.state.blank? || location.turf.blank?
      "This location needs additional information."
    end
  end

end
