module LocationHelper

  def state_array
    %w(AK AL AR AZ CA CO CT DC DE FL GA HI IA ID IL IN KS KY LA MA MD ME MI MN MO MS MT NC ND NE NH NJ NM NV NY OH OK OR PA RI SC SD TN TX UT VA VT WA WI WV WY).collect {|s| [s, s]}
  end

  def turf_options
    %w(clay concrete grass sand other).collect {|t| [t, t]}
  end


  def info_needed(location)
    if location.city.blank? || location.state.blank? || location.turf.blank?
      "This location needs to be updated."
    end
  end

end
