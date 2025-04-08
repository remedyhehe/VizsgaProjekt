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

            if (usernameEntry.Text == "user" && passwordEntry.Text == "password")
            {
                await Navigation.PushAsync(new DetailPage());
            }
            else if (usernameEntry.Text == "" || passwordEntry.Text == "")
            {
                await DisplayAlert("Error", "Please enter username and password", "OK");
            }
            else if (usernameEntry.Text != "user")
            {
                await DisplayAlert("Error", "That username doesn't exist!", "OK");
            }
            else if (passwordEntry.Text != "password")
            {
                await DisplayAlert("Error", "That password is incorrect!", "OK");
            }
            else
            {
                await DisplayAlert("Error", "Something went wrong!", "OK");
            }
        }

    }
}
