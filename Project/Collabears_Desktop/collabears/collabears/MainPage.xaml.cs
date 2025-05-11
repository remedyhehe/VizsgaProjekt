using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using collabears.Models;
using collabears.Views;
using System.Linq;

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
            CounterBtn.Text = count == 1 ? $"Logined {count} time" : $"Logined {count} times";
            SemanticScreenReader.Announce(CounterBtn.Text);

            if (string.IsNullOrEmpty(emailEntry.Text) || string.IsNullOrEmpty(passwordEntry.Text))
            {
                await DisplayAlert("Error", "Please enter email and password", "OK");
                return;
            }

            LoadingOverlay.IsVisible = true;

            var loginResult = await LoginAsync(emailEntry.Text, passwordEntry.Text);

            if (loginResult)
            {
                await Task.Delay(200);
                await Navigation.PushAsync(new DetailPage());
            }
            else
            {
                await DisplayAlert("Error", "Invalid email or password", "OK");
            }

            LoadingOverlay.IsVisible = false;
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

                            bool isAdmin = await CheckIfUserIsAdminAsync(data.User.Id, data.Token);

                            if (!isAdmin)
                            {
                                await DisplayAlert("Access Denied", "Only admins are allowed to log in.", "OK");
                                return false;
                            }

                            Preferences.Set("auth_token", data.Token);
                            Preferences.Set("user_name", data.User.Name);
                            Preferences.Set("user_id", data.User.Id);
                            Preferences.Set("is_admin", true);

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


        private async Task<bool> CheckIfUserIsAdminAsync(int userId, string token)
        {
            try
            {
                using var client = new HttpClient();
                client.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var response = await client.GetAsync("http://localhost:8000/api/admins");

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    System.Diagnostics.Debug.WriteLine("Admin response: " + json);

                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    var adminResponse = JsonSerializer.Deserialize<AdminResponse>(json, options);

                    return adminResponse?.Data?.Any(a => a.User_Id == userId) == true;
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine("Admin check failed: " + response.StatusCode);
                    return false;
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Exception during admin check: " + ex.Message);
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

    public class ErrorResponse
    {
        public string Message { get; set; }
    }

    public class AdminEntry
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Permission_Id { get; set; }
    }

    public class AdminResponse
    {
        public bool Status { get; set; }
        public List<AdminEntry> Data { get; set; }
    }
}
