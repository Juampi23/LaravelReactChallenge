<?php

namespace App\Jobs;

use App\Models\Patient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

class SendConfirmationEmail implements ShouldQueue
{
    use Queueable;

    protected $patient;

    public function __construct(Patient $patient)
    {
        $this->patient = $patient;
    }

    public function handle()
    {
        Mail::raw('Your registration was successful!', function (Message $message) {
            $message->to($this->patient->email)->subject('Registration confirmation');
        });
    }
}
