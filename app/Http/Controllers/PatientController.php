<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|alpha',
            'email' => 'required|email|regex:/@gmail\.com$/',
            'country_code' => 'required|numeric',
            'phone_number' => 'required|numeric',
            'document_photo' => 'required|image|mimes:jpg|max:2048',
        ]);

        $path = $request->file('document_photo')->store('document_photos');
        $patient = Patient::create([
            'name' => $request->name,
            'email' => $request->email,
            'country_code' => $request->country_code,
            'phone_number' => $request->phone_number,
            'document_photo' => $path,
        ]);

        SendConfirmationEmail::dispatch($patient);
        return response()->json($patient, 201);
    }
}
