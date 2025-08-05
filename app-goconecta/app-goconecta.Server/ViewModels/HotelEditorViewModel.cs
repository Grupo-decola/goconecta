namespace app_goconecta.Server.ViewModels
{
    public class HotelEditViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public int RoomsAvailable { get; set; }
        public string Region { get; set; }
        public string Address { get; set; }
        
        public List<int> SelectedAmenityIds { get; set; } = new();
        public List<AmenityCheckboxItem> Amenities { get; set; } = new();
        public List<MediaCreateViewModel> Media { get; set; } = Enumerable.Repeat(new MediaCreateViewModel{Title = string.Empty}, 3).ToList();
    }

    public class AmenityCheckboxItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Checked { get; set; }
    }
}

