public class PaginatedResponse<T>
{
    public IEnumerable<T>? Data { get; set; }
    public int Current { get; set; }
    public int PageSize { get; set; }
    public int Total { get; set; }
}