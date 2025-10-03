<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogReviewsModel;
use App\Models\BlogsModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BlogsController extends Controller
{
     private $user;

    private $loginId;


      private function setAuthUser()
    {
        $this->user = Auth::user();
        
        if ($this->user) {
            $this->loginId = $this->user->id;
         } else {
            Log::warning('User is not authenticated.');
        }
    }
    public function show_blogs(Request $request)
    {
         $perPage = $request->input('per_page', 10);

        $blogs = BlogsModel::orderBy('posted_date', 'desc')->paginate($perPage);

        return response()->json([
            'responseStatus'  => true,
            'responseMessage' => 'Blogs fetched successfully',
            'responseData'    => $blogs, // includes data + pagination meta
            'responseCode'    => 200,
        ], 200);
    }

    public function create_blogs(Request $request)
    {    
        $this->setAuthUser();
        Log::info($request->all());
        try {
            $posted_date = Carbon::now('Asia/Kolkata')->toDateString();

            $validator = Validator::make($request->all(), [
                'title'   => 'required|string|max:255',
                'content' => 'required|string|max:20000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'responseStatus'  => false,
                    'responseMessage' => $validator->errors(),
                    'responseCode'    => 422,
                ], 422);
            }

            $validated = $validator->validated();
             $blog               = new BlogsModel();
            $blog->blog_titile  = $validated['title'];
            $blog->blog_content = $validated['content'];
            $blog->posted_date  = $posted_date;
            $blog->created_by   = $this->loginId;

            if ($blog->save()) {
                return response()->json([
                    'responseStatus'  => true,
                    'responseMessage' => 'Blog Added Successfully',
                    'responseCode'    => 200,
                ], 200);
            } else {
                return response()->json([
                    'responseStatus'  => false,
                    'responseMessage' => 'Something Went Wrong',
                    'responseCode'    => 500,
                ], 500);
            }

        } catch (\Throwable $e) {
            return response()->json([
                'responseStatus'  => false,
                'responseMessage' => $e->getMessage(),
                'responseData'    => [],
                'responseCode'    => 500,
            ], 500);
        }
    }

public function show_reviews(Request $request)
{
    Log::info($request->all());

    $validator = Validator::make($request->all(), [
        'blog_id' => 'required|exists:blogs,id',
    ]);
    
    if ($validator->fails()) {
        return response()->json([
            'responseStatus'  => false,
            'responseMessage' => $validator->errors(),
            'responseCode'    => 422,
        ], 422);
    }

    $validated = $validator->validated();

    $reviews = BlogReviewsModel::with('blog')
        ->where('blog_id', $validated['blog_id'])
        ->orderBy('created_at', 'desc')
        ->get();

    // Default BlogDetails as null
    $BlogDetails = null;

    if ($reviews->isEmpty()) {
        // Fetch blog details only if no reviews
        $BlogDetails = BlogsModel::where('id', $validated['blog_id'])->first();
    }

    return response()->json([
        'responseStatus'  => true,
        'responseMessage' => 'Data fetched successfully',
        'responseData'    => [
            'reviews'     => $reviews,
            'total'       => $reviews->count(),
            'BlogDetails' => $BlogDetails
        ],
        'responseCode'    => 200,
    ], 200);
}



    public function storeReview(Request $request)
    {
        try {
 
            $posted_date = Carbon::now('Asia/Kolkata')->toDateString();

            $validator = Validator::make($request->all(), [
                'name'    => 'nullable|string|max:25',
                'email'   => 'nullable|email',
                'review'  => 'required|string|max:255',
                'blog_id' => 'required|exists:blogs,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'responseStatus'  => false,
                    'responseMessage' => $validator->errors(),
                    'responseCode'    => 422,
                ], 422);
            }

            $validated = $validator->validated();

            $review             = new BlogReviewsModel();
            $review->name       = $validated['name'] ?? null;
            $review->email      = $validated['email'] ?? null;
            $review->blog_id    = $validated['blog_id'];
            $review->review     = $validated['review'];
            $review->created_at = $posted_date;

            if ($review->save()) {
                return response()->json([
                    'responseStatus'  => true,
                    'responseMessage' => 'Blog Review Added Successfully',
                    'responseCode'    => 200,
                ], 200);
            } else {
                return response()->json([
                    'responseStatus'  => false,
                    'responseMessage' => 'Something Went Wrong',
                    'responseCode'    => 500,
                ], 500);
            }

        } catch (\Throwable $e) {
            return response()->json([
                'responseStatus'  => false,
                'responseMessage' => $e->getMessage(),
                'responseData'    => [],
                'responseCode'    => 500,
            ], 500);
        }
    }

}
