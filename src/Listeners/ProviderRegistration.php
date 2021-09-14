<?php

namespace FoF\StopForumSpam\Listeners;

use Flarum\Foundation\ValidationException;
use Flarum\User\Event\RegisteringFromProvider;
use FoF\StopForumSpam\StopForumSpam;

class ProviderRegistration
{
    protected $sfs;

    public function __construct(StopForumSpam $sfs)
    {
        $this->sfs = $sfs;
    }

    public function handle(RegisteringFromProvider $event)
    {
        dd($event);
        $serverParams = $_SERVER;
        if (isset($serverParams['HTTP_CF_CONNECTING_IP'])) {
            $ipAddress = $serverParams['HTTP_CF_CONNECTING_IP'];
        } else {
            $ipAddress = $serverParams['REMOTE_ADDR'];
        }

        $check = $this->sfs->shouldPreventLogin([
            'ip'       => $ipAddress,
            'email'    => $event->user->email,
            'username' => $event->user->username,
        ]);

        if ($check) {
            throw new ValidationException([
                'username' => resolve('translator')->trans('fof-stopforumspam.forum.message.spam'),
            ]);
        }
    }
}
