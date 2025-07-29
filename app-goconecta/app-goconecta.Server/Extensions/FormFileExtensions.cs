namespace app_goconecta.Server.Extensions;

public static class FormFileExtensions
{
    public static string? GetName(this IFormFile? file)
        => Path.GetFileNameWithoutExtension(file!.FileName);

    public static string? GetExtension(this IFormFile? file)
        => Path.GetExtension(file!.FileName)?.Replace(".", "").ToLower();

    public static string? GetExtensionType(this IFormFile? file)
        => file.GetExtension() switch
        {
            "jpg" or "jpeg" or "png" or "webp" => "Image",
            "mp4" or "avi" or "mov" => "Video",
            _ => "Other"
        };
}