using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text.Json;
using System.Diagnostics;
using System.Windows.Input;
using Microsoft.Maui.Controls;
using collabears.Models;

namespace collabears.ViewModel
{
    public class DashboardViewModel : BindableObject
    {
        public ObservableCollection<collabears.Models.User> Users { get; set; } = new();
        public ObservableCollection<Project> Projects { get; set; } = new();

        public ICommand UserActionCommand { get; }
        public ICommand ProjectActionCommand { get; }

        public DashboardViewModel()
        {
            UserActionCommand = new Command<collabears.Models.User>(OnUserAction);
            ProjectActionCommand = new Command<Project>(OnProjectAction);

            LoadUsersAsync();
            LoadProjectsAsync();
        }

        private async void LoadUsersAsync()
        {
            try
            {
                Debug.WriteLine(">> Fetching users...");

                using var client = new HttpClient();
                var token = Preferences.Get("auth_token", "");

                client.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var response = await client.GetAsync("http://localhost:8000/api/users");
                var json = await response.Content.ReadAsStringAsync();

                Debug.WriteLine(">> Raw JSON (Users): " + json);

                if (response.IsSuccessStatusCode)
                {
                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    var userResponse = JsonSerializer.Deserialize<UserResponse>(json, options);

                    Users.Clear();
                    foreach (var user in userResponse.Data)
                        Users.Add(user);
                }
                else
                {
                    Debug.WriteLine(">> Error loading users: " + response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(">> Exception (Users): " + ex.Message);
            }
        }

        private async void LoadProjectsAsync()
        {
            try
            {
                Debug.WriteLine(">> Fetching projects...");

                using var client = new HttpClient();
                var token = Preferences.Get("auth_token", "");

                client.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var response = await client.GetAsync("http://localhost:8000/api/projects");
                var json = await response.Content.ReadAsStringAsync();

                Debug.WriteLine(">> Raw JSON (Projects): " + json);

                if (response.IsSuccessStatusCode)
                {
                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    var projectResponse = JsonSerializer.Deserialize<ProjectResponse>(json, options);

                    Projects.Clear();
                    foreach (var project in projectResponse.Data)
                        Projects.Add(project);
                }
                else
                {
                    Debug.WriteLine(">> Error loading projects: " + response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(">> Exception (Projects): " + ex.Message);
            }
        }

        private async void OnUserAction(collabears.Models.User user)
        {
            if (user == null)
            {
                Debug.WriteLine(">> User is null, cannot navigate to details page.");
                return;
            }

            Debug.WriteLine($">> Action triggered for user: {user.Name}");

            if (Application.Current?.MainPage == null)
            {
                Debug.WriteLine(">> MainPage is null, cannot navigate.");
                return;
            }

            await Application.Current.MainPage.Navigation.PushAsync(new Views.UserDetailPage(user));
        }
        private async void OnProjectAction(Project project)
        {
            if (project == null)
            {
                Debug.WriteLine(">> Project is null, cannot navigate to details page.");
                return;
            }

            Debug.WriteLine($">> Action triggered for project: {project.Title}");

            if (Application.Current?.MainPage == null)
            {
                Debug.WriteLine(">> MainPage is null, cannot navigate.");
                return;
            }

            // Itt majd legyen egy ProjectDetailPage
            await Application.Current.MainPage.DisplayAlert("Project Details", $"Project: {project.Title}", "OK");
            // VAGY ha már van külön oldalad:
            // await Application.Current.MainPage.Navigation.PushAsync(new Views.ProjectDetailPage(project));
        }

    }
}
