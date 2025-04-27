
namespace collabears.Views
{
    public partial class UserDetailPage : ContentPage
    {
        public UserDetailPage(collabears.Models.User selectedUser)
        {
            InitializeComponent();
            BindingContext = selectedUser;
        }
    }
}