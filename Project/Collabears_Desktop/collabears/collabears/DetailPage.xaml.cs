using collabears.ViewModel;

namespace collabears.Views
{
    public partial class DetailPage : ContentPage
    {
        public DetailPage()
        {
            InitializeComponent();
            BindingContext = new UserViewModel();
        }
    }
}