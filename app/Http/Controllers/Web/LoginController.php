<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
class LoginController extends Controller
{

     public function showLoginForm()
    {
        return Inertia::render('Login/Login');
    }

    public function showRegisterForm(){
        return Inertia::render('Login/Register');
    }
}
