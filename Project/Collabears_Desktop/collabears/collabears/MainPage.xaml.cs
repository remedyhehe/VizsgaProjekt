using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace collabears
{
    public partial class MainPage : ContentPage
    {
        int count = 0;

        public MainPage()
        {
            InitializeComponent();
        }

        private async void OnCounterClicked(object sender, EventArgs e)
        {
            count++;

            if (count == 1)
                CounterBtn.Text = $"Logined {count} time";
            else
                CounterBtn.Text = $"Logined {count} times";

            SemanticScreenReader.Announce(CounterBtn.Text);

            if (string.IsNullOrEmpty(usernameEntry.Text) || string.IsNullOrEmpty(passwordEntry.Text))
            {
                await DisplayAlert("Error", "Please enter username and password", "OK");
                return;
            }

            var loginResult = await LoginAsync(usernameEntry.Text, passwordEntry.Text);

            if (loginResult)
            {
                await Navigation.PushAsync(new DetailPage());
            }
            else
            {
                await DisplayAlert("Error", "Invalid email or password", "OK");
            }
        }

        private async Task<bool> LoginAsync(string email, string password)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var requestContent = new StringContent(
                        JsonSerializer.Serialize(new { email, password }),
                        Encoding.UTF8,
                        "application/json");

                    var response = await client.PostAsync("http://localhost:8000/api/login", requestContent);

                    var responseContent = await response.Content.ReadAsStringAsync();

                    // Log the raw response for debugging purposes
                    System.Diagnostics.Debug.WriteLine("Raw Response: " + responseContent);

                    if (response.IsSuccessStatusCode)
                    {
                        try
                        {
                            var data = JsonSerializer.Deserialize<LoginResponse>(responseContent);

                            // Store the token and user name as needed
                            Preferences.Set("auth_token", data.Token);
                            Preferences.Set("user_name", data.User.Name);

                            return true;
                        }
                        catch (JsonException jsonEx)
                        {
                            await DisplayAlert("Error", "Failed to parse response: " + jsonEx.Message, "OK");
                            return false;
                        }
                    }
                    else
                    {
                        if (response.Content.Headers.ContentType.MediaType == "application/json")
                        {
                            try
                            {
                                var data = JsonSerializer.Deserialize<ErrorResponse>(responseContent);
                                await DisplayAlert("Error", data.Message, "OK");
                            }
                            catch (JsonException jsonEx)
                            {
                                await DisplayAlert("Error", "Failed to parse error response: " + jsonEx.Message, "OK");
                            }
                        }
                        else if (response.Content.Headers.ContentType.MediaType == "text/html")
                        {
                            await DisplayAlert("Error", "Server returned an HTML response: " + responseContent, "OK");
                        }
                        else
                        {
                            await DisplayAlert("Error", "Unexpected response from server: " + responseContent, "OK");
                        }
                        return false;
                    }
                }
            }
            catch (HttpRequestException httpEx)
            {
                await DisplayAlert("Network Error", "Request error: " + httpEx.Message, "OK");
                return false;
            }
            catch (Exception ex)
            {
                await DisplayAlert("Network Error", "Unexpected error: " + ex.Message, "OK");
                return false;
            }
        }

        private bool IsJson(string input)
        {
            input = input.Trim();
            return (input.StartsWith("{") && input.EndsWith("}")) || (input.StartsWith("[") && input.EndsWith("]"));
        }
    }

    public class LoginResponse
    {
        public string Token { get; set; }
        public User User { get; set; }
    }

    public class User
    {
        public string Name { get; set; }
    }

    public class ErrorResponse
    {
        public string Message { get; set; }
    }
}
