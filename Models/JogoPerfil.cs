namespace SaveRoom.Models
{
    public class JogoPerfil
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description_Raw { get; set; }
        public string Background_Image { get; set; }
        public string Background_Image_Additional { get; set; }
        public string Released { get; set; }
        public double Rating { get; set; }
        public List<RedditPost> PostsDaComunidade { get; set; } = new List<RedditPost>();
        
        public List<PlatformInfo> Platforms { get; set; } = new List<PlatformInfo>();
    }

    public class PlatformInfo
    {
        public PlatformDetail Platform { get; set; }
    }

    public class PlatformDetail
    {
        public string Name { get; set; }
    }

    public class RedditPost
    {
        public string Username { get; set; }
        public string Name { get; set; } 
        public string Url { get; set; }
    }

    public class RedditApiResponse
    {
        public List<RedditPost> Results { get; set; }
    }
}