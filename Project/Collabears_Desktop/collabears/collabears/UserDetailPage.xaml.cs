namespace collabears.Views
{
    public partial class ProjectDetailPage : ContentPage
    {
        public ProjectDetailPage(collabears.Models.Project selectedProject)
        {
            InitializeComponent();
            BindingContext = selectedProject;
        }
    }
}
