<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogsController extends Controller
{
   public function index()
    {
        return Inertia::render('Home');
    }

    public function blogs_list(){
        return inertia::render('Blogs/BlogsList');
    }

      public function blog_reviews($id)
    {
        return Inertia::render('Blog/BlogDetail', [
            'blogId' => $id
        ]);
    }


      public function show($id)
    {
        return Inertia::render('Blogs/BlogDetail', [
            'blogId' => $id
        ]);
    }

    public function blog_adding_page(){

        return inertia::render('Blogs/CreateBlog');
    }
}
