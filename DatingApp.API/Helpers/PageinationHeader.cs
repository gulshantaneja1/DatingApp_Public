namespace DatingApp.API.Helpers
{
    public class PageinationHeader
    {
        public int CurrentPage { get; set; }

        public int ItemsPerPage { get; set; }

        public int TotalItems { get; set; }

        public int TotalPages { get; set; }


        public PageinationHeader(int currentPage , int  itemsPerPage, 
                                int totalItems , int totalPages)
        {

            this.CurrentPage = currentPage;
            this.ItemsPerPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
    }
}