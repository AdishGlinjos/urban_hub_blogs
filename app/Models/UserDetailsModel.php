<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens; // MUST be imported
use Illuminate\Notifications\Notifiable;
class UserDetailsModel extends Model
{

    use HasApiTokens, Notifiable;
    protected $table = "user_details";

    protected $primaryKey = 'id';

    protected $fillable = [
        'name','user_name','password','created_at','updated_at'
    ];



    //  public function setPasswordAttribute($value)
    // {
    //     $this->attributes['password'] = Hash::make($value);
    // }

    protected $hidden = [
        'password',  
    ];
}
