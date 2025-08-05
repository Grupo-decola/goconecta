namespace app_goconecta.Server.DTOs.Package;

public class PackageRatingDataDto
{
    public double AverageRating { get; set; }
    public int TotalRatings { get; set; }
    public Dictionary<int, int> RatingDistribution { get; set; } = new ();
    
    public static PackageRatingDataDto FromPackage(Models.Package package)
    {
        return new PackageRatingDataDto
        {
            AverageRating = package.AverageRating(),
            TotalRatings = package.TotalRatings(),
            RatingDistribution = package.RatingDistribution()
        };
    }
}