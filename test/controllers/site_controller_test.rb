require 'test_helper'

class SiteControllerTest < ActionDispatch::IntegrationTest
  test "should get signup" do
    get site_signup_url
    assert_response :success
  end

end
