<?php

namespace FoF\StopForumSpam\Listeners;

use Flarum\Event\ConfigureMiddleware;
use Illuminate\Contracts\Events\Dispatcher;
use FoF\StopForumSpam\Middleware\RegisterMiddleware;

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
