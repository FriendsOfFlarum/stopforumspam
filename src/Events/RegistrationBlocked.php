<?php

namespace FoF\StopForumSpam\Events;

class RegistrationBlocked
{
    public $username;
    public $ipAddress;
    public $email;
    public $data;

    public function __construct(string $username, ?string $ipAddress, string $email, array $data = [])
    {
        $this->username = $username;
        $this->ipAddress = $ipAddress;
        $this->email = $email;
        $this->data = $data;
    }
}
