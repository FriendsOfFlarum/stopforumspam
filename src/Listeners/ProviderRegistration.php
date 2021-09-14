<?php

/*
 * This file is part of fof/stopforumspam.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
