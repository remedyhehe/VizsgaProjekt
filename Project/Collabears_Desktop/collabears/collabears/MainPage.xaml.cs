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
            await Navigation.PushAsync(new DetailPage());
        }
    }

}
