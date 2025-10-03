<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogReviewsModel extends Model
{
    protected $table = "blog_reviews";

    protected $primaryKey = 'id';

    protected $fillable =[
        'blog_id','name','email','review','created_at','updated_at'
    ];

    public function blog(){
        return $this->belongsTo(BlogsModel::class,'blog_id');

    }
}
