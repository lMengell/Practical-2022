using System.Collections.Generic;

namespace InterviewTest.Responses
{
    public class BaseResponse<T>
    {
        public List<T> Items { get; set; }
        public int TotalItems { get; set; }
    }
}
