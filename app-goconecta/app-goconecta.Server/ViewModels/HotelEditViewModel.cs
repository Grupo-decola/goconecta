using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace app_goconecta.Server.ViewModels
{
    public class HotelEditViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public int RoomsAvailable { get; set; }
        public string Region { get; set; }
        public string Address { get; set; }

        // IDs das amenities selecionadas
        public List<int> SelectedAmenityIds { get; set; } = new List<int>();
        // Lista de amenities disponíveis
        public List<AmenityCheckboxItem> Amenities { get; set; } = new List<AmenityCheckboxItem>();
    }

    public class AmenityCheckboxItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Checked { get; set; }
    }
}

