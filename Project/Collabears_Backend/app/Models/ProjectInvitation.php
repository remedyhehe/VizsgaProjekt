<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProjectInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public $project;
    public $token;

    public function __construct($project, $token)
    {
        $this->project = $project;
        $this->token = $token;
    }

    public function build()
    {
        return $this->subject('Invitation to Join Project: ' . $this->project->name)
                    ->view('emails.project-invitation')
                    ->with([
                        'projectName' => $this->project->name,
                        'acceptUrl' => url('/invitations/accept/' . $this->token),
                    ]);
    }
}