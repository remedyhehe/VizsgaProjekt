using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
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

            if (string.IsNullOrEmpty(emailEntry.Text) || string.IsNullOrEmpty(passwordEntry.Text))
            {
                await DisplayAlert("Error", "Please enter email and password", "OK");
                return;
            }

            var loginResult = await LoginAsync(emailEntry.Text, passwordEntry.Text);

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

                    System.Diagnostics.Debug.WriteLine("Raw Response: " + responseContent);

                    if (response.IsSuccessStatusCode)
                    {
                        try
                        {
                            var options = new JsonSerializerOptions
                            {
                                PropertyNameCaseInsensitive = true
                            };

                            var data = JsonSerializer.Deserialize<LoginResponse>(responseContent, options);

                            System.Diagnostics.Debug.WriteLine("Parsed Response: " + JsonSerializer.Serialize(data));

                            if (data?.User == null)
                            {
                                await DisplayAlert("Error", "Invalid response from server: User data is missing", "OK");
                                return false;
                            }

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
                                var errorData = JsonSerializer.Deserialize<ErrorResponse>(responseContent);
                                await DisplayAlert("Error", errorData?.Message ?? "Unknown error", "OK");
                            }
                            catch (JsonException jsonEx)
                            {
                                await DisplayAlert("Error", "Failed to parse error response: " + jsonEx.Message, "OK");
                            }
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
    }

    public class LoginResponse
    {
        public string Message { get; set; }
        public string Token { get; set; }
        public User User { get; set; }
    }

    public class User
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("first_name")]
        public string FirstName { get; set; }

        [JsonPropertyName("last_name")]
        public string LastName { get; set; }

        // Add more fields if needed later
    }

    public class ErrorResponse
    {
        public string Message { get; set; }
    }
}
