
namespace collabears.Views
{
    public partial class UserDetailPage : ContentPage
    {
        public UserDetailPage(User selectedUser)
        {
            InitializeComponent();
            BindingContext = selectedUser;
        }
    }
}