using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Windows.Input;
using Microsoft.Maui.Controls;
using collabears.Models;

namespace collabears.ViewModel
{
    public class UserViewModel : BindableObject
    {
        public ObservableCollection<collabears.Models.User> Users { get; set; } = new(); // Fully qualify the User type

        public ICommand UserActionCommand { get; }

        public UserViewModel()
        {
            UserActionCommand = new Command<collabears.Models.User>(OnUserAction); // Fully qualify the User type
            LoadUsersAsync();
        }

        private async void LoadUsersAsync()
        {
            try
            {
                Debug.WriteLine(">> Fetching users...");

                using var client = new HttpClient();
                var token = Preferences.Get("auth_token", "");

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var response = await client.GetAsync("http://localhost:8000/api/users");
                var json = await response.Content.ReadAsStringAsync();

                Debug.WriteLine(">> Raw JSON: " + json);

                if (response.IsSuccessStatusCode)
                {
                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    var userResponse = JsonSerializer.Deserialize<UserResponse>(json, options);

                    Users.Clear();
                    foreach (var user in userResponse.Data)
                        Users.Add(user); // This will now work as the type is fully qualified
                }
                else
                {
                    Debug.WriteLine(">> Error loading users: " + response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(">> Exception: " + ex.Message);
            }
        }

        private void OnUserAction(collabears.Models.User user) // Fully qualify the User type
        {
            Debug.WriteLine($">> Action triggered for user: {user.Name}");
        }
    }
}
