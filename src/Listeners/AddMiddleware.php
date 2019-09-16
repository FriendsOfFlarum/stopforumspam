<?php

/*
 * This file is part of fof/stopforumspam.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\StopForumSpam\Listeners;

use Flarum\Event\ConfigureMiddleware;
use FoF\StopForumSpam\Middleware\RegisterMiddleware;
use Illuminate\Contracts\Events\Dispatcher;

class AddMiddleware
{
    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureMiddleware::class, [$this, 'addMiddleware']);
    }

    public function addMiddleware(ConfigureMiddleware $event)
    {
        $event->pipe(app(RegisterMiddleware::class));
    }
}
