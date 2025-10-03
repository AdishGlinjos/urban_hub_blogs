<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogsModel extends Model
{
    protected $table = "blogs";

    protected $primaryKey ='id';
    
    protected $fillable =[
        'blog_titile','blog_content','posted_date','created_by','created_at','updated_by','updated_at'
    ];


      public function creater()
    {
        return $this->belongsTo(UserDetailsModel::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(UserDetailsModel::class, 'updated_by');
    }
}
